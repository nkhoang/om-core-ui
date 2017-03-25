/* global require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const gulp = require('gulp');
const eventStream = require('event-stream');
const conf = require('./conf');
const _ = require('lodash');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;

function packTemplates(inputStream,
  outputOpts = {
    templateName : 'templateCacheHtml.js',
    dest         : path.join(conf.paths.tmp, '/partials/'),
    moduleName   : '',
    root         : ''
  }) {
  return inputStream
    .pipe($.minifyHtml({
      empty  : true,
      spare  : true,
      quotes : true
    }))
    .pipe($.angularTemplatecache(outputOpts.templateName, {
      module : outputOpts.moduleName,
      root   : outputOpts.root
    }))
    .pipe(gulp.dest(outputOpts.dest));
}

/**
 * Packaging styles
 * @param watch
 * @param inputStream
 * @param outputOpts
 */
function packStyles(watch, inputStream,
  outputOpts = {
    filename   : 'styles.css',
    ignorePath : '',
    dest       : path.join(conf.paths.dist, '/styles/')
  }) {
  const sassOptions = {
    style : 'expanded'
  };

  const injectFiles = gulp.src(
    [
      path.join(conf.paths.src, '/**/*.scss'),
      outputOpts.ignorePath
    ], {
      read : false
    }
  );

  const injectOptions = {
    transform    : filePath => `@import "${filePath}";`,
    starttag     : '// injector',
    endtag       : '// endinjector',
    addRootSlash : false
  };
  let outputStream = eventStream.merge([
    inputStream
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(wiredep(_.extend({}, conf.wiredep)))
      .pipe($.sourcemaps.init())
      .pipe($.sass(sassOptions))
      .on('error', conf.errorHandler('Sass'))
      .pipe($.autoprefixer())
      .on('error', conf.errorHandler('Autoprefixer'))
      .pipe($.sourcemaps.write())
      .pipe($.replace('../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
      .pipe($.csso())
      .pipe($.rename(outputOpts.filename))
      .pipe(gulp.dest(outputOpts.dest))
  ]);

  if (watch) {
    outputStream = outputStream.pipe(browserSync.reload({ stream : true }));
  }
  return outputStream;
}

/**
 * Run all the required steps for scripts input stream
 * @param watch true/false
 * @param inputStream
 */
function packScripts(watch, inputStream,
  outputOpts = {
    libraryTarget : 'umd',
    filename      : 'scripts.babel.js',
    minFilename   : 'scripts.min.js',
    dest          : path.join(conf.paths.dist, '/scripts/')
  }, callback) {
  let isWatching = watch;
  let webpackOptions = {
    watch  : false,
    target : 'web',
    module : {
      rules : [
        /* {
         test: /\.js$/,
         exclude: /node_modules/,
         enforce: 'pre',
         loader: 'eslint-loader'
         }, */
        {
          test    : /\.js$/,
          exclude : /node_modules/,
          loader  : 'babel-loader',
          options : {
            presets : ['es2015']
          }
        }
      ]
    }
  };

  if (isWatching) {
    webpackOptions.devtool = 'inline-source-map';
  }

  return eventStream.merge([
    inputStream.pipe(webpackStream(
      _.extend(
        {
          stats  : 'verbose',
          output : {
            filename      : outputOpts.filename,
            libraryTarget : outputOpts.libraryTarget
          }
        },
        webpackOptions),
      webpack, (err, stats) => {
        if (err) {
          conf.errorHandler('Webpack')(err);
        }
        $.util.log(stats.toString({
          colors  : $.util.colors.supportsColor,
          chunks  : false,
          hash    : false,
          version : false
        }));
        if (isWatching) {
          browserSync.reload();
          isWatching = false;
          callback();
        }
      }
    ))
      .pipe($.ngAnnotate())
      // for now we temporarily comment out the IIFE
      // .pipe($.wrap("(function(){\n'use strict';\n<%= contents %>\n})();"))
      // create a full version
      .pipe(gulp.dest(outputOpts.dest))
      .pipe($.uglify(
        {
          preserveComments : $.uglifySaveLicense
        }))
      .on('error', conf.errorHandler('Uglify'))
      // export min file
      .pipe($.rename(outputOpts.minFilename))
      .pipe(gulp.dest(outputOpts.dest))
      .pipe($.size())
  ]);
}

export default {
  packScripts,
  packStyles,
  packTemplates
};

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

/**
 * Run all the required steps for scripts input stream
 * @param watch true/false
 * @param inputStream
 */
function packScripts(watch, inputStream,
  outputOpts = {
    libraryTarget : 'umd',
    filename      : 'scripts.babel.js',
    minFilename   : 'scripts.min.js'
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
      .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts/')))
      .pipe($.uglify(
        {
          preserveComments : $.uglifySaveLicense
        }))
      .on('error', conf.errorHandler('Uglify'))
      // export min file
      .pipe($.rename(outputOpts.minFilename))
      .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts/')))
      .pipe($.size())
  ]);
}

export default {
  packScripts
};

/* global require */
const path = require('path');
const gulp = require('gulp');
const eventStream = require('event-stream');
const conf = require('./conf');
const _ = require('lodash');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const $ = require('gulp-load-plugins')();

function packing() {
  const webpackOptions = {
    watch: false,
    target: 'web',
    module: {
      rules: [
        /* {
         test: /\.js$/,
         exclude: /node_modules/,
         enforce: 'pre',
         loader: 'eslint-loader'
         }, */
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      ]
    }
  };

  return eventStream.merge([
    gulp.src(path.join(conf.paths.src, '/main.js'))
      .pipe(webpackStream(
        _.extend(
          {
            stats: 'verbose',
            output: {
              filename: 'om-core.js'
            }
          },
          webpackOptions),
        webpack, (err, stats) => {
          if (err) {
            conf.errorHandler('Webpack')(err);
          }
          $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
          }));
        }
      ))
      .pipe($.ngAnnotate())
      .pipe($.wrap("(function(){\n'use strict';\n<%= contents %>\n})();"))
      // create a full version
      .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts/')))
      .pipe($.uglify(
        {
          preserveComments: $.uglifySaveLicense
        }))
      .on('error', conf.errorHandler('Uglify'))
      .pipe($.rename('om-core.min.js'))
      .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts/')))
      .pipe($.size())
  ]);
}

gulp.task('scripts', () => packing());

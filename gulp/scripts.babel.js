/* global require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const { packScripts } = require('./utils.babel');


gulp.task('scripts', () => packScripts(false, gulp.src(path.join(conf.paths.src, '/main.js')), {
  libraryTarget : 'umd',
  filename      : 'om-core.js',
  minFilename   : 'om-core.min.js'
}));

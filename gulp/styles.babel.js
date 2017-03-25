/* global require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const { packStyles } = require('./utils.babel');

gulp.task('styles', () => {
  packStyles(false, gulp.src([
    path.join(conf.paths.src, '/main.scss')
  ]), {
    ignorePath : path.join(`!${conf.paths.src}/main.scss`),
    filename   : 'om-core.css',
    dest       : path.join(conf.paths.dist, '/styles/')
  });
});

/* global require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const { packTemplates } = require('./utils.babel');

gulp.task('partials', () => packTemplates(gulp.src([
  path.join(conf.paths.src, '/**/*.html')
]), {
  templateName : 'templateCacheHtml.js',
  dest         : path.join(conf.paths.dist, '/scripts/'),
  moduleName   : 'com.nkhoang.core',
  root         : '/'
}));


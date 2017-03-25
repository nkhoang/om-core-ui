/* global require */
const gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

/* global require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('partials', () => gulp.src([
  path.join(conf.paths.src, '/**/*.html')
])
  .pipe($.minifyHtml({
    empty: true,
    spare: true,
    quotes: true
  }))
  .pipe($.angularTemplatecache('templateCacheHtml.js', {
    module: 'com.nkhoang.core',
    root: '/'
  }))
  .pipe(gulp.dest(`${conf.paths.tmp}/partials/`)));


/**
 * Only apply to bower dependencies' fonts
 */
gulp.task('fonts', () => gulp.src($.mainBowerFiles()
  .concat([path.join('bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*')]))
  .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
  .pipe($.flatten())
  .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')))
  .pipe($.size())
);


/**
 * Clean temp and dist directories
 */
gulp.task('clean', () => $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]));

gulp.task('build', ['clean', 'fonts', 'styles', 'scripts'], () => {
});

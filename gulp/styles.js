/* global require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const $ = require('gulp-load-plugins')();
const eventStream = require('event-stream');
const wiredep = require('wiredep').stream;
const _ = require('lodash');

gulp.task('styles', () => {
  const sassOptions = {
    style : 'expanded'
  };

  const injectFiles = gulp.src(
    [
      path.join(conf.paths.src, '/**/*.scss'),
      path.join(`!${conf.paths.src}/main.scss`)
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

  // we need to build pages: "login", "404" and "index"
  return eventStream.merge([
    gulp.src([
      path.join(conf.paths.src, '/main.scss')
    ])
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
      .pipe($.rename('om-core.css'))
      .pipe(gulp.dest(path.join(conf.paths.dist, '/styles/')))
  ]);
});

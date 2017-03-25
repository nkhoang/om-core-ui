/* global require */
/* eslint-disable import/no-extraneous-dependencies */
/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src  : 'src',
  dist : 'dist',
  tmp  : '.tmp'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude   : [
    /bootstrap.js$/,
    /bootstrap-sass\/.*\.js/,
    /bootstrap\.css/,
    'bower_components/datatables/media/css/jquery.dataTables.css',
    'bower_components/datatables-tabletools/css/dataTables.tableTools.css',
    'bower_components/datatables-colvis/css/dataTables.colVis.css',
    'bower_components/requirejs/require.js',
    'bower_components/bootstrap-sass/assets/javascripts/'],
  directory : 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  return function (err) {
    gutil.log(gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};

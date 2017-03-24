/* global $, _, moment, Spinner, NProgress, angular */
import config from './config';
// services
import Progress from './service/Progress';
import UI from './service/UI';
// directive
import HasRoleDirective from './directive/hasRole/HasRoleDirective';
// interceptor
import HttpRequestInterceptor from './interceptor/HttpRequestInterceptor';
// core module
const coreModule = angular.module('com.nkhoang.core', ['ui.bootstrap', 'pascalprecht.translate'])
  .constant('coreLibs', {
    $,
    _,
    moment,
    Spinner,
    NProgress,
  })
  .config(config)
  // filters
  .filter('htmlSafe', $sce => (htmlCode) => {
    if (htmlCode) {
      return $sce.trustAsHtml(angular.element('<span></span>').html(htmlCode).text());
    }
    return htmlCode;
  })
  // interceptors
  .factory('httpRequestInterceptor', HttpRequestInterceptor.HttpRequestInterceptorFactory)
  .factory('progress', Progress.ProgressFactory)
  .factory('ui', UI.UIFactory)
  // config
  .config(($httpProvider) => {
    $httpProvider.interceptors.push('progress');
    $httpProvider.interceptors.push('httpRequestInterceptor');
  })
  // directives
  .directive('hasRole', HasRoleDirective.HasRoleDirectiveFactory);

// keep the reference to use it later
const orgBootstrap = angular.bootstrap;

// override boostrap process
angular.bootstrap = function (document, modules) {
  modules.unshift(coreModule.name);

  const app = angular.element('#root-angular-app');
  const element = app.length ? app : document;

  orgBootstrap(element, modules);
};

(function(){
'use strict';
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


config.$inject = ["$logProvider", "$translateProvider", "$locationProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
function config($logProvider, $translateProvider, $locationProvider) {
  'ngInject';
  // Enable log

  $logProvider.debugEnabled(true);

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  // Angular Translate
  $translateProvider.useSanitizeValueStrategy('sanitize').useMissingTranslationHandlerLog().useStaticFilesLoader({ prefix: '/i18n/', suffix: '.json' }).preferredLanguage('vn_VN');
}

exports.default = config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasRoleDirective = function () {
  function HasRoleDirective($rootScope, $animate) {
    _classCallCheck(this, HasRoleDirective);

    return {
      restrict: 'A',
      transclude: 'element',
      priority: 600,
      terminal: true,
      $$tlb: true,
      link: function link(scope, elm, attr, ctrl, transcludeFn) {
        if ($rootScope.currentUser.roles.indexOf(attr.hasRole) !== -1) {
          transcludeFn(scope, function (clone) {
            $animate.enter(clone, elm.parent(), elm);
          });
        }
      }
    };
  }

  _createClass(HasRoleDirective, null, [{
    key: 'HasRoleDirectiveFactory',
    value: ["$rootScope", "$animate", function HasRoleDirectiveFactory($rootScope, $animate) {
      'ngInject';

      return new HasRoleDirective($rootScope, $animate);
    }]
  }]);

  return HasRoleDirective;
}();

exports.default = HasRoleDirective;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpRequestInterceptor = function () {
  HttpRequestInterceptor.$inject = ["$location", "$q", "ui", "$translate", "coreLibs"];
  function HttpRequestInterceptor($location, $q, ui, $translate, coreLibs) {
    'ngInject';

    _classCallCheck(this, HttpRequestInterceptor);

    return {
      request: function request(config) {
        var headers = config['headers'] || {};
        config['headers'] = headers;
        // set default language
        config['headers']['Accept-Language'] = 'vn-VN';
        return config;
      },
      response: function response(_response) {
        if (_response.config.url.indexOf('/api/') !== -1 && (!coreLibs._.isObject(_response.data) || !Array.isArray(_response.data))) {
          try {
            angular.fromJson(_response.data);
          } catch (exception) {
            $location.path('/login');

            return $q.reject(_response);
          }
        }
        return _response;
      },
      responseError: function responseError(response) {
        // other wise show errorMessage if found
        if (response.status === 500 || response.status === 400 || response.status === 404) {
          // @see JsonResponse.java
          if (response.data && response.data.errorMessage) {
            ui.error(response.data.errorMessage);
          } else {
            ui.error($translate.instant('common.message.error.connection'));
          }
        }

        return $q.reject(response);
      }
    };
  }

  _createClass(HttpRequestInterceptor, null, [{
    key: 'HttpRequestInterceptorFactory',
    value: ["$window", "$location", "$q", "ui", "$translate", function HttpRequestInterceptorFactory($window, $location, $q, ui, $translate) {
      'ngInject';

      return new HttpRequestInterceptor($window, $location, $q, ui, $translate);
    }]
  }]);

  return HttpRequestInterceptor;
}();

exports.default = HttpRequestInterceptor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
  function Progress($q, coreLibs) {
    _classCallCheck(this, Progress);

    var pendingRequest = 0,
        NProgress = coreLibs.NProgress;

    function start() {
      if (pendingRequest++ === 0) {
        NProgress.start();
      }
    }

    function end() {
      if (--pendingRequest === 0) {
        NProgress.done();
      }
    }

    return {
      request: function request(config) {
        start();
        return config;
      },
      response: function response(resp) {
        end();
        return resp;
      },
      responseError: function responseError(err) {
        end();
        return $q.reject(err);
      }
    };
  }

  _createClass(Progress, null, [{
    key: 'ProgressFactory',
    value: ["$q", "coreLibs", function ProgressFactory($q, coreLibs) {
      'ngInject';

      return new Progress($q, coreLibs);
    }]
  }]);

  return Progress;
}();

exports.default = Progress;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function () {
  function UI(coreLibs) {
    _classCallCheck(this, UI);

    var _ = coreLibs._,
        $ = coreLibs.$,
        Spinner = coreLibs.Spinner,
        swal = coreLibs.swal,
        toastr = coreLibs.toastr,
        ui = {};

    /**
     * Blocks UI and shows spinner using $.blockUI and spin.js
     * API: block, unblock
     */
    var isBlocking = false;
    var spinner = new Spinner({
      lines: 10, // The number of lines to draw
      length: 5, // The length of each line
      width: 3, // The line thickness
      radius: 5, // The radius of the inner circle
      rotate: 0, // Rotation offset
      corners: 1, // Roundness (0..1)
      color: '#000', // #rgb or #rrggbb
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1.25, // Rounds per second
      trail: 75, // Afterglow percentage
      opacity: 0.25, // Opacity of the lines
      zIndex: 10001, // Use a high z-index by default
      className: 'spinner' // CSS class to assign to the element
    });

    $.extend($.blockUI.defaults, {
      message: ' ',
      baseZ: 9999999,
      fadeIn: 0,
      fadeOut: 0,
      blockMsgClass: 'blocked',

      css: {
        padding: 0,
        top: '50%',
        left: '50%',
        width: '40px',
        height: '40px',
        marginLeft: '-20px',
        marginTop: '-20px',
        textAlign: 'center',
        border: 'none',
        borderRadius: '4px',
        cursor: 'wait',
        color: '#000',
        backgroundColor: '#fff'
      },

      onBlock: function onBlock() {
        if (isBlocking) return;
        isBlocking = true;
        var $blockOverlay = $('.blockUI.blockOverlay').not('.has-spinner');
        var $blockMsg = $blockOverlay.next('.blocked');
        $blockOverlay.addClass('has-spinner');
        spinner.spin($blockMsg.get(0));
      },

      onUnblock: function onUnblock() {
        if (!isBlocking) return;
        isBlocking = false;
        spinner.stop();
      }
    });

    _.forEach(['block', 'unblock'], function (method) {
      ui[method] = function () {
        $[method + 'UI']();
      };
    });

    ui.checkJSON = function (json) {
      try {
        JSON.parse(json);
      } catch (exception) {
        return false;
      }
      return true;
    };

    /**
     * Shows alert and confirm dialog using bootstrap-sweetalert
     * API: alert, confirm
     * Remark: check out all options here http://tristanedwards.me/sweetalert
     */
    ui.alert = function (opts) {
      opts.type = opts.type || 'error';
      swal(opts);
    };

    ui.confirm = function (opts, cb) {
      opts.type = opts.type || 'info';
      opts.showCancelButton = true;
      swal(opts, cb || _.noop());
    };

    /**
     * Displays notification using toastr
     * API: error, info, success, warning
     * Remark: pass an array to show multiple messages
     */
    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-top-right';
    ['error', 'info', 'success', 'warning'].forEach(function (method) {
      ui[method] = function (msg) {
        if (!_.isArray(msg)) {
          msg = [msg];
        }
        _.forEach(msg, function (msg) {
          toastr[method](msg);
        });
      };
    });

    return ui;
  }

  _createClass(UI, null, [{
    key: 'UIFactory',
    value: ["coreLibs", function UIFactory(coreLibs) {
      'ngInject';

      return new UI(coreLibs);
    }]
  }]);

  return UI;
}();

exports.default = UI;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _Progress = __webpack_require__(3);

var _Progress2 = _interopRequireDefault(_Progress);

var _UI = __webpack_require__(4);

var _UI2 = _interopRequireDefault(_UI);

var _HasRoleDirective = __webpack_require__(1);

var _HasRoleDirective2 = _interopRequireDefault(_HasRoleDirective);

var _HttpRequestInterceptor = __webpack_require__(2);

var _HttpRequestInterceptor2 = _interopRequireDefault(_HttpRequestInterceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// core module

// directive

// services
var coreModule = angular.module('com.nkhoang.core', ['ui.bootstrap', 'pascalprecht.translate']).constant('coreLibs', {
  $: $,
  _: _,
  moment: moment,
  Spinner: Spinner,
  NProgress: NProgress
}).config(_config2.default)
// filters
.filter('htmlSafe', ["$sce", function ($sce) {
  return function (htmlCode) {
    if (htmlCode) {
      return $sce.trustAsHtml(angular.element('<span></span>').html(htmlCode).text());
    }
    return htmlCode;
  };
}])
// interceptors
.factory('httpRequestInterceptor', _HttpRequestInterceptor2.default.HttpRequestInterceptorFactory).factory('progress', _Progress2.default.ProgressFactory).factory('ui', _UI2.default.UIFactory)
// config
.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.interceptors.push('progress');
  $httpProvider.interceptors.push('httpRequestInterceptor');
}])
// directives
.directive('hasRole', _HasRoleDirective2.default.HasRoleDirectiveFactory);

// keep the reference to use it later

// interceptor
/* global $, _, moment, Spinner, NProgress, angular */
var orgBootstrap = angular.bootstrap;

// override boostrap process
angular.bootstrap = function (document, modules) {
  modules.unshift(coreModule.name);

  var app = angular.element('#root-angular-app');
  var element = app.length ? app : document;

  orgBootstrap(element, modules);
};

/***/ })
/******/ ]);
})();
'use strict';

class Progress {
  constructor($q, coreLibs) {
    let pendingRequest = 0,
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
      request: function (config) {
        start();
        return config;
      },
      response: function (resp) {
        end();
        return resp;
      },
      responseError: function (err) {
        end();
        return $q.reject(err);
      }
    };
  }

  static ProgressFactory($q, coreLibs) {
    'ngInject';
    return new Progress($q, coreLibs);
  }
}

export default Progress;

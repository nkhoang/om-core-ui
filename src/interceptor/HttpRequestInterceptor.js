class HttpRequestInterceptor {
  constructor($location, $q, ui, $translate, coreLibs) {
    'ngInject';

    return {
      request: (config) => {
        let headers = config['headers'] || {};
        config['headers'] = headers;
        // set default language
        config['headers']['Accept-Language'] = 'vn-VN';
        return config;
      },
      response: (response) => {
        if (response.config.url.indexOf('/api/') !== -1 && (!coreLibs._.isObject(response.data) || !Array.isArray(response.data))) {
          try {
            angular.fromJson(response.data)
          } catch (exception) {
            $location.path('/login');

            return $q.reject(response);
          }
        }
        return response;
      },
      responseError: (response) => {
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

  static HttpRequestInterceptorFactory($window, $location, $q, ui, $translate) {
    'ngInject';
    return new HttpRequestInterceptor($window, $location, $q, ui, $translate);
  }
}

export default HttpRequestInterceptor;

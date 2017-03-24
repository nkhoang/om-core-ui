function config($logProvider, $translateProvider, $locationProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });


  // Angular Translate
  $translateProvider
    .useSanitizeValueStrategy('sanitize')
    .useMissingTranslationHandlerLog()
    .useStaticFilesLoader({prefix: '/i18n/', suffix: '.json'})
    .preferredLanguage('vn_VN');
}

export default config;

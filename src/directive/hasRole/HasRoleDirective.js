class HasRoleDirective {
  constructor($rootScope, $animate) {
    return {
      restrict: 'A',
      transclude: 'element',
      priority: 600,
      terminal: true,
      $$tlb: true,
      link: function (scope, elm, attr, ctrl, transcludeFn) {
        if ($rootScope.currentUser.roles.indexOf(attr.hasRole) !== -1) {
          transcludeFn(scope, function (clone) {
            $animate.enter(clone, elm.parent(), elm);
          });
        }
      }
    };
  }

  static HasRoleDirectiveFactory($rootScope, $animate) {
    'ngInject';
    return new HasRoleDirective($rootScope, $animate);
  }
}

export default HasRoleDirective;

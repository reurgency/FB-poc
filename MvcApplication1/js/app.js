'use strict';


// Declare app level module which depends on filters, and services
angular.module('facebookPOC', ['facebookPOC.filters', 'facebookPOC.services', 'facebookPOC.directives']).
  config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', { template: '/partials/home.html', controller: HomeController });
      $routeProvider.otherwise({redirectTo: '/'});
  }])
    
    .run(function ($rootScope, Facebook) {
        $rootScope.Facebook = Facebook;
    });

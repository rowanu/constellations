'use strict';

// Declare app level module which depends on filters, and services
angular.module('ghcApp', ['ghcApp.filters', 'ghcApp.services', 'ghcApp.directives', 'ghcApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

'use strict';

// Declare app level module which depends on filters, and services
angular.module('constellationsApp', ['constellationsApp.filters', 'constellationsApp.services', 'constellationsApp.directives', 'constellationsApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

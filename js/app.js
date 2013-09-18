/*globals angular: false */
'use strict';
angular.module('constellationsApp', [
  'ngRoute',
  'constellationsApp.filters',
  'constellationsApp.services',
  'constellationsApp.directives',
  'constellationsApp.controllers'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('ghcApp.services', ['ngResource'])
  .factory('User', function ($resource) {
    return $resource('https://api.github.com/users/:username');
  });

/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.services', ['ngResource'])
  .factory('GitHub', function ($resource) {
    return {
      user: $resource('https://api.github.com/users/:username'),
      following: $resource('https://api.github.com/users/:username/following',
        {}, { 'get': { method: 'GET', isArray: true } }),
      starred: $resource('https://api.github.com/users/:username/starred',
        {}, { 'get': { method: 'GET', isArray: true } })
    };
  });

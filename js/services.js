/*jslint indent: 2 */
/*globals angular: false */
'use strict';

var PER_PAGE = 100;
var AVATAR_404 = '/img/404_octocat.png';

// TODO: All these calls (check localStorage, hit API, etc) can be refactored.
angular.module('constellationsApp.services', ['ngResource', 'ngStorage'])
  .factory('Constellation', ['GitHub', '$q', '$http', function (GitHub, $q, $http) {
    return {
      following: [],
      limitPromise: GitHub.limit,
      getFollowing: function (username) {
        var deferred = $q.defer();
        GitHub.following.get({username: username}, function success(following) {
          console.log(username + ': Got GitHub following ' + following.length);
          deferred.resolve(following);
        }, function error(response) {
          console.error(username + ': GitHub following not found');
          // TODO: Move rate limit info to shared location.
          if (response.status === 403) {
            $http.get('https://api.github.com/rate_limit').success(function(r) {
              console.log(username + ": Rate limit resets at " + new Date(r.rate.reset * 1000));
              deferred.reject(response);
            });
          }
        });
        return deferred.promise;
      },
      getUser: function (username) {
        var deferred = $q.defer();
        GitHub.user.get({username: username}, function success(user) {
          console.log(username + ': Got GitHub user');
          deferred.resolve(user);
        }, function error(reason) {
          console.error(username + ': GitHub user not found');
          deferred.resolve({avatar_url: AVATAR_404, html_url: '/'});
        });
        return deferred.promise;
      },
      getStarred: function (username) {
        var deferred = $q.defer();
        GitHub.starred.get({username: username}, function success(starred) {
          console.log(username + ': Got GitHub starred ' + starred.length);
          deferred.resolve(starred);
        }, function error(response) {
          console.error(username + ': GitHub starred not found');
          deferred.resolve();
        });
        return deferred.promise;
      },
      // TODO: Work for all types eg. following.
      getAllStarred: function (username, successCallback, errorCallback) {
        var allStarred = [],
        page = 1, // GitHub API paging is 1-based.
          success,
        error;

        error = function (data) {
          console.error(username + ': Problem with starred');
          errorCallback(data);
        };

        success = function (starred) {
          console.log(username + ': Got starred page ' + page);
          allStarred = allStarred.concat(starred);
          if (starred.length === PER_PAGE) {
            page += 1;
            console.log(username + ': Getting starred page ' + page);
            GitHub.starred.get({username: username, page: page}, success, error);
          } else {
            console.log(username + 'Got all starred');
            successCallback(allStarred);
          }
        };

        // Start getting starred.
        GitHub.starred.get({username: username, page: page}, success, error);
      }
    };
  }])
  .factory('GitHub', ['$resource', '$http', function ($resource, $http) {
    return {
      limit: $http.get('https://api.github.com/rate_limit'),
      user: $resource('https://api.github.com/users/:username'),
      following: $resource('https://api.github.com/users/:username/following',
                           {per_page: PER_PAGE},
                           { 'get': { method: 'GET', isArray: true } }),
      starred: $resource('https://api.github.com/users/:username/starred',
                         {per_page: PER_PAGE},
                         { 'get': { method: 'GET', isArray: true } })
    };
  }]);

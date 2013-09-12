/*jslint indent: 2 */
/*globals angular: false */
'use strict';

var PER_PAGE = 100;
var AVATAR_404 = '/img/404_octocat.png';

// TODO: Remove resolve([]) - this should be left up to the client.
angular.module('constellationsApp.services', ['ngResource', 'ngStorage'])
  .factory('Constellation', ['GitHub', '$localStorage', '$q', function (GitHub, $localStorage, $q) {
    return {
      following: [],
      getFollowing: function (username) {
        var deferred = $q.defer();

        if ($localStorage.following && $localStorage.following.length > 0) {
          // Return localStorage copy of following.
          console.log(username + ": Found local following");
          deferred.resolve($localStorage.following);
        } else {
          // Get from GitHub.
          GitHub.following.get({username: username}, function success(following) {
            console.log(username + ': Got GitHub following ' + following.length);
            // Store for later
            $localStorage.following = following;
            deferred.resolve(following);
          }, function error(reason) {
            console.error(username + ': GitHub following not found');
            deferred.reject(reason);
          });
        }
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
        }, function error() {
          console.error(username + ': GitHub starred not found');
          deferred.resolve([]);
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
  .factory('GitHub', function ($resource) {
    return {
      user: $resource('https://api.github.com/users/:username'),
      following: $resource('https://api.github.com/users/:username/following',
        {per_page: PER_PAGE}, { 'get': { method: 'GET', isArray: true } }),
      starred: $resource('https://api.github.com/users/:username/starred',
        {per_page: PER_PAGE}, { 'get': { method: 'GET', isArray: true } })
    };
  });

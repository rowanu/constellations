/*jslint indent: 2 */
/*globals angular: false */
'use strict';

var avatar404 = '/img/404_octocat.png',
  avatarLoading = '/img/spinner.gif';

angular.module('ghcApp.services', ['ngResource'])
  .factory('Constellation', function (GitHub) {
    return {
      getUser: function (username) {
        var self = this;
        console.log(username + ": Getting GitHub user");
        self.user = {avatar_url: avatarLoading, html_url: ''};
        GitHub.user.get({username: username}, function success(user) {
          console.log(username + ": Found GitHub user");
          self.user = user;
        }, function error(response) {
          console.log(username + ": No GitHub user found");
          self.user = {avatar_url: avatar404, html_url: ''};
        });
      },
      getFollowing: function (username) {
        var self = this;
        console.log(username + ": Getting GitHub following");
        GitHub.following.get({username: username}, function success(following) {
          console.log(username + ": Found Github following");
          angular.forEach(following, function (f) {
            console.log(f.login + ': ' + f.html_url);
          });
        }, function error(response) {
          console.log(username + ": No Github following found");
        });
      },
      user: {}
    };
  })
  .factory('GitHub', function ($resource) {
    return {
      user: $resource('https://api.github.com/users/:username'),
      following: $resource('https://api.github.com/users/:username/following',
        {},
        {
          'get': {
            method: 'GET',
            isArray: true
          }
        })
    };
  });

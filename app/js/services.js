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
        console.log("Getting GitHub user");
        self.user = {avatar_url: avatarLoading};
        GitHub.user.get({username: username}, function success(user) {
          console.log("Found GitHub user " + user.login);
          self.user = user;
        }, function error(response) {
          console.log("No GitHub user found");
          self.user = {avatar_url: avatar404};
        });
      },
      user: {}
    }
  })
  .factory('GitHub', function ($resource) {
    return {
      user: $resource('https://api.github.com/users/:username')
    };
  });

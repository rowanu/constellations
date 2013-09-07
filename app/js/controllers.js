/*jslint indent: 2 */
/*globals angular: false */
'use strict';

var avatar404 = '/img/404_octocat.png',
  avatarLoading = '/img/spinner.gif';

angular.module('ghcApp.controllers', [])
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.$on('user:update', function (event, user) {
      console.log("OHAI user:update");
      console.log(user);
    })
  }])
  .controller('UserCtrl', ['$scope', 'User', function ($scope, User) {
    $scope.submit = function () {
      console.log("Getting GitHub user");
      $scope.avatarUrl = avatarLoading;
      User.get({username: $scope.username}, function success(user) {
        console.log("Found GitHub user");
        $scope.avatarUrl = user.avatar_url;
        $scope.$emit('user:update', user);
      }, function error(response) {
        console.log("No GitHub user found");
        $scope.avatarUrl = avatar404;
      });
    };
  }]);

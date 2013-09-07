/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('ghcApp.controllers', [])
  .controller('MainCtrl', [function ($scope) {
  }])
  .controller('UserCtrl', ['$scope', 'User', function ($scope, User) {
    $scope.submit = function () {
      User.get({username: $scope.username}, function success(user) {
        $scope.avatarUrl = user.avatar_url;
        $scope.$emit('user:update', user);
      }, function error(response) {
        $scope.avatarUrl = '/img/404_octocat.png';
      });
    };
  }]);

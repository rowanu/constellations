/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('ghcApp.controllers', [])
  .controller('UserCtrl', [function ($scope, User) {
    $scope.submit = function () {
      User.get({username: $scope.username}, function (user) {
        // console.log(user);
        $scope.avatar_url = user.avatar_url;
        // $scope.$emit('user:update', user);
      }, function (response) {
        $scope.avatar_url = 'http://octodex.github.com/images/daftpunktocat-thomas.gif';
      });
    };
  }]);

/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.$on('username:submit', function (e, username) {
      $scope.$broadcast('username', username);
    });
  }])
  .controller('UserCtrl', ['$scope', 'GitHub', function ($scope, GitHub) {
    $scope.$on("username", function (e, username) {
      GitHub.user.get({username: username}, function success(user) {
        console.log(user); // TODO: Testing
        $scope.user = user;
      }, function error() {
        console.log(username + ": GitHub user not found.");
      });
    });
  }])
  .controller('UsernameCtrl', ['$scope', function ($scope) {
    $scope.submit = function () {
      console.log($scope.username + ": Username updated");
      $scope.$emit('username:submit', $scope.username);
    };
  }]);

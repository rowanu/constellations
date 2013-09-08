/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('ghcApp.controllers', [])
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.username = 'rowanu'; // TODO: Testing
    $scope.$broadcast("username", $scope.username);
  }])
  .controller('UserCtrl', ['$scope', function ($scope) {
  }])
  .controller('UsernameCtrl', ['$scope', function ($scope) {
    $scope.submit = function () {
      console.log($scope.username);
      // TODO: $scope.$emit("username")
    };
  }]);

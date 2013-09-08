/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('ghcApp.controllers', [])
  .controller('MainCtrl', ['$scope', function ($scope) {
  }])
  .controller('UserCtrl', ['$scope', 'Constellation', function ($scope, Constellation) {
    $scope.$watch(function () { return Constellation.user; }, function (newValue, oldValue) {
      $scope.user = newValue;
    });
    $scope.submit = function () {
      Constellation.getUser($scope.username);
    };
  }]);

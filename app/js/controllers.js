/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$q', 'Constellation', function ($scope, $q, Constellation) {
    // Share the username with child controllers.
    $scope.$on('username:submit', function (e, username) {
      var ready = $q.all([
        Constellation.getFollowing(username)
      ]);
      $scope.user = Constellation.getUser(username);

      ready.then(function success(results) {
        $scope.following = results[0];
      }, function error(reason) {
        console.error(username + ": Not ready " + reason);
        $scope.following = [];
      });
    });
  }])
  .controller('UsernameCtrl', ['$scope', function ($scope) {
    $scope.submit = function () {
      console.log($scope.username + ": Username updated");
      $scope.$emit('username:submit', $scope.username);
    };
  }]);

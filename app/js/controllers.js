/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$q', 'Constellation', '$http', function ($scope, $q, Constellation, $http) {
    var username = 'rowanu';
    var nodes = [], links = [];
    var all = $q.all;
    var starreds = [], logins = [];

    // $scope.$on('username:submit', function (e, username) {
    // });

    $scope.user = Constellation.getUser(username);
    $scope.following = Constellation.getFollowing(username);
    $scope.following.then(function (following) {
      angular.forEach(following, function(user) {
        console.log(username + ": Follows " + user.login + ": Getting starred");
        logins.push(user.login);
        starreds.push(Constellation.getStarred(user.login));
      });

      all(starreds).then(function (results) {
        angular.forEach(results, function (starred, i) {
          angular.forEach(starred, function (repo, j) {
            console.log(logins[i] + " starred " + repo.full_name);
            // TODO: Convert to nodes and links
            // TODO: Remove duplicate repo references
            // TODO: Only show repos with > 1 starred
          });
        });
      });
    });
  }])
  .controller('UsernameCtrl', ['$scope', function ($scope) {
    $scope.submit = function () {
      console.log($scope.username + ": Username updated");
      $scope.$emit('username:submit', $scope.username);
    };
  }]);

/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$q', 'Constellation', '$http', function ($scope, $q, Constellation, $http) {
    var data = {
      nodes: [],
      links: []
    };
    var all = $q.all;
    var username = 'rowanu'; // TODO: Testing
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
          data.nodes.push({name: logins[i], type: 'user'});
          var userIndex = data.nodes.length - 1;
          angular.forEach(starred, function (repo, j) {
            // Convert to nodes and links
            console.log(logins[i] + " starred " + repo.full_name);
            data.nodes.push({name: repo.full_name, type: 'repo'});
            data.links.push({source: userIndex, target: data.nodes.length - 1});
            // TODO: Remove duplicate repo references
            // TODO: Only show repos with > 1 starred
          });
        });
        console.log(data);
        $scope.constellation = data;
      });
    });
  }])
  .controller('UsernameCtrl', ['$scope', function ($scope) {
    $scope.submit = function () {
      console.log($scope.username + ": Username updated");
      $scope.$emit('username:submit', $scope.username);
    };
  }]);

/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$q', 'Constellation', '$http', function ($scope, $q, Constellation, $http) {
    var username = 'rowanu';
    var nodes = [], links = [];
    var deferd = $q.defer();

    // TODO: Start on username update.
    // $scope.$on('username:submit', function (e, username) {
    //   $scope.user = Constellation.getUser(username);
    //   $scope.following = Constellation.getFollowing(username);
    // });

    $scope.user = Constellation.getUser(username);
    $scope.following = Constellation.getFollowing(username);
    $scope.following.then(function (following) {
      angular.forEach(following, function(user) {
        console.log(username + ": Follows " + user.login + ": Getting starred");
        Constellation.getStarred(user.login);
      });
    });

    // // TODO: This could be replaced with _.pluck
    // angular.forEach(following, function (f) {
    //   followingStarred.push(Constellation.getStarred(f.login));
    //   nodes.push({name: f.login});
    // });
    // ready = $q.all(followingStarred);
    // ready.then(function success(results) {
    //   console.log("Finished getting ALL following starred");
    //   angular.forEach(results, function (starred, i) {
    //     console.log(i + nodes[i]);
    //     // Users are at the front of the nodes array.
    //     angular.forEach(starred, function (repo) {
    //       // TODO: Count. Only display repos with > 1 star.
    //       // TODO: Stop duplicates of repos
    //       // Record link
    //       nodes.push({name: repo.full_name});
    //       links.push({source: i, target: nodes.length - 1});
    //     });
    //   });
    //   $scope.data = {
    //     nodes: nodes,
    //     links: links
    //   };
    //   console.log(JSON.stringify($scope.data));

    // }, function error(reason) {
    //   console.error(username + ": Not ready " + reason);
    //   $scope.following = [];
    // });

    // });

  }])
  .controller('UsernameCtrl', ['$scope', function ($scope) {
    $scope.submit = function () {
      console.log($scope.username + ": Username updated");
      $scope.$emit('username:submit', $scope.username);
    };
  }]);

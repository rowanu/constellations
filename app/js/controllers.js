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

    var repos = {}, usernames = {};

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
        // Count starred repos.
        angular.forEach(results, function (starred, i) {
          angular.forEach(starred, function (repo, j) {
            if (repos.hasOwnProperty(repo.full_name)) {
              repos[repo.full_name].push(logins[i]);
            } else {
              // Start the record
              repos[repo.full_name] = [logins[i]];
            }
          });
        });
        // Clean up starred repos.
        angular.forEach(repos, function (users, repoName) {
          // Only show repos with > 1 starred
          if (users.length > 1) {
            console.log(repoName + " has more than 1 star #" + users.length);
            // Add the repo to nodes
            data.nodes.push({name: repoName, type: 'repo'});
            var repoIndex = data.nodes.length - 1;
            // Only push users not present
            angular.forEach(users, function (user) {
              var userIndex = -1;
              angular.forEach(data.nodes, function (node, i) {
                if (node.name === user) {
                  userIndex = i;
                  return;
                }
              });
              if (userIndex < 0) {
                data.nodes.push({name: user, type: 'user'});
                userIndex = data.nodes.length - 1;
              }
              data.links.push({source: userIndex, target: repoIndex});
            });
          }
        });

        // Convert to nodes and links
        // Add the users to nodes (if do not exist)
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

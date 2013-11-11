/*jslint indent: 2, browser: true */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.controllers', [])
.controller('MainCtrl', ['$scope', '$q', 'Constellation', '$http', function ($scope, $q, Constellation, $http) {
  // TODO: Clean up var definitions.
  var data = { nodes: [], links: [] };
  var all = $q.all;
  var starreds = [], logins = [];
  var repos = {}, usernames = {};
  var repoDetails = {};

  window.setInterval(function () { $scope.$apply(function () {
    console.log('Checking GitHub API rate limit');
    Constellation.limitPromise.then(function (response) {
      $scope.limit = response.data;
      $scope.over = $scope.limit.rate.remaining < 1;
    });
  }); }, 10000);

  $scope.$on('username:submit', function (e, username) {
    $scope.user = Constellation.getUser(username);
    // Have to do this in the promis callback, because we're in a controller
    Constellation.getStarred(username).then(function (starred) {
      $scope.user.starredFullNames = starred.map(function (s) { return s.full_name; });
    });
    $scope.following = Constellation.getFollowing(username);

    $scope.following.then(function (following) {
      angular.forEach(following, function(user) {
        // console.log(username + ": Follows " + user.login + ": Getting starred");
        logins.push(user.login);
        usernames[user.login] = user;
        starreds.push(Constellation.getStarred(user.login));
      });

      all(starreds).then(function (results) {
        // Count starred repos.
        angular.forEach(results, function (starred, i) {
          angular.forEach(starred, function (repo, j) {
            repoDetails[repo.full_name] = repo;
            if (repos.hasOwnProperty(repo.full_name)) {
              repos[repo.full_name].push(logins[i]);
            } else {
              // Start the record
              repos[repo.full_name] = [logins[i]];
            }
          });
        });
        // Clean up starred repos.
        // console.log($scope.user.starredFullNames); // TODO: testing
        angular.forEach(repos, function (users, repoName) {
          // Only show repos with > 1 starred and not starred by user
          if (users.length > 1 && $scope.user.starredFullNames.indexOf(repoName) === -1) {
            // console.log(repoName + " has more than 1 star #" + users.length);
            // Add the repo to nodes
            data.nodes.push({name: repoName, type: 'repo', html_url: repoDetails[repoName].html_url});
            var repoIndex = data.nodes.length - 1;
            // Only push users not present
            angular.forEach(users, function (user) {
              var userIndex = -1;
              angular.forEach(data.nodes, function (node, i) {
                if (node.name === user) {
                  userIndex = i;
                }
              });
              if (userIndex < 0) {
                data.nodes.push({name: user, type: 'user', avatar_url: usernames[user].avatar_url, html_url: usernames[user].html_url});
                userIndex = data.nodes.length - 1;
              }
              data.links.push({source: userIndex, target: repoIndex});
            });
          }
        });

        // console.log(data);
        $scope.constellation = data;
      });
    }, function (reason) {
      // Reset the data.
      console.error(reason);
      $scope.constellation = [];
    });
  });
}])
.controller('UsernameCtrl', ['$scope', function ($scope) {
  $scope.submit = function () {
    // console.log($scope.username + ": Username updated");
    $scope.$emit('username:submit', $scope.username);
  };
}]);

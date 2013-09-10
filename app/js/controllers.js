/*jslint indent: 2 */
/*globals angular: false */
'use strict';

var avatar404 = '/img/404_octocat.png',
  avatarLoading = '/img/spinner.gif';

angular.module('constellationsApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'Constellation', function ($scope, Constellation) {
    // Share the username with child controllers.
    $scope.$on('username:submit', function (e, username) {
      // $scope.$broadcast('username:update', username);
      $scope.following = Constellation.getFollowing(username);
      console.log($scope.following);
    });
  }])
  .controller('UserCtrl', ['$scope', 'GitHub', function ($scope, GitHub) {
    $scope.$on("username:update", function (e, username) {
      $scope.user = {avatar_url: avatarLoading, html_url: '/'};
      GitHub.user.get({username: username}, function success(user) {
        console.log(username + ": Got GitHub user");
        $scope.user = user;
      }, function error() {
        console.error(username + ": GitHub user not found");
        $scope.user = {avatar_url: avatar404, html_url: '/'};
      });
    });
  }])
  .controller('FollowingCtrl', ['$scope', 'GitHub', function ($scope, GitHub) {
    $scope.$on("username:update", function (e, username) {
    });
  }])
  .controller('StarredCtrl', ['$scope', 'GitHub', function ($scope, GitHub) {
    $scope.$on("username:update", function (e, username) {
      GitHub.starred.get({username: username}, function success(starred) {
        console.log(username + ": Got GitHub starred");
        $scope.starred = starred;
      }, function error() {
        console.error(username + ": GitHub starred not found");
        $scope.starred = [];
      });
    });
  }])
  .controller('UsernameCtrl', ['$scope', function ($scope) {
    $scope.submit = function () {
      console.log($scope.username + ": Username updated");
      $scope.$emit('username:submit', $scope.username);
    };
  }]);

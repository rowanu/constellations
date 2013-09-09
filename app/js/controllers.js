/*jslint indent: 2 */
/*globals angular: false */
'use strict';

var avatar404 = '/img/404_octocat.png',
  avatarLoading = '/img/spinner.gif';

angular.module('constellationsApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.$on('username:submit', function (e, username) {
      $scope.$broadcast('username', username);
    });
  }])
  .controller('UserCtrl', ['$scope', 'GitHub', function ($scope, GitHub) {
    $scope.$on("username", function (e, username) {
      $scope.user = {avatar_url: avatarLoading, html_url: '/'};
      GitHub.user.get({username: username}, function success(user) {
        console.log(username + ": Got GitHub user");
        console.log(user); // TODO: Testing
        $scope.user = user;
      }, function error() {
        console.error(username + ": GitHub user not found");
        $scope.user = {avatar_url: avatar404, html_url: '/'};
      });
    });
  }])
  .controller('FollowingCtrl', ['$scope', 'GitHub', function ($scope, GitHub) {
    $scope.$on("username", function (e, username) {
      GitHub.following.get({username: username}, function success(following) {
        console.log(username + ": Got GitHub following");
        $scope.following = following;
      }, function error() {
        console.error(username + ": GitHub following not found");
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

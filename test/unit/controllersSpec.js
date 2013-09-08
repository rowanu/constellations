'use strict';

describe('controllers', function(){
  var scope, UserCtrl, $httpBackend;
  var user = {
    login: 'rowanu',
    avatar_url: 'http://rowanu/avatar_url'
  };

  beforeEach(module('ghcApp.controllers', 'ghcApp.services'));

  describe('UserCtrl', function () {
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      UserCtrl = $controller('UserCtrl', {$scope: scope});
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('https://api.github.com/users/rowanu')
        .respond(user);
    }));

    it('', inject(function() {
    }));
  })
});

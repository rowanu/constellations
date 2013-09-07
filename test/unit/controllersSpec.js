'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  var scope, UserCtrl, $httpBackend;
  var user = {
    login: 'rowanu',
    avatar_url: 'OHAI'
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

    it('should emit an update on update', inject(function() {
      spyOn(scope, '$emit');
      scope.username = 'rowanu';
      scope.submit();
      $httpBackend.flush();
      expect(scope.$emit).toHaveBeenCalled();
    }));
  })
});

/*jslint indent: 2 */
/*globals angular: false */
'use strict';

angular.module('constellationsApp.directives', [])
  // Taken from http://stackoverflow.com/questions/14995884/select-text-on-input-focus-in-angular-js
  .directive('selectOnClick', function () {
    return function (scope, element, attrs) {
      element.bind('click', function () {
        element[0].select();
      });
    };
  });

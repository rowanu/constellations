/*jslint indent: 2 */
/*globals angular: false, d3: false */
'use strict';

angular.module('constellationsApp.directives', [])
  .directive('nightSky', function () {
    var margin = 20,
      height = 1000,
      width = 1000;

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function linkSky(scope, element, attrs) {
        var chart = d3.select(element[0])
          .append('svg')
          .attr('width', width)
          .attr('heigh', height);

        scope.$watch('data', function (newValue, oldValue) {
          if (newValue) {
            console.log('watch')
            console.log(newValue);
          }
        });
      }
    };
  })
  // Taken from http://stackoverflow.com/questions/14995884/select-text-on-input-focus-in-angular-js
  .directive('selectOnClick', function () {
    return function (scope, element, attrs) {
      element.bind('click', function () {
        element[0].select();
      });
    };
  });

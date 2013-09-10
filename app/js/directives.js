/*jslint indent: 2 */
/*globals angular: false, d3: false */
'use strict';

angular.module('constellationsApp.directives', [])
  .directive('nightSky', function () {
    var margin = 20,
      width = 960,
      height = 500;

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function linkSky(scope, element, attrs) {
        var chart = d3.select(element[0]).append('svg')
          .attr('class', 'chart')
          .attr('width', width)
          .attr('height', height);

        scope.$watch('data', function (newValue, oldValue) {
          if (!newValue) { return; }

          var node = chart.selectAll('circle.node')
            .data(newValue)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', 12);

          // var force = d3.layout.force()
          //   .gravity(0.5)
          //   .distance(100)
          //   .charge(-100)
          //   .nodes(newValue)
          //   // .links(newValue)
          //   .size([width, height])
          //   .start();

          // force.on('tick', function() {
          //   link.attr('x1', function(d) { return d.source.x; })
          //       .attr('y1', function(d) { return d.source.y; })
          //       .attr('x2', function(d) { return d.target.x; })
          //       .attr('y2', function(d) { return d.target.y; });

          //   node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
          // });
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

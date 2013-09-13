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
        var svg = d3.select(element[0]).append('svg')
          .attr('class', 'chart')
          .attr('width', width)
          .attr('height', height);

        var force = d3.layout.force()
          .gravity(0.1)
          .distance(60)
          .charge(-100)
          .size([width, height]);

        scope.$watch('data', function (newValue, oldValue) {
          if (!newValue) { return; }
          console.log("REDRAW");

          force
            .nodes(newValue.nodes)
            .links(newValue.links)
            .start();

          var link = svg.selectAll(".link")
            .data(newValue.links)
            .enter().append("line")
            .attr("class", "link");

          var node = svg.selectAll('.node')
            .data(newValue.nodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('r', 4)
            .call(force.drag);
          
          // TODO: Append image based on type.
          node.append("image")
            .attr("xlink:href", "https://github.com/favicon.ico")
            .attr("x", -8)
            .attr("y", -8)
            .attr("width", 16)
            .attr("height", 16);

          node.append("svg:text")
            // .attr("dx", 12)
            // .attr("dy", ".35em")
            .text(function (d) { return d.name; });

          force.on('tick', function() {
            link.attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });
            node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
          });
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

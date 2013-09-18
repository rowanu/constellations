/*jslint indent: 2, browser: true */
/*globals angular: false, d3: false */
'use strict';

angular.module('constellationsApp.directives', [])
  // TODO: Move D3 code to own service (factory).
  .directive('nightSky', function ($window) {
    var width = $window.innerWidth,
      height = $window.innerHeight;

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
          .gravity(0.05)
          .distance(100)
          .charge(-400)
          .size([width, height]);

        scope.$watch('data', function (newValue, oldValue) {
          if (!newValue) { return; }
          console.log("REDRAW");

          force
            .nodes(newValue.nodes)
            .links(newValue.links)
            .start();

          var link = svg.selectAll('.link')
            .data(newValue.links)
            .enter().append('line')
            .attr('class', 'link');

          var node = svg.selectAll('.node')
            .data(newValue.nodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('r', 5)
            .call(force.drag);
          
          node.append('image')
            .attr('xlink:href', function (d, i) {
              var image = 'https://github.com/favicon.ico'; 
              if (d.type === 'repo') {
                image = 'img/star.png';
              } else if (d.type === 'user'){
                image = d.avatar_url;
              }
              return image;
            })
            .attr('x', -16)
            .attr('y', -16)
            .attr('width', 32)
            .attr('height', 32);

          // TODO: Make link
          node.append('svg:text')
            .attr('dx', 20)
            .text(function (d) { return d.name; })
            .on('click', function (d) { window.open(d.html_url); });

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

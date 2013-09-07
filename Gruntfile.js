/*jslint indent: 2 */
'use strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      options: {
        base: 'app',
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')(),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      }
    },
    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      watch: {},
      single: {
        singleRun: true
      }
    },
    watch: {
      livereload: {
        files: [ "app/**" ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("default", ["connect:livereload", "watch"]);
  grunt.registerTask("test", ["karma:single"]);
};

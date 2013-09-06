/*jslint indent: 2 */
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      server: {
        options: {
          port: 9000,
          base: 'app',
          keepalive: true
        }
      },
      test: {
        options: {
          port: 9001,
          base: 'app'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'config/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("default", ["connect"]);
};

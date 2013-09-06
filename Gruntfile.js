/*jslint indent: 2 */

'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'app',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.registerTask("default", ["connect"]);
};

/*
 * grunt-parallel
 * https://github.com/iammerrick/grunt-parallel
 *
 * Copyright (c) 2013 Merrick Christensen
 * Licensed under the MIT license.
 */
/*jshint es5:true*/
module.exports = function(grunt) {
  var Q = require('q');

  function spawn(task) {
    var deferred = Q.defer();

    grunt.util.spawn(task, function(error, result, code) {
      if (error || code !== 0) {
        grunt.log.error(result, error.message);
        return deferred.reject();
      }

      grunt.log.write(result.toString('ascii'));

      deferred.resolve();
    });

    return deferred.promise;
  }

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('parallel', 'Run sub-tasks in parallel.', function() {
    var done = this.async();
    var tasks = [];

    this.data.forEach(function(task) {
      tasks.push(spawn(task));
    });

    Q.all(tasks).then(function() {
      done();
    });
  });
};

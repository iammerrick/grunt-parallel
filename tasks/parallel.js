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
        var message = result.stderr || result.stdout;
        
        grunt.log.error(message);
        
        if (error.message) {
          grunt.log.error(error.message);
        }
        
        return deferred.reject();
      }

      grunt.log.writeln(result.toString('ascii'));

      deferred.resolve();
    });

    return deferred.promise;
  }

  grunt.registerMultiTask('parallel', 'Run sub-tasks in parallel.', function() {
    var done = this.async();
    Q.all(this.data.tasks.map(spawn)).then(done, done.bind(this, false));
  });
};

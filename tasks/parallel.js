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
  var lpad = require('lpad');

  function spawn(task) {
    var deferred = Q.defer();

    grunt.util.spawn(task, function(error, result, code) {
      if (error || code !== 0) {
        var message = result.stderr || result.stdout;

        grunt.log.error(message);
        
        return deferred.reject();
      }

      grunt.log.writeln('\n' + result);

      deferred.resolve();
    });

    return deferred.promise;
  }

  grunt.registerMultiTask('parallel', 'Run sub-tasks in parallel.', function() {
    lpad.stdout('    ');
    var done = this.async();
    Q.all(this.data.tasks.map(spawn)).then(done, done.bind(this, false)).finally(function() {
      lpad.stdout();
    });
  });
};

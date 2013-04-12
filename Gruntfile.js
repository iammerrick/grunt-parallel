module.exports = function(grunt) {
  
  grunt.registerTask('fast', function() {
    grunt.log.write('Fast task finished.');
  });
  
  grunt.registerTask('block', function() {
    var ms = 1000;
    var start = +(new Date());
    while (new Date() - start < ms);
    grunt.log.write('Blocking finished.');
  });
  
  grunt.registerTask('fail', function() {
    var ms = 500;
    var start = +(new Date());
    while (new Date() - start < ms);
    grunt.log.error('Failure to be awesome!');
    throw new Error('Broken!');
  });

  // Project configuration.
  grunt.initConfig({
    parallel: {
      assets: {
        tasks: [{
          grunt: true,
          args: ['fast']
        }, {
          grunt: true,
          args: ['block']
        },{
          grunt: true,
          args: ['fast']
       }]
      },
      shell: {
        tasks: [{
          cmd: 'whoami'
        }]
      },
      fail: {
        tasks: [{
          grunt: true,
          args: ['fast']
        }, {
          grunt: true,
          args: ['fail']
        }]
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  
  grunt.registerTask('default', ['parallel']);

};

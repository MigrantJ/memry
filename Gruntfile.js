'use strict';

module.exports  = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build/'],

    copy: {
      client: {
        expand: true,
        cwd: 'client/',  //current working directory
        src: ['*.html', 'css/*.css'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    browserify: {
      client: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['client/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      test: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['test/mocha/**/*.js'],
        dest: 'test/testbundle.js'
      }
    },

    //automatically restarts the app if nodemon detects changes to files
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          watch: ['server']
        }
      }
    },

    // Javascript minification.
    uglify: {
      compile: {
        options: {
          compress: true,
          verbose: true
        },
        files: [{
          src: 'build/<%= pkg.name %>.js',
          dest: 'dist/js/<%= pkg.name %>.js'
        }]
      }
    },

    watch: {
      compileClient: {
        files: ['client/**/*.*','test/testbundle.js'],
        tasks: ['build','test']
      },
      compileTests: {
        files: ['test/mocha/**/*.js'],
        tasks: ['browserify:test']
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch:compileTests', 'watch:compileClient'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    mocha: {
      test: {
        src: ['test/test.html'],
        options: {
          run: true
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'client/css',
          cssDir: 'build'
        }
      }
    }
  });

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('build', ['clean','copy:client','browserify:client','browserify:test','compass:dev']);
  grunt.registerTask('dev', ['build','test','concurrent:dev']);
};
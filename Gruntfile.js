module.exports  = function(grunt) {
  'use strict';

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
      }
    },

    //automatically restarts the app if nodemon detects changes to files
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          watch: ['server.js','server']
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
        files: ['client/**/*.*'],
        tasks: ['build','test']
      },
      testServer: {
        files: ['server.js','server/*.js'],
        tasks: ['test']
      },
      testTests: {
        files: ['test/**/*.js'],
        tasks: ['test']
      }
    },

    concurrent: {
      dev: {
        tasks: ['watch:testTests', 'watch:compileClient','watch:testServer', 'nodemon:dev'],
        options: {
          logConcurrentOutput: true
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
    },

    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: { src: 'test/mocha/*.js' }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/mocha/*.js']
      }
    },

    jshint: {
      options: {
        bitwise: true,
        curly: false,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        regexp: true,
        undef: true,
        strict: true,
        trailing: true,
        node: true
      },
      all: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js']
    }
  });

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build', ['clean','copy:client','browserify:client','compass:dev']);
  grunt.registerTask('dev', ['build','concurrent:dev']);
};
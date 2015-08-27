var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    del = require('del'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    karma = require('karma').server,
    mainBowerFiles = require('main-bower-files'),
    runSequence = require('run-sequence');

var conf = {
  clientDir: 'client/',
  jsDir: 'client/js/**/',
  testServerDir: 'test/server/unit/**/*.js',
  testClientDir: 'test/client/unit/**/*.js',
  bootstrapDir: 'bower_components/bootstrap-sass/'
};

var jshintOptions = {
  bitwise: true,
  camelcase: false,
  curly: true,
  eqeqeq: true,
  forin: true,
  freeze: true,
  immed: true,
  indent: 2,
  latedef: true,
  newcap: true,
  noarg: true,
  noempty: true,
  nonbsp: true,
  nonew: true,
  plusplus: false,
  quotmark: 'single',
  undef: true,
  unused: true,
  strict: true,
  sub: true,
  trailing: true,
  node: true
};
var jshintReporter = require('jshint-stylish');
var mochaOptions = {
  reporter: 'spec',
  timeout: 3000
};

//this is used to keep nodemon from triggering callback more than once
var serverStarted = false;

gulp.task('lint-js', function (cb) {
  gulp.src([conf.jsDir, 'server.js', 'server/*.js'])
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter(jshintReporter));
  cb();
});

gulp.task('clean', ['clean-js','clean-html','clean-css','clean-img']);

gulp.task('clean-all', function (cb) {
  del(['build/**/*.*','build/**','!build','!build/libs.js'], function (err) {
    if (err) {
      console.log("Error while cleaning: " + err);
    }
    cb(err);
  });
});

gulp.task('clean-js', function (cb) {
  del(['build/bundle.js'], function (err) {
    cb(err);
  });
});

gulp.task('clean-html', function (cb) {
  del(['build/views','build/*.html'], function (err) {
    cb(err);
  });
});

gulp.task('clean-css', function (cb) {
  del(['build/stylesheets'], function (err) {
    cb(err);
  });
});

gulp.task('clean-img', function (cb) {
  del(['build/img'], function (err) {
    cb(err);
  });
});

gulp.task('build', ['build-js','build-html','build-css','build-fonts','build-img'], function (done) {
  done();
});

gulp.task('build-libs', function (done) {
  var filePaths = mainBowerFiles({filter: '**/*.js'});

  gulp.src(filePaths)
    //.pipe(sourcemaps.init())
    .pipe(concat('libs.js'))
    //.pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));

  done();
});

gulp.task('build-js', ['lint-js','clean-js'], function () {
  gulp.src([conf.jsDir + 'module.js',conf.jsDir + '*.js'])
    //.pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    //.pipe(uglify())
    //.pipe(sourcemaps.write({debug: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('build-html', ['clean-html'], function () {
  gulp.src([conf.clientDir + '**/*.html'])
    .pipe(gulp.dest('build')).on('error', errorHandler);
});

gulp.task('build-css', ['clean-css'], function () {
  return gulp.src(conf.clientDir + 'css/app.scss')
    .pipe(sass({
      includePaths: [conf.bootstrapDir + 'assets/stylesheets'],
      errLogToConsole: true
    }))
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('build-fonts', function() {
  return gulp.src(conf.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('build-img', ['clean-img'], function () {
  gulp.src([conf.clientDir + '**/*.jpg',conf.clientDir + '**/*.png',conf.clientDir + '**/*.gif'])
    .pipe(gulp.dest('build')).on('error', errorHandler);
});

gulp.task('watch', ['watch-html','watch-client-js','watch-client-css','watch-server','watch-tests-client', 'watch-tests-server'], function (done) {
  done();
});

gulp.task('watch-html', function () {
  gulp.watch(conf.clientDir + '**/*.html', ['build-html'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});


gulp.task('watch-client-js', function () {
  gulp.watch(conf.clientDir + '**/*.js', ['build-js','test-client'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('watch-client-css', function () {
  gulp.watch(conf.clientDir + '**/*.scss', ['build-css'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});


gulp.task('watch-server', function (cb) {
  nodemon({
    script: 'server.js',
    watch: ['server.js','server'],
    stdout: true})
    .on('readable', function (data) {
      this.stdout.on('data', function (chunk) {
        if (!serverStarted && /Server Ready/.test(chunk)) {
          serverStarted = true;
          cb();
        }
      });
    })
    .on('change', ['lint-js'])
    .on('restart', function () {
    });
});

gulp.task('watch-tests-client', function () {
  gulp.watch(conf.testClientDir, ['test-client'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('watch-tests-server', function () {
  gulp.watch(conf.testServerDir, ['test-server'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('test-all', ['test-client','test-server','test-integration'], function (done) {
  runSequence('test-client',
    'test-server',
    'test-integration',
    done);
});

gulp.task('test-client', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('test-server', function () {
  return gulp.src('test/server/unit/**/*.js')
    .pipe(mocha(mochaOptions));
});

gulp.task('test-integration', function () {
  return gulp.src('test/server/integration/test-rest_api.js')
    .pipe(mocha(mochaOptions));
});

gulp.task('dev', function () {
  runSequence('build-libs',
    'build',
    'watch',
    'test-all');
});

gulp.task('default', ['dev']);

function errorHandler(error) {
  console.log(error.toString());
  this.emit('end');
}
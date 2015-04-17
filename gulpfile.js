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
    mainBowerFiles = require('main-bower-files');

var clientDir = 'client/',
    jsDir = clientDir + 'js/**/',
    testServerDir = 'test/server/unit/**/*.js',
    testClientDir = 'test/client/unit/**/*.js';

var jshintOptions = {
  bitwise: true,
  camelcase: true,
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
  trailing: true,
  node: true
};
var jshintReporter = require('jshint-stylish');
var mochaOptions = {
  reporter: 'spec',
  timeout: 3000
};

gulp.task('lint-js', function (cb) {
  gulp.src([jsDir, 'server.js', 'server/*.js'])
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter(jshintReporter))
    .pipe(jshint.reporter('fail')); //causes the task to fail if jshint was not successful
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
  del(['build/*.css'], function (err) {
    cb(err);
  });
});

gulp.task('clean-img', function (cb) {
  del(['build/img'], function (err) {
    cb(err);
  });
});

gulp.task('build', ['build-js','build-html','build-css','build-img']);

gulp.task('build-libs', function () {
  var filePaths = mainBowerFiles({filter: '**/*.js'});
  console.log(filePaths);

  gulp.src(filePaths)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('build-js', ['lint-js','clean-js'], function () {
  gulp.src([jsDir + 'module.js',jsDir + '*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('build-html', ['clean-html'], function () {
  gulp.src([clientDir + '**/*.html'])
    .pipe(gulp.dest('build')).on('error', errorHandler);
});

gulp.task('build-css', ['clean-css'], function () {
  gulp.src([clientDir + '**/*.scss','bower_components/bootstrap-sass-official/assets/stylesheets/*.scss','bower_components/bootstrap-sass-official/assets/stylesheets/**/*.scss'])
    .pipe(sass()).on('error', errorHandler)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('build-img', ['clean-img'], function () {
  gulp.src([clientDir + '**/*.jpg',clientDir + '**/*.png',clientDir + '**/*.gif'])
    .pipe(gulp.dest('build')).on('error', errorHandler);
});

gulp.task('watch', ['watch-client','watch-server','watch-tests-client', 'watch-tests-server']);

gulp.task('watch-client', function () {
  gulp.watch(clientDir + '**/*.*', ['build','test-client'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('watch-server', function (cb) {
  nodemon({
    script: 'server.js',
    watch: ['server.js','server'],
    stdout: false})
    .on('readable', function (data) {
      this.stdout.on('data', function (chunk) {
        if (/Server Ready/.test(chunk)) {
          cb();
        }
      });
    })
    .on('change', ['lint-js'])
    .on('restart', function () {
    });
});

gulp.task('watch-tests-client', function () {
  gulp.watch(testClientDir, ['test-client'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('watch-tests-server', function () {
  gulp.watch(testServerDir, ['test-server'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('test-all', ['test-client','test-server','test-integration']);

gulp.task('test-client', ['build-js'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('test-server', function () {
  return gulp.src('test/server/unit/**/*.js')
    .pipe(mocha(mochaOptions));
});

gulp.task('test-integration', ['watch-server'], function () {
  return gulp.src('test/server/integration/test-rest_api.js')
    .pipe(mocha(mochaOptions));
});

gulp.task('dev', ['build-libs','build','watch','test-all']);

gulp.task('default', ['dev']);

function errorHandler(error) {
  console.log(error.toString());
  this.emit('end');
}
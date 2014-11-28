var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    del = require('del'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

var clientDir = 'client/';
var jsDir = clientDir + 'js/**/';

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
  plusplus: true,
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

gulp.task('lint', function () {
  gulp.src([jsDir, 'server.js', 'server/*.js'])
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter(jshintReporter))
    .pipe(jshint.reporter('fail')); //causes the task to fail if jshint was not successful
});

gulp.task('clean', function () {
  del(['build/**/*.*'], function (err) {
    if (err) {
      console.log("Error while cleaning: " + err);
    }
  });
});

gulp.task('build', ['clean','build-js','build-html','build-css']);

gulp.task('build-js', function () {
  gulp.src([jsDir + 'module.js',jsDir + '*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('build-html', function () {
  gulp.src([clientDir + '**/*.html'])
    .pipe(gulp.dest('build'));
});

gulp.task('build-css', function () {
  gulp.src([clientDir + '**/*.scss'])
    .pipe(concat('style.scss'))
    .pipe(sass())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['watch-client','nodemon']);

gulp.task('watch-client', function () {
  gulp.watch(clientDir + '**/*.*', ['lint','build'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('nodemon', function () {
  nodemon({ script: 'server.js', watch: ['server.js','server']})
    .on('start', ['test-server'])
    .on('change', ['lint'])
    .on('restart', function () {
    });
});

gulp.task('test-server', function () {
  //wait a touch to give the server time to fully start
  setTimeout(function () {
    return gulp.src('test/mocha/tests.js')
      .pipe(mocha(mochaOptions));
  }, 100);
});

gulp.task('dev', ['lint','build','watch']);

gulp.task('default', ['dev']);
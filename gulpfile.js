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

gulp.task('lint', function () {
  gulp.src([jsDir, 'server.js', 'server/*.js'])
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter(jshintReporter))
    .pipe(jshint.reporter('fail')); //causes the task to fail if jshint was not successful
});

gulp.task('clean', function () {
  del(['build/**/*.*','!build/libs.js'], function (err) {
    if (err) {
      console.log("Error while cleaning: " + err);
    }
  });
});

gulp.task('build', ['clean','build-js','build-html','build-css','build-img']);

gulp.task('build-libs', function () {
  var filePaths = mainBowerFiles();

  gulp.src(filePaths)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

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
    .pipe(gulp.dest('build')).on('error', errorHandler);
});

gulp.task('build-css', function () {
  gulp.src([clientDir + '**/*.scss'])
    .pipe(sass()).on('error', errorHandler)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('build-img', function () {
  gulp.src([clientDir + '**/*.jpg',clientDir + '**/*.png',clientDir + '**/*.gif'])
    .pipe(gulp.dest('build')).on('error', errorHandler);
});

gulp.task('watch', ['watch-client','watch-server','watch-tests-client', 'watch-tests-server']);

gulp.task('watch-client', function () {
  gulp.watch(clientDir + '**/*.*', ['lint','build','test-client'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('watch-server', function () {
  nodemon({ script: 'server.js', watch: ['server.js','server']})
    //.on('start', ['test-integration'])
    .on('start', ['test-server'])
    .on('change', ['lint'])
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
  //wait a touch to give the server time to fully start
  setTimeout(function () {
    return gulp.src('test/server/integration/test-rest_api.js')
      .pipe(mocha(mochaOptions));
  }, 300);
});

gulp.task('dev', ['lint','build-libs','build','watch']);

gulp.task('default', ['dev']);

function errorHandler(error) {
  console.log(error.toString());
  this.emit('end');
}
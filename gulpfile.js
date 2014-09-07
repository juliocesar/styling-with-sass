// All build tasks
// ===============

var gulp = require('gulp');

// Build configurations.
var path = require('path');

var Config = {
  port:       '4567',
  srcDir:     path.resolve('./src'),
  publicDir:  path.resolve('./public'),
  distDir:    path.resolve('./dist')
};

// Fires error notifications via gulp-notify.
var notify = require('gulp-notify');

var handleErrors = function() {
  var args = [].slice.call(arguments);

  notify.onError({
    title: 'Compile error',
    message: "<%= error.message %>"
  }).apply(this, args);

  this.emit('end');
};

// SASS.
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  return gulp.src(Config.srcDir + '/stylesheets/*.scss')
    .pipe(sass().on('error', handleErrors))
    .pipe(gulp.dest(Config.publicDir + '/stylesheets/'))
});
// ---

// Autoprefixer.
var prefix = require('gulp-autoprefixer');

gulp.task('autoprefixer', ['sass'], function() {
  return gulp.src(Config.publicDir + '/stylesheets/*.css')
    .pipe(prefix("last 2 versions", "ie 9"))
    .pipe(gulp.dest(Config.publicDir + '/stylesheets/'))
});

// Server.
var connect = require('connect');
var http    = require('http');

gulp.task('serve', function() {
  var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static(Config.publicDir));

  http.createServer(app).listen(Config.port);
});
// ---

// Deployment.
var shell = require('gulp-shell');

gulp.task('deploy', shell.task([
  'git checkout gh-pages',
  'git checkout master -- public',
  'cp -r public/* .',
  'git commit -am "Deployment"',
  'git push origin gh-pages',
  'git checkout master'
]));

// ---

// Watch.
gulp.task('watch', function() {
  gulp.watch(Config.srcDir + '/stylesheets/**', ['autoprefixer']);
});
// ---

gulp.task('build',   ['autoprefixer']);
gulp.task('default', ['build', 'watch', 'serve']);

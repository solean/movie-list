var gulp = require('gulp');

var gutil = require('gulp-util');
var server = require('gulp-develop-server');

var serverFiles = ['./app.js', './routes/*.js', './views/*.handlebars'];

gulp.task('default', ['server:start'], function() {
  gulp.watch(serverFiles).on('change', server.restart);
});

gulp.task('server:start', function() {
  server.listen({
    path: './app.js'
  });
});

gulp.task('server:restart', function() {
  gulp.watch(['app.js'], server.restart);
});

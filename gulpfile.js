var gulp = require('gulp');
var sequence = require('gulp-sequence');
var webpack = require('webpack');
var path = require('path');
var shell = require('gulp-shell');
var clientProdConfig = require('./webpack.config.client.prod');
var delPath = require('del');

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}
gulp.task('_delete-dist', function(done) {
  delPath(['./dist/']).then(function(){
    done();
  });
});

gulp.task('_copy-layout', function (done) {
  var stream = gulp.src(['./src/template/index.html'])
    .pipe(gulp.dest('./dist/'));
  stream.on('end', function() {
    done();
  });
});

gulp.task('_copy-mock', function (done) {
  var stream = gulp.src(['./src/mock/mock.js'])
    .pipe(gulp.dest('./dist/client'));
  stream.on('end', function() {
    done();
  });
});

/**
 * compile ES6 client files
 */
gulp.task('_compile-client', function(done) {
  webpack(clientProdConfig).run(onBuild(done));
});

gulp.task('_run-dev-client', shell.task(['node devServer.js']));


/**
 * Create ready application in dist directory.
 */
gulp.task('compile', function(done) {
  sequence(
    '_delete-dist',
    '_copy-layout',
    '_copy-mock',
    '_compile-client',
    done
  )
});

/**
 * run everything for development
 */
gulp.task('dev-hot', function(done) {
  sequence(
    '_delete-dist',
    '_copy-layout',
    '_copy-mock',
    '_compile-client',
    '_run-dev-client',
    done
  )
});


// gulpfile.js - Updated for Angular 12
const gulp = require('gulp');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const exec = require('child_process').exec; // For executing Angular CLI commands

// Where our files are located
const jsFiles = "src/js/**/*.{js,ts}"; // Added .ts extension for TypeScript files
const viewFiles = "src/js/**/*.html";

const interceptErrors = function(error) {
  const args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

// Run Angular CLI build
gulp.task('ng-build', function(done) {
  // Execute Angular CLI build command
  // Note: This assumes Angular CLI is installed and configured
  exec('ng build --configuration development', function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done(err);
  });
});

// Copy HTML files
gulp.task('html', function() {
  return gulp.src("src/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

// Process component templates
// Note: In Angular 12, components typically include their templates directly or reference them with relative paths
// This task is kept for compatibility with existing code structure
gulp.task('views', function() {
  // Simply copy template files to build directory
  // Angular's build process will handle template compilation
  return gulp.src(viewFiles)
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/templates/'));
});

// Production build task
gulp.task('build', gulp.series('html', 'ng-build', function() {
  const html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  // Angular CLI already minifies JS in production mode
  // This is kept for compatibility with existing structure
  const js = gulp.src("build/*.js")
               .pipe(uglify())
               .pipe(gulp.dest('./dist/'));

  return merge(html, js);
}));

// Development server task
gulp.task('serve', gulp.series('html', 'views', 'ng-build', function(done) {
  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  // Watch for file changes
  gulp.watch("src/index.html", gulp.series('html'));
  gulp.watch(viewFiles, gulp.series('views'));
  
  // When JS/TS files change, trigger Angular build
  gulp.watch(jsFiles, gulp.series('ng-build'));
  
  done();
}));

// Default task
gulp.task('default', gulp.series('serve'));
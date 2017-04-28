const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const minifyCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const inject = require('gulp-inject');
const serve = require('gulp-serve');
const runSequence = require('run-sequence');
const del = require('del');

const paths = {
  sass: ['frontend/scss/**/*.scss'],
  pug: ['frontend/pug/**/*.pug'],
  js: [
    'frontend/www/js/**/*.js',
    '!frontend/www/js/app.js',
    '!frontend/www/js/routes.js',
  ],
  css: ['frontend/www/css/**/*.min.css'],
};

function injectResources(done) {
  gulp.src('frontend/www/index.html')
    .pipe(inject(gulp.src(paths.js, { read: false }), { relative: true }))
    .pipe(inject(gulp.src(paths.css, { read: false }), { relative: true }))
    .pipe(gulp.dest('frontend/www'))
    .on('end', done);
}

gulp.task('default', ['clean'], (done) => {
  runSequence('pug', 'sass', done);
});

gulp.task('clean', (done) => {
  del(['frontend/www/css', 'frontend/www/templates', 'frontend/www/index.html']).then(() => done());
});

gulp.task('sass', (done) => {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./frontend/www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0,
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./frontend/www/css/'))
    .on('end', () => injectResources(done));
});

gulp.task('pug', (done) => {
  gulp.src(paths.pug)
    .pipe(pug({
      pretty: true,
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('frontend/www'))
    .on('end', () => injectResources(done));
});

gulp.task('watch', ['default'], (done) => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pug, ['pug']);
  done();
});

gulp.task('serve', ['watch'], serve('frontend/www'));

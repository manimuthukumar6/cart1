/* Node and npm modules */
const eslint = require('gulp-eslint');
const path = require('path');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sassLint = require('gulp-sass-lint');
const flatten = require('gulp-flatten');
const webpack = require('webpack');

/* Project modules */
const environment = require('./config/environment');
const webpackConfig = require('./config/webpack');

/* Constants */
const SERVER_DIR = path.join(__dirname, 'server/');
const SERVER_SCRIPT = path.join(SERVER_DIR, 'bootstrapServer.js');
const SCRIPTS_WATCHLIST = ['**/*.js', '**/*.jsx', '!node_modules/**', '!dist/**', '!shared/**'];
const STYLES_WATCHLIST = ['app/**/*.scss'];

gulp.task('default', ['devserver']);

/**
 * Watches the files in the server/ directory and restarts the server if
 * there is any change.
 * The server takes care of re-compiling the application when something changes.
 */
gulp.task('devserver', () => {
  nodemon({
    script: SERVER_SCRIPT,
    watch: SERVER_DIR,
    ext: 'js hbs',
    env: environment.getEnvironment()
  });
});

const getBuildEnvironment = () => environment.getEnvironment({
  IS_BUNDLE: 'true'
});

const getBuildDir = () => getBuildEnvironment().BUILD_DIR;
const getStaticAssetsDir = () => getBuildEnvironment().STATIC_ASSETS_DIR;

gulp.task('build', [
  'build:client',
  'build:server',
  'copy:templates',
  'copy:package.json',
  'copy:images',
  'copy:fonts'
]);

gulp.task('copy:images', () => gulp.src('./images/**')
  .pipe(gulp.dest(path.join(getStaticAssetsDir(), 'images'))));
gulp.task('copy:fonts', () => gulp.src('./fonts/**')
  .pipe(gulp.dest(path.join(getStaticAssetsDir(), 'fonts'))));

gulp.task('copy:templates', () =>
  gulp.src(path.join(SERVER_DIR, 'middleware/renderTemplate/*.hbs'))
    .pipe(flatten())
    .pipe(gulp.dest(getBuildDir())));

gulp.task('copy:package.json', () =>
  gulp.src(path.join(__dirname, 'package.json'))
    .pipe(gulp.dest(getBuildDir())));

gulp.task('build:client', cb => {
  const clientConfig = webpackConfig.getBrowserBundleConfigForEnvironment(getBuildEnvironment());
  webpack(clientConfig, (err, stats) => {
    if (err) {
      console.error(err.toString({ colors: true })); // eslint-disable-line no-console
      cb(err);
    } else {
      console.log(stats.toString({ colors: true })); // eslint-disable-line no-console
      cb();
    }
  });
});

gulp.task('build:server', cb => {
  const serverConfig = webpackConfig.getServerBundleConfigForEnvironment(getBuildEnvironment());
  webpack(serverConfig, (err, stats) => {
    if (err) {
      console.error(err.toString({ colors: true })); // eslint-disable-line no-console
      cb(err);
    } else {
      console.log(stats.toString({ colors: true })); // eslint-disable-line no-console
      cb();
    }
  });
});

gulp.task('lint:js', () =>
  gulp.src(SCRIPTS_WATCHLIST)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('lint:scss', () =>
  gulp.src(STYLES_WATCHLIST)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
);

gulp.task('lint', ['lint:js', 'lint:scss']);

gulp.task('watch:lint', () => {
  gulp.watch(SCRIPTS_WATCHLIST.concat(STYLES_WATCHLIST), ['lint']);
});

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const groupMedia = require('gulp-group-css-media-queries');
const size = require('gulp-size');
const rename = require('gulp-rename');
const mode = require('gulp-mode')();

const paths = require('../paths');

const css = () => {
  return gulp.src(paths.app.css)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        sourceMap: true,
        precision: 3,
        errLogToConsole: true,
      }).on('error', sass.logError),
    )
    .pipe(mode.production(groupMedia()))
    .pipe(
      mode.production(
        postcss([
          autoprefixer(),
          cssnano(),
        ]),
      ),
    )
    .pipe(mode.development(sourcemaps.write()))
    .pipe(size({ showFiles: true }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.docs.css));
}

module.exports = css;

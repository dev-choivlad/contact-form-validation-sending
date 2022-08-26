const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const size = require('gulp-size');
const mode = require('gulp-mode')();
const webp = require('gulp-webp') // convert images to webp
const paths = require('../paths');

const imageMinConfig = {
  mozjpeg: { quality: 75, progressive: true },
  optipng: { optimizationLevel: 5 },
  svgo: {
    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
  },
};

const images = () => {
  return gulp.src(paths.app.images)
    .pipe(webp({
      quality: 70,
    }))
    .pipe(gulp.dest(paths.docs.images))
    .pipe(gulp.src(paths.app.images))
    .pipe(
      mode.production(
        imagemin([
          imagemin.mozjpeg(imageMinConfig.mozjpeg),
          imagemin.optipng(imageMinConfig.optipng),
          imagemin.svgo(imageMinConfig.svgo),
        ]),
      ),
    )
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.docs.images));
}

module.exports = images;

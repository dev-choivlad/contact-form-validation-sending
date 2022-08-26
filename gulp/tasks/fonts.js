const gulp = require('gulp');
const paths = require('../paths');

const fonts = () => {
  return gulp.src(paths.app.fonts)
    .pipe(gulp.dest(paths.docs.fonts));
}

module.exports = fonts;

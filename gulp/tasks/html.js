const gulp = require('gulp');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const cachebust = require('gulp-cache-bust');
const mode = require('gulp-mode')();
const fileInclude = require('gulp-file-include')
const webpHTML = require('gulp-webp-html') // replaces <img/>to <picture/> supports webp
const paths = require('../paths');

const cachebustConfig = {
  type: 'timestamp',
};

const htmlminConfig = {
  collapseWhitespace: true,
};

const html = () => {
  return gulp.src(paths.app.html)
    .pipe(rigger())
    .pipe(fileInclude())
    .pipe(webpHTML())
    .pipe(mode.production(htmlmin(htmlminConfig)))
    .pipe(mode.production(cachebust(cachebustConfig)))
    .pipe(gulp.dest(paths.docs.html));
}

module.exports = html;

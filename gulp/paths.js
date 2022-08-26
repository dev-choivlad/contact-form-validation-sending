module.exports = {
  app: {
    html: 'app/index.html',
    css: 'app/scss/main.scss',
    js: 'app/js/**/*.js',
    images: 'app/img/**/*',
    fonts: 'app/fonts/**/*',
  },
  watch: {
    html: 'app/**/*.html',
    css: 'app/scss/**/*.scss',
    js: 'app/js/**/*.js',
    images: 'app/img/**/*',
    fonts: 'app/fonts/**/*',
  },
  docs: {
    html: 'docs/',
    css: 'docs/css/',
    js: 'docs/js/',
    images: 'docs/img/',
    fonts: 'docs/fonts/',
  },
  inject: {
    html: 'docs/index.html',
    css: 'docs/css/**/*.css',
    js: 'docs/js/**/*.js',
  },
  clean: {
    clean: 'docs/',
  }
}

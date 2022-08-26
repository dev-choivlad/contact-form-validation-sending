const del = require('del');
const paths = require('../paths');

const clean = () => {
  return del(paths.clean.clean);
}

module.exports = clean;

const inliner = require('./index');

module.exports = {
  'svg($path, $selectors: null)': inliner('./', {}),
  'inline-svg($path, $selectors: null)': inliner('./', {})
};

const inliner = require('./index');

module.exports = {
  'svg': inliner('./', {}),
  'inline-svg': inliner('./', {})
};

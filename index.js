// imports
const deasync = require('deasync');
const readFileSync = require('fs').readFileSync;
const resolve = require('path').resolve;
const types = require('sass').types;
const assign = require('object-assign');
const parse = require('htmlparser2').parseDOM;
const selectAll = require('css-select');
const selectOne = selectAll.selectOne;
const serialize = require('dom-serializer').default;
const svgToDataUri = require('mini-svg-data-uri');
const svgo = new (require('svgo'))();
const optimize = deasync(optimizeAsync);

const defaultOptions = {
  optimize: false, encodingFormat: 'base64'
};

// exports
module.exports = inliner;

/**
 * The SVG inliner function
 * This is a factory that expects a base path abd returns the actual function
 * @param base
 * @param opts {optimize: true/false}
 * @returns {Function}
 */
function inliner (base, opts) {
  opts = assign({}, defaultOptions, opts);

  return function (path, selectors) {
    try {
      let content = readFileSync(resolve(base, path.getValue()));

      if (selectors && selectors.getLength && selectors.getLength()) { content = changeStyle(content, selectors); }

      if (opts.optimize) { content = Buffer.from(optimize(content).data, 'utf8'); }

      return encode(content, {
        encodingFormat: opts.encodingFormat
      });
    } catch (err) {
      console.log(err);
    }
  };
}

/**
 * encode the string
 * @param content
 * @param opts
 * @returns {types.String}
 */
function encode (content, opts) {
  if (opts.encodingFormat === 'uri') {
    return new types.String('url("' + svgToDataUri(content.toString('UTF-8')) + '")');
  }

  if (opts.encodingFormat === 'base64') {
    return new types.String('url("data:image/svg+xml;base64,' + content.toString('base64') + '")');
  }

  throw new Error('encodingFormat ' + opts.encodingFormat + ' is not supported');
}

/**
 * change the style of the svg
 * @param source
 * @param styles
 * @returns {*}
 */
function changeStyle (source, selectors) {
  const dom = parse(source, {
    xmlMode: true
  });
  const svg = dom ? selectOne('svg', dom) : null;

  selectors = mapToObj(selectors);

  if (!svg) {
    throw Error('Invalid svg file');
  }

  Object.keys(selectors).forEach(function (selector) {
    const elements = selectAll(selector, svg);
    const attribs = selectors[selector];

    elements.forEach(function (element) {
      assign(element.attribs, attribs);
    });
  });

  return Buffer.from(serialize(dom), 'utf8');
}

/**
 * transform a sass map into a js object
 * @param map
 * @returns {null}
 */
function mapToObj (map) {
  const obj = Object.create(null);

  for (let i = 0, len = map.getLength(); i < len; i++) {
    const key = map.getKey(i).getValue();
    let value = map.getValue(i);

    switch (value.constructor.name) {
      case types.Map.name:
        value = mapToObj(value);
        break;
      case types.Color.name:
        if (value.getA() === 1) {
          value = 'rgb(' + value.getR() + ',' + value.getG() + ',' + value.getB() + ')';
        } else {
          value = 'rgba(' + value.getR() + ',' + value.getG() + ',' + value.getB() + ',' + value.getA() + ')';
        }
        break;
      default:
        value = value.getValue();
    }

    obj[key] = value;
  }

  return obj;
}

function optimizeAsync (src, cb) {
  svgo
    .optimize(src)
    .then(function (result) {
      return cb(null, result);
    })
    .catch(cb);
}

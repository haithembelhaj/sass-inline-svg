// imports
var readFile = require('fs').readFileSync;
var resolve = require('path').resolve;
var types = require('node-sass').types;

// exports
module.exports = inliner;

/**
 * The SVG inliner function
 * This is a factory that expects a base path abd returns the actual function
 * @param base
 * @returns {Function}
 */
function inliner(base) {

  return function(path){

    var content;

    try{

      content = readFile(resolve(base, path.getValue()));

    }catch(e){

      console.log(e);
    }

    return (new types.String('url("data:image/svg+xml;base64,'+content.toString('base64')+'")'));
  }
}

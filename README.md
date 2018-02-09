[![Build Status](https://travis-ci.org/haithembelhaj/sass-inline-svg.svg)](https://travis-ci.org/haithembelhaj/sass-inline-svg)
[![Coverage Status](https://coveralls.io/repos/github/haithembelhaj/sass-inline-svg/badge.svg?branch=master)](https://coveralls.io/github/haithembelhaj/sass-inline-svg?branch=master)
[![Dependency Status](https://david-dm.org/haithembelhaj/sass-inline.svg)](https://david-dm.org/haithembelhaj/sass-inline-svg)
[![devDependency Status](https://david-dm.org/haithembelhaj/sass-inline-svg/dev-status.svg)](https://david-dm.org/haithembelhaj/sass-inline-svg#info=devDependencies)
# sass-inline-svg

## Install

```
$ npm install --save-dev sass-inline-svg
```


## Usage

You can use this function in node-sass or any project that depends on node-sass.
The only thing you need to do to make this work is add the inlinerfunction to the functions option.

You should initialize the inliner with a basepath where it will look for the svg files.

### node-sass

```js
var sass = require('node-sass');
var inliner = require('sass-inline-svg')

sass.render({
  data: '.logo-icon{ background: svg("logo.svg")}',
  functions: {

    svg: inliner('./', [options])
  }
});
```

#### node-sass CLI usage

```
node-sass --functions=node_modules/sass-inline-svg/default [other node-sass arguments]
```

This is equivalent to specifying the following:

```
functions: {
  'svg': inliner('./', {}),
  'inline-svg': inliner('./', {})
}
```

### grunt-sass


```js
var compass = require('sass-inline-svg')


grunt.initConfig({

    sass:{

        options: {
            functions: {

                svg: inliner('./', [options])
            }
        },
        ...
    }

})
```

## options

### optimize (default false)

`{optimize: true}` uses [svgo](https://github.com/svg/svgo) internally to optmize the svg.

### encodingFormat (default: base64)

`base64` will encode the SVG with base64, while `uri` will do a minimal URI-encoding of the svg – `uri` is always smaller, and has good browser support as well.

## svg transformation

The inliner accepts a second argument, a sass-map, that describes a css like transformation. The first keys of this map are css-selectors. Their values are also sass-maps that holds a key-value store of the svg-attribute transformation you want to apply to the corresponding selector.
```

.logo-icon{

  background: svg("logo.svg", (path: (fill: green), rect: (stroke: white)));
}

```

In this example `path` and `rect` are selectors and `fill: green` and `stroke: white` are the associated applied attributes.

## License

MIT

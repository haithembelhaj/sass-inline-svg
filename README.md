[![Build Status](https://travis-ci.org/haithembelhaj/sass-inline-svg.svg)](https://travis-ci.org/haithembelhaj/sass-inline-svg)
[![Dependency Status](https://david-dm.org/micro-node/client.svg)](https://david-dm.org/micro-node/sass-inline-svg)
[![devDependency Status](https://david-dm.org/micro-node/sass-inline-svg/dev-status.svg)](https://david-dm.org/micro-node/sass-inline-svg#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/micro-node/sass-inline-svg/badge.svg?branch=master)](https://coveralls.io/github/micro-node/sass-inline-svg?branch=master)
# sass-inline-svg

## Install

```
$ npm install --save-dev sass-inline-svg
```


## Usage

You can use this function in node-sass or any project that depends on node-sass.
The only thing you need to do to make this work is add the inlinerfunction to the functions option.
You should initialise the inlienr ith a basepath wehe it will llook at svg files.
 
### node-sass

```js
var sass = require('node-sass');
var inliner = require('sass-inline-svg')

sass.render({
  data: '.logo-icon{ background: svg("logo.svg"}',
  functions: {
    
    svg: inliner('./')
  }
});

```

### grunt-sass


```js
var compass = require('sass-inline-svg')


grunt.initConfig({
    
    sass:{
       
        options: {
            functions: {
                
                svg: inliner('./')
            }
        },
        ...        
    }

})
```


## License

MIT

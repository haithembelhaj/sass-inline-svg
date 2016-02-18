[![Build Status](https://travis-ci.org/haithembelhaj/sass-inline-svg.svg)](https://travis-ci.org/haithembelhaj/sass-inline-svg)
# sass-inline-svg

## Install

```
$ npm install --save-dev sass-inline-svg
```


## Usage

You can use this importer in node-sass or any project that depends on node-sass.
the only thing you need to do to make this work is add the importer to the options and include the '.compass' folder.
 
### node-sass

```js
var sass = require('node-sass');
var compass = require('sass-inline-svg')

sass.render({
  data: '@import "compass"; .transition { @include transition(all); }',
  importer: compass
});

```

### grunt-sass


```js
var compass = require('sass-inline-svg')


grunt.initConfig({
    
    sass:{
       
        options: {
            importer: compass
        },
        ...        
    }

})
```

### gulp-sass


```js
var gulp = require('gulp')
var sass = require('gulp-sass')
var compass = require('sass-inline-svg')


gulp.task('sass', function()
{
    return gulp.src('sass/**/*.scss')
      .pipe(sass({ importer: compass }).on('error', sass.logError))
      .pipe(gulp.dest('./css'));

});
```


## License

MIT

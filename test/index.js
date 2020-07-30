const sass = require('sass');
const svg = require('../index.js');
const expect = require('chai').expect;
const fs = require('fs');
const resolve = require('path').resolve;
const encodeMiniUri = require('mini-svg-data-uri');

describe('test svg inliner', function () {
  it('should inline svg image as base64', function (done) {
    sass.render({
      data: '.sass{background: svg("test.svg");}',
      functions: {
        'svg($path, $selectors: null)': svg(__dirname)
      }
    }, function (err, result) {
      if (err) {
        return done(err);
      }

      const expectedResult = fs.readFileSync(resolve(__dirname, 'test.svg')).toString('base64');

      expect(result.css.toString()).to.equal(`.sass {\n  background: url("data:image/svg+xml;base64,${expectedResult}");\n}`);
      done();
    });
  });

  it('should inline svg image as uri', function (done) {
    sass.render({
      data: '.sass{background: svg("test.svg");}',
      functions: {
        'svg($path, $selectors: null)': svg(__dirname, {
          encodingFormat: 'uri'
        })
      }
    }, function (err, result) {
      if (err) {
        return done(err);
      }

      const expectedResult = encodeMiniUri(fs.readFileSync(resolve(__dirname, 'test.svg')).toString('utf-8'));

      expect(result.css.toString()).to.equal(`.sass {\n  background: url("${expectedResult}");\n}`);
      done();
    });
  });

  it('should apply style to svg image', function (done) {
    sass.render({
      data: '.sass{background: svg("path-optimized.svg", (path: (fill: #000)));}',
      functions: {
        'svg($path, $selectors: null)': svg(__dirname)
      }
    }, function (err, result) {
      if (err) {
        return done(err);
      }

      const expectedResult = Buffer.from('<svg height="210" width="400"><path fill="rgb(0,0,0)" d="M150 0L75 200h150z"/></svg>\n', 'utf8').toString('base64');

      expect(result.css.toString()).to.equal(`.sass {\n  background: url("data:image/svg+xml;base64,${expectedResult}");\n}`);
      done();
    });
  });

  it('should apply alpha value if set in the colour', function (done) {
    sass.render({
      data: '.sass{background: svg("path-optimized.svg", (path: (fill: rgba(0,0,0,0.5))));}',
      functions: {
        'svg($path, $selectors: null)': svg(__dirname)
      }
    }, function (err, result) {
      if (err) {
        return done(err);
      }

      const expectedResult = Buffer.from('<svg height="210" width="400"><path fill="rgba(0,0,0,0.5)" d="M150 0L75 200h150z"/></svg>\n', 'utf8').toString('base64');

      expect(result.css.toString()).to.equal(`.sass {\n  background: url("data:image/svg+xml;base64,${expectedResult}");\n}`);
      done();
    });
  });

  it('should optimize svg', function (done) {
    sass.render({
      data: '.sass{background: svg("path.svg")}',
      functions: {
        'svg($path, $selectors: null)': svg(__dirname, {
          optimize: true
        })
      }
    }, function (err, result) {
      if (err) {
        return done(err);
      }

      const expectedResult = Buffer.from('<svg height="210" width="400"><path fill="red" d="M150 0L75 200h150z"/></svg>', 'utf8').toString('base64');

      expect(result.css.toString()).to.equal(`.sass {\n  background: url("data:image/svg+xml;base64,${expectedResult}");\n}`);
      done();
    });
  });

  it('should optimize svg with styling', function (done) {
    sass.render({
      data: '.sass{background: svg("path.svg", (path: (fill: #fff)))}',
      functions: {
        'svg($path, $selectors: null)': svg(__dirname, {
          optimize: true
        })
      }
    }, function (err, result) {
      if (err) {
        return done(err);
      }

      const expectedResult = Buffer.from('<svg height="210" width="400"><path fill="#FFF" d="M150 0L75 200h150z"/></svg>', 'utf8').toString('base64');

      expect(result.css.toString()).to.equal(`.sass {\n  background: url("data:image/svg+xml;base64,${expectedResult}");\n}`);
      done();
    });
  });
});

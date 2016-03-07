var sass = require('node-sass');
var svg = require('../index.js');
var expect = require('chai').expect;

describe('test svg inliner', function(){

  it('should inline svg image', function(done){

    sass.render({
      data: '.sass{background: svg("test.svg");}',
      functions: {svg: svg(__dirname)}
    }, function(err, result){

      expect(result.css.toString()).to.equal('.sass {\n  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMTAgMTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPC9zdmc+DQo="); }\n');
      done(err);
    });
  })


  it('should apply style to svg image', function(done){

    sass.render({
      data: '.sass{background: svg("path.svg", (path: (fill: #000)));}',
      functions: {svg: svg(__dirname)}
    }, function(err, result){

      expect(result.css.toString()).to.equal('.sass {\n  background: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIxMCIgd2lkdGg9IjQwMCI+PHBhdGggZmlsbD0icmdiYSgwLDAsMCwxKSIgZD0iTTE1MCAwIEw3NSAyMDAgTDIyNSAyMDAgWiIvPjwvc3ZnPg=="); }\n');
      done(err);
    });
  })
});
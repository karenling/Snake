(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.board = board;
    this.dir = "S";
    this.segments = [new Coord(5, 5)];
  };

  Snake.prototype.move = function () {
    var directions = {
      "N": [-1, 0],
      "E": [0, 1],
      "W": [0, -1],
      "S": [1, 0]
    };

    var newSegment = this.segments[0].plus(directions[this.dir]);
    this.segments.unshift(newSegment);

    return this.segments;
  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

  var Coord = SnakeGame.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (pair) {
    debugger;
    return new Coord(this.i + pair[0], this.j + pair[1])

  };

  Coord.prototype.equals = function () {

  };

  Coord.prototype.isOpposite = function () {

  };

  var Board = SnakeGame.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake(this);
  };

  Board.blankgrid = function (dim) {
    var grid = [];
    for(var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) {
        row.push('.');
      }
      grid.push(row);
    }
    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.blankgrid(this.dim);
    this.snake.segments.forEach(function(segment, index) {
      grid[segment.i][segment.j] = "S";
    });

    this.print(grid);
    // return grid;
  };

  Board.prototype.print = function (grid) {
    grid.forEach(function (row, idx) {
      console.log(row);
    });
  };

})();

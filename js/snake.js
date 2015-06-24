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

  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

  var Coord = SnakeGame.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (i, j) {

  };

  Coord.prototype.equals = function () {

  };

  Coord.prototype.isOpposite = function () {

  };

  var Board = SnakeGame.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake(this);
  };

  Board.prototype.render = function () {
    var grid = [];
    for(var i = 0; i < this.dim; i++) {
      var row = [];
      for (var j = 0; j < this.dim; j++) {
        row.push(".");
      }
      grid.push(row);
    }

    return grid;
  };

})();

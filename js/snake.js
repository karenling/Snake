(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.board = board;
    this.dir = "S";
    this.segments = [new Coord(5, 5)];
    this.bodyLeft = 0;
  };

  Snake.prototype.move = function () {
    var directions = {
      "N": [-1, 0],
      "E": [0, 1],
      "W": [0, -1],
      "S": [1, 0]
    };

    var newSegment = this.segments[0].plus(directions[this.dir]);
    // this.segments.unshift(newSegment);
    this.segments.unshift(newSegment);

    if (this.bodyLeft === 0) {
      this.segments.pop(); // since snake is designed to keep growing, we need to remove one each time
    } else {
      this.bodyLeft -= 1;
    }

    // debugger;
    // eats apple
    if (this.segments[0].i === this.board.apple.coord.i && this.segments[0].j === this.board.apple.coord.j) {
      this.bodyLeft += 5;
      this.board.newApple();
    }

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
    return new Coord(this.i + pair[0], this.j + pair[1])

  };

  // snake hits itself
  Coord.prototype.equals = function (coord2) {
    return (this.i === coord2.i) && (this.j === coord2.j)
  };

  Coord.prototype.isOpposite = function () {

  };

  var Board = SnakeGame.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    this.newApple();
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

  Board.prototype.newApple = function () {
    var random1 = Math.floor(Math.random()*21);
    var random2 = Math.floor(Math.random()*21);

    var newAppleIsOnSnake = true;
    while (newAppleIsOnSnake) {
      newAppleIsOnSnake = false;
      this.snake.segments.forEach(function(segment, index) {
        if (segment.i === random1 && segment.j === random2) {
          random1 = Math.floor(Math.random()*21);
          random2 = Math.floor(Math.random()*21);
          newAppleIsOnSnake = true;
        }
      }.bind(this));

    }

    this.apple = new SnakeGame.Apple(random1, random2);
  };



  var Apple = SnakeGame.Apple = function (x, y) {
    this.coord = new Coord(x, y)
  };
})();

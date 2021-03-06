(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.board = board;
    this.dir = "S";
    this.segments = [new Coord(5, 5)];
    this.bodyLeft = 0;
    this.turning = false;
    this.over = false;
  };

  Snake.prototype.move = function () {
    if (this.over) {
      return;
    }
    var directions = {
      "N": [-1, 0],
      "E": [0, 1],
      "W": [0, -1],
      "S": [1, 0]
    };

    if (this.segments.length === 0) {
      return;
    }

    if (this.isOutOfBounds()) {
      alert("you died!");
      this.segments = [];
      this.over = true;
      return;
    }

    var newSegment = this.segments[0].plus(directions[this.dir]);
    this.segments.unshift(newSegment);

    // check that snake doesn't hit himself
    this.segments.slice(1).forEach(function (segment) {
      if (segment.equals(this.segments[0])) {
        alert("Game Over!");
        this.segments = [];
        this.over = true;
        return;
      }

    }.bind(this));

    if (this.over) {
      return;
    }

    this.turning = false;

    if (this.bodyLeft === 0) {
      this.segments.pop();
    } else {
      this.bodyLeft -= 1;
    }

    if (this.segments[0].i === this.board.apple.coord.i && this.segments[0].j === this.board.apple.coord.j) {
      this.bodyLeft += 5;
      this.board.newApple();
    }
    return this.segments;
  };

  Snake.prototype.isOutOfBounds = function () {
    return (this.segments[0].i > 20 ||
            this.segments[0].j > 20 ||
            this.segments[0].i < 0 ||
            this.segments[0].j < 0);
  };

  Snake.prototype.turn = function (newDir) {
    var current = this;
    if (current.isOpposite(newDir) || this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = newDir;
    }
  };

  Snake.prototype.isOpposite = function(newDir) {
    return  (this.dir === "E" && newDir === "W") ||
            (this.dir === "N" && newDir === "S") ||
            (this.dir === "W" && newDir == "E")  ||
            (this.dir === "S" && newDir === "N");
  };

  var Coord = SnakeGame.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (pair) {
    return new Coord(this.i + pair[0], this.j + pair[1]);
  };

  Coord.prototype.equals = function (coord2) {
    return (this.i === coord2.i) && (this.j === coord2.j);
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
    this.coord = new Coord(x, y);
  };
})();

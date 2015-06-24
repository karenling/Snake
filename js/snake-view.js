(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board();
    this.dim = 20;
    this.setupBoard();

    $(window).keydown(function (e) {
      if (e.keyCode === 38) {
        this.board.snake.turn("N");
      } else if (e.keyCode === 37) {
        this.board.snake.turn("W");
      } else if (e.keyCode === 39) {
        this.board.snake.turn("E");
      } else if (e.keyCode === 40) {
        this.board.snake.turn("S");
      }
    }.bind(this));


    setInterval(function () {
      this.board.snake.move();
      this.$el.html(this.render.bind(this));
    }.bind(this), 100);
  };

  View.prototype.setupBoard = function () {
    for(i = 0; i <= this.dim; i++) {
      var $row = $('<div class="row">');
      for(j = 0; j <= this.dim; j++) {
        $row.append($('<div>').addClass("cell row-" + i + " col-" + j));
      }
      this.$el.append($row);
    }
  };

  View.prototype.render = function () {
    this.$el.html("");
    this.setupBoard();
    $('.row-' + this.board.apple.coord.i + '.col-' + this.board.apple.coord.j).addClass('apple');
    this.board.snake.segments.forEach(function(coord, idx) {
      $('.row-' + coord.i + '.col-' + coord.j).addClass('snake');
    }.bind(this));
  };
})();

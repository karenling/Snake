(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(); // from other file
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
    }.bind(this), 500);
  };

  View.prototype.setupBoard = function () {
    for(i = 0; i <= 20; i++) {
      var $row = $('<div class="row">');
      for(j = 0; j <= 20; j++) {
        $row.append($('<div>').addClass("cell row-" + i + " col-" + j));
      }
      this.$el.append($row);
    }
  };

  View.prototype.render = function () {
    this.board.snake.segments.forEach(function(coord, idx) {
      $('.row-' + coord.i + '.col-' + coord.j).html("S");
    })
  };
})();

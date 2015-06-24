(function () {
  if (typeof SnakeGame === 'undefined') {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = SnakeGame.Board(); // from other file
    this.setupBoard();
  };

  View.prototype.setupBoard = function () {
    for(i = 0; i <= 20; i++) {
      var $row = $('<div class="row">');
      for(j = 0; j <= 20; j++) {
        $row.append($('<div>').addClass("cell"));
      }
      this.$el.append($row);
    }
  };

})();

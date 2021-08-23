const outBounds = require('./outBounds');

const calcNumNearMines = (x, y, board) => {
  if (outBounds(x, y)) return 0;
  let numMines = 0;
  for (let offsetX = -1; offsetX <= 1; offsetX++) {
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      if (
        !outBounds(offsetX + x, offsetY + y, board.length) &&
        board[offsetX + x][offsetY + y] == -1
      ) {
        numMines += 1;
      }
    }
  }
  return numMines;
};

module.exports = calcNumNearMines;

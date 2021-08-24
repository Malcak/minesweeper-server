const outBounds = require('../utils/outBounds');
const calcNumNearMines = require('../utils/calcNumNearMines');
const isWinState = require('../utils/isWinState');

const isMine = (x, y, board) => {
  return board[x][y] == -1;
};

const isRevealed = (x, y, flags) => {
  return flags[x][y] != 0;
};

const reveal = (x, y, prevState) => {
  if (outBounds(x, y, prevState.board.length)) return prevState;
  if (isRevealed(x, y, prevState.flags)) return prevState;
  const { board, flags } = prevState;
  flags[x][y] = 1;
  let nextState = { board, flags };
  if (isMine(x, y, board)) return nextState;
  if (calcNumNearMines(x, y, board) != 0) return nextState;
  nextState = reveal(x - 1, y - 1, nextState);
  nextState = reveal(x - 1, y + 1, nextState);
  nextState = reveal(x + 1, y - 1, nextState);
  nextState = reveal(x + 1, y + 1, nextState);
  nextState = reveal(x - 1, y, nextState);
  nextState = reveal(x + 1, y, nextState);
  nextState = reveal(x, y - 1, nextState);
  nextState = reveal(x, y + 1, nextState);

  return nextState;
};

const performAction = (data, callback) => {
  const { coords, board, flags } = data;

  const nextState = reveal(coords.x, coords.y, { board, flags });

  if (isMine(coords.x, coords.y, board)) {
    callback({ ...nextState, condition: 'lose' });
  } else if (isWinState(nextState)) {
    callback({ ...nextState, condition: 'win' });
  } else {
    callback({ ...nextState, condition: 'playing' });
  }
};

module.exports = performAction;

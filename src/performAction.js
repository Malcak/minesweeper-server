const outBounds = require('./utils/outBounds');

const calcNear = (x, y, board) => {
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
  if (calcNear(x, y, board) != 0) return nextState;
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

const allCellsTouched = (state) => {
  const { flags } = state;
  let areAllCellsTouched = true;
  for (let index = 0; index < flags.length; index++) {
    const element = flags[index];
    if (element.some((n) => n === 0)) {
      areAllCellsTouched = false;
    }
  }
  return areAllCellsTouched;
};

const allMinesIdentified = (state) => {
  const { board, flags } = state;
  const size = board.length;
  let areAllFlagsCorrect = true;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (flags[i][j] == -1 && flags[i][j] != board[i][j]) {
        areAllFlagsCorrect = false;
      }
    }
  }
  return areAllFlagsCorrect;
};

const isWinState = (state) => {
  return allCellsTouched(state) && allMinesIdentified(state);
};

const performAction = (data, callback) => {
  const { coords, board, flags } = data;

  if (isMine(coords.x, coords.y, board)) {
    callback({ board, flags, condition: 'lose' });
    return;
  }
  const state = reveal(coords.x, coords.y, { board, flags });

  if (isWinState(state)) {
    callback({ ...state, condition: 'win' });
  } else {
    callback({ ...state, condition: 'playing' });
  }
};

module.exports = performAction;

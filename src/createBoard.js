const outBounds = require('./utils/outBounds');
const calcNumNearMines = require('./utils/calcNumNearMines');

const addMine = () => {
  const rng = Math.random();
  return rng < 0.1 ? -1 : 0;
};

const placeMines = (board) => {
  const size = board.length;
  for (let index = 0; index < board.length; index++) {
    const row = Array.from({ length: size }, () => addMine());
    board[index] = row;
  }

  return board;
};

const calcNearMines = (board) => {
  const size = board.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] != -1) {
        board[i][j] = calcNumNearMines(i, j, board);
      }
    }
  }
  return board;
};

const createBoard = (size, callback) => {
  let board = Array(size);
  const flags = Array(size).fill(Array(size).fill(0));

  board = placeMines(board);
  board = calcNearMines(board);

  callback({ board, flags });
};

module.exports = createBoard;

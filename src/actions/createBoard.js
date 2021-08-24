const calcNumNearMines = require('../utils/calcNumNearMines');

const addMine = () => {
  const rng = Math.random();
  return rng < 0.15 ? -1 : 0;
};

const isBoardValid = (board) => {
  const size = board.length;
  const expectedMines = size * 0.1;
  let observedMines = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      observedMines -= board[i][j];
    }
  }
  return observedMines >= expectedMines;
};

const placeMines = (board) => {
  do {
    const size = board.length;
    for (let index = 0; index < board.length; index++) {
      const row = Array.from({ length: size }, () => addMine());
      board[index] = row;
    }
    console.log(!isBoardValid(board));
  } while (!isBoardValid(board));

  return board;
};

const calcNearMinesForEntireBoard = (board) => {
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

  board = calcNearMinesForEntireBoard(board);

  callback({ board, flags });
};

module.exports = createBoard;

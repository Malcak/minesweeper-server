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

const outBounds = (x, y, size) => {
  return x < 0 || y < 0 || x >= size || y >= size;
};

const calcNearMines = (board) => {
  const size = board.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] != -1) {
        let numMines = 0;
        numMines +=
          !outBounds(i - 1, j - 1, size) && board[i - 1][j - 1] == -1 ? 1 : 0;
        numMines += !outBounds(i - 1, j, size) && board[i - 1][j] == -1 ? 1 : 0;
        numMines +=
          !outBounds(i - 1, j + 1, size) && board[i - 1][j + 1] == -1 ? 1 : 0;
        numMines += !outBounds(i, j - 1, size) && board[i][j - 1] == -1 ? 1 : 0;
        numMines += !outBounds(i, j + 1, size) && board[i][j + 1] == -1 ? 1 : 0;
        numMines +=
          !outBounds(i + 1, j - 1, size) && board[i + 1][j - 1] == -1 ? 1 : 0;
        numMines += !outBounds(i + 1, j, size) && board[i + 1][j] == -1 ? 1 : 0;
        numMines +=
          !outBounds(i + 1, j + 1, size) && board[i + 1][j + 1] == -1 ? 1 : 0;
        board[i][j] = numMines;
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

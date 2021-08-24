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

module.exports = isWinState;

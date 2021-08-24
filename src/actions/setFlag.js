const isWinState = require('../utils/isWinState');

const setFlag = (data, callback) => {
  const { coords, board, flags } = data;

  flags[coords.x][coords.y] = -1;

  if (isWinState({ board, flags })) {
    callback({ board, flags, condition: 'win' });
  } else {
    callback({ board, flags, condition: 'playing' });
  }
};

module.exports = setFlag;

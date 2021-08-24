const clearBoard = (flags) => {
  for (let index = 0; index < flags.length; index++) {
    flags[index].fill(1);
  }
  return flags;
};

module.exports = clearBoard;

const outBounds = (x, y, size) => {
  return x < 0 || y < 0 || x >= size || y >= size;
};

module.exports = outBounds;

const bcrypt = require("bcrypt");

const hash = function(value) {
  return bcrypt.hashSync(value, 10);
};

const compareHash = function(hash, value) {
  return bcrypt.compareSync(hash, value);
}

module.exports = {
  hash,
  compareHash
};

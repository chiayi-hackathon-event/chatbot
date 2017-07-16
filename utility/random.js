var Random = require("random-js");

module.exports = {
  integer: function(min, max) {
    return new Random(Random.engines.mt19937().autoSeed()).integer(min, max);
  }
}

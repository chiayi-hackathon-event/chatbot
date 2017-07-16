var random = require("../utility/random");
var NICKNAME = require('../utility/nickname');

module.exports = {
  generate: function() {
    var data = [
      "你好喲",
      NICKNAME + "說你好",
      "Whats up",
      "歡迎你!!!",
      NICKNAME + "許你一個小確幸！",
      "hi",
      "哈囉",
      NICKNAME + "來囉～",
      "水水你好",
      NICKNAME + "啾咪～",
      "安安你好"
    ];

    return data[random.integer(0, data.length - 1)];
  }
}

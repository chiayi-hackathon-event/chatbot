var random = require("../utility/random");

module.exports = {
  reply: function() {
    var data = [
      "謝謝",
      "感謝唷",
      "有你的鼓勵才會這麼好",
      "好愛你~",
      "Love~",
      "啾咪",
      "呵~",
      "開心",
      "好開心喔",
      "耶",
    ];
    return data[random.integer(0, data.length - 1)];
  }
}

var NICKNAME = require('../utility/nickname');

var random = require("../utility/random");

var reply = require('../utility/reply');

module.exports = [
  async (session, args, next) => {

    var questions = [
      "那讓" + NICKNAME + "施放消除疲勞的魔法",
      "哇~~ 那" + NICKNAME + "快來想想怎麼辦~~",
      "加油加油! " + NICKNAME + "找個讓你恢復體力的好東西",
      "= = +",
      "你累了唷~~",
      "哎呀呀...",
    ];

    var products = [
      "提神飲料",
      "蠻牛",
      "提神",
      "RedBull",
      "輕鬆",
      "悠閒",
    ]

    var feedback = [
      "愛你~",
      "呵呵",
      "嘻嘻",
      "加油唷",
    ]

    session.send(questions[random.integer(0, questions.length - 1)]);

    await reply.Products(session, products[random.integer(0, products.length - 1)]);

    session.send(feedback[random.integer(0, feedback.length - 1)]);
    session.endDialog();
  }
];

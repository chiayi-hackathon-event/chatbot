var builder = require('botbuilder');

var NICKNAME = require('../utility/nickname');
var reply = require('../utility/reply');
var random = require('../utility/random');
const debug = require('debug')('finproduct');


module.exports = [
  async(session, args, next) => {

    var questions = [
      "讓" + NICKNAME + "想想喔.....",
      "讓" + NICKNAME + "找找有沒有你想要的.....",
      "讓" + NICKNAME + "快速偷看小抄找找相關法術.....",
    ];

    var badFeedback = [
      "抱歉..." + NICKNAME + "找不到...><~",
      "糟糕..." + NICKNAME + "不會...不要討厭" + NICKNAME + "喔...",
      "完蛋了..." + NICKNAME + "還沒學過那個法術...",
    ]

    session.send(questions[random.integer(0, questions.length - 1)]);

    var entity = builder.EntityRecognizer.findEntity(args.entities, 'product');
    debug('entity: ', entity);

    if (entity) {

      var query = entity.entity;
      query = query.replace(/(喔|！|!|唷|嗎|\?|？|誒|ㄟ|^^|XD)/g, "");

      await reply.Products(session, query);
    } else {
      session.send(badFeedback[random.integer(0, badFeedback.length - 1)]);
    }
    session.endDialog();
  }
];

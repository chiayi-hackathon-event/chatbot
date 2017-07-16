var builder = require('botbuilder');

var NICKNAME = require('../utility/nickname');
var reply = require('../utility/reply');
var random = require("../utility/random");
const debug = require('debug')('askadopt');

module.exports = [
  (session, args, next) => {
    var message = new builder.Message(session)
      .text("請選擇縣市?")
      .sourceEvent({
        facebook: {
          "quick_replies": [{
            "content_type": "text",
            "title": "嘉義市",
            "payload": "嘉義市"
          }, {
            "content_type": "text",
            "title": "嘉義縣",
            "payload": "嘉義縣"
          }]
        }
      })
    builder.Prompts.text(session, message);
  },
  async(session, results) => {

    var input = results.response.toLowerCase();
    session.send(input);

    // if (input.includes('狗') ||
    //   input.includes('犬') ||
    //   input.includes('dog')) {
    //   type = 'dog';
    // } else if (input.includes('貓') ||
    //   input.includes('喵') ||
    //   input.includes('cat')) {
    //   type = 'cat';
    // } else if (input.includes('兔') ||
    //   input.includes('rabbit') ||
    //   input.includes('bunny')) {
    //   type = 'rabbit';
    // }

    // var questions = [
    //   "好有愛心喔...讓" + NICKNAME + "努力找找!!",
    //   "" + NICKNAME + "最喜歡有愛心的人了...待我瞧瞧~!!",
    //   "讓" + NICKNAME + "找找喔~!!",
    // ];

    // var feedback = [
    //   "要好好對她喔~",
    //   "他們一定很希望有你當他們主人",
    //   "你一定會是一個很好的主人",
    // ]

    // await reply.Adopts(session, type, questions, feedback);
    session.endDialogWithResult(results);
  },
];

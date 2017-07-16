var builder = require('botbuilder');

var reply = require('../utility/reply');
var fortuneTeller = require('./fortune');

module.exports = [
  (session, args, next) => {
    var message = new builder.Message(session)
      .text('無聊嗎? 要不要來抽一張牌占卜?~')
      .sourceEvent({
        facebook: {
          "quick_replies": [{
            "content_type": "text",
            "title": "好",
            "payload": "好"
          }, {
            "content_type": "text",
            "title": "不要",
            "payload": "不要"
          }]
        }
      });

    builder.Prompts.text(session, message);
  },
  (session, results) => {
    var input = results.response.toLowerCase();

    if (input.includes('好') ||
      input.includes('恩') ||
      input.includes('sure') ||
      input.includes('y')) {
      session.beginDialog('/findfortune');
    } else {
      session.send('喔...><');
      session.endDialogWithResult(results);
    }
  },
  (session, results) => {
    session.endDialogWithResult(results);
  }
];

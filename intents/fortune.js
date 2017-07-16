var reply = require('../utility/reply');
var NICKNAME = require('../utility/nickname');

module.exports = [
  async (session, args, next) => {

    var prepares = [
      "讓" + NICKNAME + "來抽一張牌占卜~~",
      "讓" + NICKNAME + "看看你抽到什麼牌~~",
    ];

    var filename = await reply.Fortune(session, prepares);
    session.beginDialog('/askfortuneproduct', filename);
  },
  (session, results) => {
    session.endDialogWithResult(results);
  }
];

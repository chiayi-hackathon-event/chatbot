var random = require("../utility/random");

var reply = require('../utility/reply');

module.exports = [
  async(session, args, next) => {

    session.send('這世界上最美的人是一位叫LeAnn的仙女');

    await reply.Fairy(session);
    session.endDialog();
  }
];

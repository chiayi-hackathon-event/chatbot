var builder = require('botbuilder');

var reply = require('../utility/reply');

module.exports = [
  async(session, args, next) => {

    session.send('以下是本月目前銷售前十名');

    await reply.RankProducts(session);
    session.endDialog();
  }
];

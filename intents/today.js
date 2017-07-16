var builder = require('botbuilder');

var reply = require('../utility/reply');

module.exports = [
  async (session, args, next) => {

    session.send('今日好康活動~~ ');
    await reply.TodayProducts(session);
    session.send('每次問問都有不一樣的驚喜喔~~ ');
    session.endDialog();
  },
]

var builder = require('botbuilder');

var reply = require('../utility/reply');

module.exports = [
  async(session, args, next) => {

    session.send('以下團購都是限時活動, 慢了就沒有了喔!');

    await reply.GroupByProducts(session);
    session.endDialog();
  }
];

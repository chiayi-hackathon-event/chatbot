var builder = require('botbuilder');

var random = require("../utility/random");

module.exports = [
  (session, args, next) => {
    builder.Prompts.text(session, '請輸入你想查詢的地點');
  },
  async(session, results) => {
    builder.Prompts.text(session, '請輸入想查詢的預約時間');
  },
  async(session, results) => {
    session.send('該時間點故宮南院的預約人數為xxx人');
    session.send('您的線上預約網址為 https://tickets.npm.gov.tw/Reserve.aspx');

    session.endDialogWithResult(results);
  },
];
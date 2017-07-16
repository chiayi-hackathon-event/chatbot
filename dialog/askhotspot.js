var builder = require('botbuilder');
var unirest = require("unirest");

var reply = require('../utility/reply');
var random = require("../utility/random");

module.exports = [
  (session, args, next) => {
    // var message = new builder.Message(session)
    //   .text("好喔~ 麻煩請上傳你想查詢的景點圖片?")
    // builder.Prompts.text(session, message);
    session.send('請直接上傳圖片就好!!');


    session.endDialogWithResult(results);
  }
];

var builder = require('botbuilder');
var unirest = require("unirest");

var reply = require('../utility/reply');
var random = require("../utility/random");

module.exports = [
  (session, args, next) => {
    var message = new builder.Message(session)
      .text("好喔~ 麻煩請上傳你想查詢的景點圖片?")
    builder.Prompts.text(session, message);
  },
  (session, results) => {

    // var url = getImageUrl(session);

    // var req = unirest("POST", "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/428ce140-8c2b-497b-bb9c-3b906b362f2a/url");

    // req.headers({
    //   "content-type": "application/json",
    //   "prediction-key": "672a7c5fda4746c1943377cbe538ce0c"
    // });

    // req.type("json");

    // req.send({
    //   "Url": url
    // });

    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);

    //   const { Predictions } = res.body;

    //   var tag = Predictions[0].Tag;

    //   session.send('這是' + tag);
    // });

    session.send('請直接上傳圖片就好!!');


    session.endDialogWithResult(results);
  },
];

function getImageUrl(session) {
  const { message: { attachments } } = session;
  if (!attachments.length) return;
  const [attachment] = attachments;
  if (attachment.contentType.indexOf('image') === -1) return;
  console.log('has image');
  const { contentUrl } = attachment;
  console.log('contentUrl: ', contentUrl);
  return contentUrl;
}

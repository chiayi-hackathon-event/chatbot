var NICKNAME = require('../utility/nickname');
const _ = require('underscore');
const unirest = require("unirest");
const debug = require('debug')('defaultHandler');
var builder = require('botbuilder');

const oxford = require('../Congitives/oxford');
var random = require("../utility/random");
var reply = require('../utility/reply');
var request = require("request-promise");


module.exports = session => {
  const util = require('util');

  if (session.message.attachments.length > 0) {
    var url = getImageUrl(session);

    var req = unirest("POST", "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/428ce140-8c2b-497b-bb9c-3b906b362f2a/url");

    req.headers({
      "content-type": "application/json",
      "prediction-key": "672a7c5fda4746c1943377cbe538ce0c"
    });

    req.type("json");

    req.send({
      "Url": url
    });

    req.end(async function(res) {
      if (res.error) throw new Error(res.error);

      const { Predictions } = res.body;

      var tag = Predictions[0].Tag;

      session.send('這是' + tag + '喔');

      var body = await request.get(`http://gameprice.tw/opendata/attractions?lat=23.143661&lng=120.143555&distance=100000000&desc=${encodeURI(tag)}&limit=5`);
      var data = JSON.parse(body).data[0];

      var card = new builder.HeroCard(session)
        .title(data.title)
        .subtitle(data.location)
        .text(data.description)
        .images([
          builder.CardImage.create(session, 'https://gameprice.tw/opendata//image?url=' + data.image_1)
        ])
        .buttons([
          builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework', '詳細資訊')
        ]);
      var msg = new builder.Message(session).addAttachment(card);
      session.send(msg);

    });
  } else {
    console.log(session.message);
    console.log('text = ' + session.message.text);
    session.send('抱歉' + NICKNAME + '聽不懂>"<~~');
        session.beginDialog('/listFeature');
  }
};

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

var builder = require('botbuilder');
var request = require("request-promise");

var reply = require('../utility/reply');
var fortuneTeller = require('./fortune');

module.exports = [
  async(session, args, next) => {
    // var message = new builder.Message(session)
    //   .text("麻煩先請按下按鈕傳送你的位置 (若沒辦法按下按鈕就輸入\"沒辦法\"吧)")
    //   .sourceEvent({
    //     facebook: {
    //       "quick_replies": [{
    //         "content_type": "location",
    //       }]
    //     }
    //   })
    // builder.Prompts.text(session, message);
    // console.log(session);
    session.beginDialog('/askFBLocation');

  },
  async(session, results) => {
    var entityList = session.message.entities;

    var latitude = '23.0251582';
    var longitude = '120.2351534';

    if (Array.isArray(entityList) && entityList.length > 0) {
      latitude = entityList[0].geo.latitude;
      longitude = entityList[0].geo.longitude;
    } else {
      session.send('那使用台南市的位置吧!');
    }

    var body = await request.get('http://gameprice.tw/opendata/power?lat=' + latitude + '&lng=' + longitude + '&limit=5&distance=10000');

    var res = JSON.parse(body);

    var attachments = [];
    console.log('res', res);
    if (res.data.length) {
      res.data.forEach(function(w) {
        var card = createThumbnailCard(session, w);
        attachments.push(card);
      });
    } else {
      session.send('很抱歉~這附近找不到');
      session.endDialog();
    }

    var reply = new builder.Message(session)
      .attachmentLayout(builder.AttachmentLayout.carousel)
      .attachments(attachments);
    session.send(reply);
    session.endDialog();

  }
];

function createThumbnailCard(session, info) {
  var image = 'https://maps.googleapis.com/maps/api/staticmap?center=' + info.lat + ',' + info.lng + '&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:' + info.lat + ',' + info.lng + '&key=';
  return new builder.ThumbnailCard(session)
    .title(info.title)
    .text(`地址: ${info.address} \n\n
      位置: ${info.local} \n\n
      價格: ${info.cost}
      `)
    .images([
      builder.CardImage.create(session, image)
    ]).buttons([
      builder.CardAction.openUrl(session, 'https://www.google.com/maps/search/?api=1&query=' + info.lat + ',' + info.lng + '', info.title)
    ]);
}

var apiurl = require('../utility/apiurl');
var builder = require('botbuilder');
var request = require("request-promise");

// var reply = require('../utility/reply');
var fortuneTeller = require('./fortune');

module.exports = [
  async(session, args, next) => {
    // var entityList = session.message.entities;

    var latitude = '23.4518428';
    var longitude = '120.25546150000002';

    // if (Array.isArray(entityList) && entityList.length > 0) {
    //   latitude = entityList[0].geo.latitude;
    //   longitude = entityList[0].geo.longitude;
    // } else {
    //   session.send('那使用嘉義縣的位置吧!');
    // }

    var body = await request.get(apiurl + '/store?lat=' + latitude + '&lng=' + longitude + '&limit=10&distance=100000');

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
  var promo = '來店詢問';
  if (info.promo !== null && info.promo !== '') {
    promo = info.promo;
  }
    return new builder.ThumbnailCard(session)
    .title(info.title)
    .text(`地址: ${info.location} \n
      優惠: ${promo}
      `)
    .images([
      builder.CardImage.create(session, info.image_1)
    ]);
}

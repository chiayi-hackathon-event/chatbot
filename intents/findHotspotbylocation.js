var apiurl = require('../utility/apiurl');
var builder = require('botbuilder');
var req = require("request");
var request = require("request-promise");
var NICKNAME = require('../utility/nickname');
var reply = require('../utility/reply');
var random = require('../utility/random');
const debug = require('debug')('finproduct');
var fortuneTeller = require('./fortune');


module.exports = [
  async(session) => {
    builder.Prompts.text(session, '你在哪裡?');
  },
  async(session, results) => {
    console.log('results', results.response);
    var url = apiurl + '/coordinate?address=' + encodeURI(results.response);


    var geo = await request.get(url);
    var data = JSON.parse(geo);

    if (data.data) {
      var latitude = data.data.lat;
      var longitude = data.data.lng;

      var body = await request.get(apiurl + '/attractions?lat=' + latitude + '&lng=' + longitude + '&limit=5&distance=10000');

      var res = JSON.parse(body);
      var attachments = [];
      console.log('res', res);
      if (res.data.length) {
        res.data.forEach(function (w) {
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
    } else {
      session.send('很抱歉~這附近找不到');
      session.endDialog();
    }
  }

];

function createThumbnailCard(session, info) {
  return new builder.ThumbnailCard(session)
    .title(info.title)
    .text(`地址: ${info.location} \n\n
      描述: ${info.description} \n\n
      `)
    .images([
      builder.CardImage.create(session, info.image_1)
    ]).buttons([
      builder.CardAction.openUrl(session, 'https://www.google.com/maps/search/?api=1&query=' + info.lat + ',' + info.lng + '', '前往導航')
    ]);
}
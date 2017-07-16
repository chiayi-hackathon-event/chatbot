var builder = require('botbuilder');
var request = require("request-promise");

// var reply = require('../utility/reply');

module.exports = [
  async(session, args, next) => {
    // var entityList = session.message.entities;

    var date = encodeURIComponent('2017/07/16');

    var body = await request.get('http://gameprice.tw/opendata/ticket?date=' + date);

    var res = JSON.parse(body);

    var attachments = [];
    console.log('res', res);
    if (res.data.length) {
      res.data.forEach(function (w) {
        var card = createThumbnailCard(session, w);
        attachments.push(card);
      });
    } else {
      session.send('很抱歉~預約已滿');
      session.endDialog();
    }

    var reply = new builder.Message(session)
      .attachmentLayout(builder.AttachmentLayout.carousel)
      .attachments(attachments);
    session.send(reply);
    session.endDialog();

  }
];

// function createSigninCard(session, info) {
//      var url = 'https://tickets.npm.gov.tw/';
//     return new builder.SigninCard(session)
//         .text('常設展 參觀時間: ' + info.time.slice(0,2) + ':' + info.time.slice(2,4))
//         .button('可預約人數: ' + info.ticket, url)
// }

function createThumbnailCard(session, info) {
  var url = 'https://tickets.npm.gov.tw/';
  var time = info.time.slice(0, 2) + ':' + info.time.slice(2, 4);
  return new builder.ThumbnailCard(session)
    .title(info.title)
    .text(`故宮南院: \n\n
      常設展 參觀時間: ${time} \n\n
      可預約人數: ${info.ticket}
      `)
    .buttons([
      builder.CardAction.openUrl(session, url, '預約')
    ]);
}
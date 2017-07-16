var builder = require('botbuilder');
var request = require("request-promise");
var moment = require('moment');

// var reply = require('../utility/reply');

module.exports = [
  async(session, args, next) => {
    // var entityList = session.message.entities;

    var today = '2017/07/23';
    // var today = moment().format('YYYY/MM/DD');
    var date = encodeURIComponent(today);
    console.log(date);

    var body = await request.get('http://gameprice.tw/opendata/ticket?date=' + date);

    var res = JSON.parse(body);

    var attachments = [];
    console.log('res', res);
    var template = `故宮南院 常設展 \n\n
    ${today} 可預約時間 \n\n
     \n\n`;

    if (res.data.length) {
      // res.data.forEach(function (w) {
        // var card = createThumbnailCard(session, w);
      //   attachments.push(card);
      // });
      for (var x = 0; x < res.data.length; x++) {
        var time = res.data[x].time.slice(0, 2) + ':' + res.data[x].time.slice(2, 4);
        template = template + `${time} - ${res.data[x].ticket} 張票 \n\n`;
      }
      template = template + `可以在以下網站預約 \n\n
      https://tickets.npm.gov.tw/ \n\n`;
      session.send(template);
      session.endDialog();
      
    } else {
      session.send('很抱歉~預約已滿');
      session.endDialog();
    }

    // var reply = new builder.Message(session)
      // .attachmentLayout(builder.AttachmentLayout.carousel)
      // .attachments(attachments);
    // session.send(reply);

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
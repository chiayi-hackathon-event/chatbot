var apiurl = require('../utility/apiurl');
var request = require("request-promise");

var builder = require('botbuilder');

var NICKNAME = require('../utility/nickname');
var reply = require('../utility/reply');
var random = require("../utility/random");
const debug = require('debug')('askadopt');

module.exports = [
  (session, args, next) => {
    var message = new builder.Message(session)
      .text("請選擇縣市?")
      .sourceEvent({
        facebook: {
          "quick_replies": [{
            "content_type": "text",
            "title": "嘉義市",
            "payload": "嘉義市"
          }, {
            "content_type": "text",
            "title": "嘉義縣",
            "payload": "嘉義縣"
          }]
        }
      })
    builder.Prompts.text(session, message);
  },
  async(session, results) => {

    var input = results.response.toLowerCase();
    session.send(input);
    console.log(input);
    var latitude = '23.4731294';
    var longitude = '120.29271649999998';
    switch(input) {
      case '嘉義市':
        latitude = '23.4800751';
        longitude = '120.44911130000003';
        break;
      case '嘉義縣':
        latitude = '23.4518428';
        longitude = '120.25546150000002';
        break;
    }

    var desc = '旅店';
    var url = apiurl + '/green_store?lat=' + latitude + '&lng=' + longitude + '&limit=5&distance=1000000&desc=' + encodeURI(desc);
    var body = await request.get(url);
    console.log(url);

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

    // if (input.includes('狗') ||
    //   input.includes('犬') ||
    //   input.includes('dog')) {
    //   type = 'dog';
    // } else if (input.includes('貓') ||
    //   input.includes('喵') ||
    //   input.includes('cat')) {
    //   type = 'cat';
    // } else if (input.includes('兔') ||
    //   input.includes('rabbit') ||
    //   input.includes('bunny')) {
    //   type = 'rabbit';
    // }

    // var questions = [
    //   "好有愛心喔...讓" + NICKNAME + "努力找找!!",
    //   "" + NICKNAME + "最喜歡有愛心的人了...待我瞧瞧~!!",
    //   "讓" + NICKNAME + "找找喔~!!",
    // ];

    // var feedback = [
    //   "要好好對她喔~",
    //   "他們一定很希望有你當他們主人",
    //   "你一定會是一個很好的主人",
    // ]

    // await reply.Adopts(session, type, questions, feedback);
    session.endDialogWithResult(results);
  },
];

function createThumbnailCard(session, info) {
  var image = '';
  if (info.image_1) {
    image = info.image_1;
  } else {
    image = 'https://maps.googleapis.com/maps/api/staticmap?center=' + info.lat + ',' + info.lng + '&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:' + info.lat + ',' + info.lng + '&key=';
  }
  return new builder.HeroCard(session)
    .title(info.title)
    .subtitle(info.phone)
    .text(`地址: ${info.address} \n\n
      `)
    .images([
      builder.CardImage.create(session, image)
    ]).buttons([
      builder.CardAction.openUrl(session, 'https://www.google.com/maps/search/?api=1&query=' + info.lat + ',' + info.lng + '', '前往導航')
    ]);
}

var builder = require('botbuilder');
var request = require("request-promise");
var moment = require('moment');

var reply = require('../utility/reply');
var fortuneTeller = require('./fortune');

module.exports = [
  async(session, args, next) => {
    // var message = new builder.Message(session)
    //   .text("麻煩先請按下按鈕傳送你的位置")
    //   .sourceEvent({
    //     facebook: {
    //       "quick_replies": [{
    //         "content_type": "location",
    //       }]
    //     }
    //   })
    // builder.Prompts.text(session, message);
    session.beginDialog('/askFBLocation');
  },
  async(session, results) => {
    var entityList = session.message.entities;

    var latitude = '23.4243634';
    var longitude = '119.977076';

    // if (Array.isArray(entityList) && entityList.length > 0) {
    //   latitude = entityList[0].geo.latitude;
    //   longitude = entityList[0].geo.longitude;
    if(session.userData.latitude != null) {
      latitude = session.userData.latitude;
      longitude = session.userData.longitude;
    } else {
      session.send('那使用嘉義縣的位置吧!');
    }

    var body = await request.get(`https://api.darksky.net/forecast/46fbc59d5c9e64c2d445e90b7f97e8ee/${latitude},${longitude}?lang=zh-tw&units=si`);

    var weather = JSON.parse(body);


    var attachments = [];

    weather.daily.data.forEach(function(w) {
      var card = createThumbnailCard(session, w);
      attachments.push(card);
    });

    var reply = new builder.Message(session)
      .attachmentLayout(builder.AttachmentLayout.carousel)
      .attachments(attachments);
    session.send(reply);
    session.endDialog();
  }
];

function createThumbnailCard(session, weather) {

  var windStatus;

  if (weather.windSpeed <= 4) {
    windStatus = '微風';
  } else if (weather.windSpeed <= 7) {
    windStatus = '小有強風';
  } else {
    windStatus = '強風來襲';
  }

  var weatherStatus;
  var image = `https://fairybot.azureedge.net/weather/${weather.icon}.jpg`;

  switch (weather.icon) {
    case 'clear-day':
    case 'clear-night':
      weatherStatus = '晴天';
      break;
    case 'rain':
      weatherStatus = '降雨';
      break;
    case 'snow':
      weatherStatus = '下雪';
      break;
    case 'sleet':
      weatherStatus = '冰雹';
      break;
    case 'wind':
      weatherStatus = '風大';
      break;
    case 'fog':
      weatherStatus = '起霧';
      break;
    case 'cloudy':
      weatherStatus = '多雲';
      break;
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      weatherStatus = '晴多雲';
      break;
    default:
      weatherStatus = '晴多雲';
      break;
  }

  moment.locale('zh-tw');

  return new builder.ThumbnailCard(session)
    .title(moment.unix(weather.time).utcOffset(8).format('YYYY.MM.DD dddd') + `    ${weatherStatus}`)
    .text(`${weather.summary}  \n\n
* 氣溫 ${weather.apparentTemperatureMin.toFixed(0)}度 ~ ${weather.apparentTemperatureMax.toFixed(0)}度
* 降雨率 : ${weather.precipProbability.toFixed(2) * 100}%
* ${windStatus}
      `)
    // * 濕度 : ${weather.humidity * 100}%
    //   * 風速 : ${weather.windSpeed}m/s
    .images([
      builder.CardImage.create(session, image)
    ])
}

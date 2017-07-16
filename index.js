var restify = require('restify');
var builder = require('botbuilder');

var NICKNAME = require('./utility/nickname');
var greeting = require('./intents/greeting');
var compliment = require('./intents/compliment');
var suitQuestion = require('./intents/suitquestion');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3000, function() {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID || 'bdb58f1f-a81d-4da4-b21f-d299e11c4332',
  appPassword: process.env.MICROSOFT_APP_PASSWORD || 'SBwbPvWPkoboWnYOXt43G6Z'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

//=========================================================
// Bots Conversation Events
//=========================================================

bot.on('conversationUpdate', function(message) {

  if (message.membersAdded && message.membersAdded.length > 0) {

    var membersAdded = message.membersAdded
      .filter((member) => member.id !== message.address.bot.id)
      .map((member) => member.name)
      .join(', ');

    if (membersAdded) {
      bot.send(new builder.Message()
        .address(message.address)
        .text(NICKNAME + '說你好~~~'));
      bot.send(new builder.Message()
        .address(message.address)
        .text(`目前讓台灣卡好玩的` + NICKNAME + `來介紹功能有  \n\n
      1. 拍照給` + NICKNAME + `施魔法
        - 上傳一張有你美美的照片
      2. 猜猜今天的運勢
        - 幫我算算今天的運氣
      3. 瞭解今天天氣狀態
        - 今天天氣如何呢?
      `));
    }
  }
});

//=========================================================
// Bots Dialogs
//=========================================================

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/fa0a31e5-d6a2-470f-aefd-622008f0900d?subscription-key=03e9056296154b0bafec0b9475d04394&timezoneOffset=0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var intent = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', intent);

bot.dialog('/askhotspot', require('./dialog/askhotspot'));
// bot.dialog('/checkreservation', require('./dialog/checkreservation'));

bot.dialog('/askfortuneproduct', require('./dialog/askfortuneproduct'));
bot.dialog('/listFeature', require('./dialog/listfeature'));
// bot.dialog('/today', require('./intents/today'));
bot.dialog('/findsuitme', require('./intents/findsuitme'));
bot.dialog('/adopt', require('./intents/adopt'));

bot.dialog('/fortuneTeller', require('./intents/fortune'));
bot.dialog('/findfortune', require('./intents/fortune'));
bot.dialog('/askSuitMe', require('./dialog/asksuitme'));
bot.dialog('/askAdopt', require('./dialog/askadopt'));
bot.dialog('/weatherForecast', require('./intents/weather'));
bot.dialog('/HotSpotLocation', require('./intents/findHotspotbylocation'));
bot.dialog('/FindCharging', require('./intents/findchargingstation'));
bot.dialog('/TWFunStore', require('./intents/findtwfunstore'));
bot.dialog('/checkreservation', require('./intents/reservation'));
bot.dialog('/findfood', require('./intents/findfood'));
// bot.dialog('/findhotel', require('./intents/findhotel'));
bot.dialog('/askFBLocation', [
  function(session, args, next) {
    if (session.dialogData.locationExists == null) {
      var message = new builder.Message(session)
        .text("麻煩先請按下按鈕傳送你的位置")
        .sourceEvent({
          facebook: {
            "quick_replies": [{
              "content_type": "location",
            }]
          }
        })
      session.send(message);
      session.dialogData.locationExists = true;
    } else {
      delete session.dialogData.locationExists;
      session.endDialogWithResult(session);
    }
  }
]);
require('./intents/gossip')(intent);

intent.matches('FindHotSpotByImg', '/askhotspot');
intent.matches('CheckReservation', '/checkreservation');

// intent.matches('FindProduct', require('./intents/findproduct'));
intent.matches('TellTired', require('./intents/tired'));
// intent.matches('Boring', require('./intents/boring'));
// intent.matches('WhoIsBeautiful', require('./intents/whoisbeautiful'));
// intent.matches('RankProduct', require('./intents/rankproduct'));
// intent.matches('GroupBuy', require('./intents/groupbuy'));
intent.matches('FindHotSpotByLocation', '/HotSpotLocation');
intent.matches('FindChargingStation', '/FindCharging');
intent.matches('FindTWFunStore', '/TWFunStore');


intent.matches('Greeting', [
  function(session, args, next) {
    session.send(greeting.generate());
  }
]);

intent.matches('Compliment', [
  function(session, args, next) {
    session.send(compliment.reply());
  }
]);



intent.matches('FindSuitMe', '/findsuitme');
// intent.matches('ListFeatures', '/listFeature');
intent.matches('Adopt', '/adopt');
intent.matches('FortuneTeller', '/fortuneTeller');
intent.matches('WeatherForecast', '/weatherForecast');
intent.matches('FindFood', '/findfood');
intent.matches('FindHotel', '/findhotel');
// intent.matches('Today', '/today');

intent.onDefault(require('./intents/default'));

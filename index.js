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
        .text(`哈囉，我是口袋旅遊達人～${NICKNAME}，你可以問我🙋  \n\n
- 景點查詢   \n\n
    你可以這樣問我：上傳一張景點照片   \n\n
- 景點預約   \n\n
    你可以這樣問我：我想預約故宮南院   \n\n
- 查詢住宿地點   \n\n
    你可以這樣問我：我想找住的地方   \n\n
- 天氣預報   \n\n
    你可以這樣問我：今天天氣如何?   \n\n
- 查詢電動車充電站   \n\n
    你可以這樣問我：我要找電動車充電站   \n\n
- 推薦美食餐廳     \n\n
    你可以這樣問我：附近哪裡好吃`));
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

bot.dialog('/askfortuneproduct', require('./dialog/askfortuneproduct'));
bot.dialog('/listFeature', require('./dialog/listfeature'));
bot.dialog('/findsuitme', require('./intents/findsuitme'));
bot.dialog('/adopt', require('./intents/adopt'));
bot.dialog('/findhotel', require('./intents/findhotel'));

bot.dialog('/fortuneTeller', require('./intents/fortune'));
bot.dialog('/findfortune', require('./intents/fortune'));
bot.dialog('/askSuitMe', require('./dialog/asksuitme'));
bot.dialog('/askAdopt', require('./dialog/askadopt'));
bot.dialog('/askhotellocation', require('./dialog/askhotellocation'));

bot.dialog('/weatherForecast', require('./intents/weather'));
bot.dialog('/HotSpotLocation', require('./intents/findHotspotbylocation'));
bot.dialog('/FindCharging', require('./intents/findchargingstation'));
bot.dialog('/TWFunStore', require('./intents/findtwfunstore'));
bot.dialog('/checkreservation', require('./intents/reservation'));
bot.dialog('/findfood', require('./intents/findfood'));
bot.dialog('/askFBLocation', [
  function(session, args, next) {
    if(session.userData.forcegps == null && session.userData.latitude != null && session.userData.longitude != null) {
      session.endDialogWithResult(session);
    }
    else if (session.dialogData.locationExists == null) {
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
      delete session.userData.forcegps;
    } else {
      delete session.dialogData.locationExists;

      var entityList = session.message.entities;

      if (Array.isArray(entityList) && entityList.length > 0) {
        var latitude = entityList[0].geo.latitude;
        var longitude = entityList[0].geo.longitude;

        console.log('latitude =' + latitude);
        console.log('longitude =' + longitude);

        session.userData.latitude = latitude;
        session.userData.longitude = longitude;
        session.userData.created = new Date();
      }
      session.endDialogWithResult(session);
    }
  }
]);
require('./intents/gossip')(intent);

intent.matches('FindHotSpotByImg', '/askhotspot');
intent.matches('CheckReservation', '/checkreservation');

intent.matches('TellTired', require('./intents/tired'));
intent.matches('FindHotSpotByLocation', '/HotSpotLocation');
intent.matches('FindChargingStation', '/FindCharging');
intent.matches('FindTWFunStore', '/TWFunStore');


intent.matches('Greeting', [
  function(session, args, next) {
    session.send('哈囉，我是口袋旅遊達人~蓋兒，請問你想去哪裡玩🙋');
  }
]);

intent.matches('Compliment', [
  function(session, args, next) {
    session.send(compliment.reply());
  }
]);

intent.matches('FindSuitMe', '/findsuitme');
intent.matches('Adopt', '/adopt');
intent.matches('FortuneTeller', '/fortuneTeller');
intent.matches('WeatherForecast', '/weatherForecast');
intent.matches('FindFood', '/findfood');
intent.matches('FindHotel', '/findhotel');

intent.onDefault(require('./intents/default'));

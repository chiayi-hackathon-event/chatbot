var builder = require('botbuilder');
var request = require("request-promise");
var path = require('path');

var feebee = require('../crawler/feebee');
var random = require("../utility/random");

module.exports = {
  Products: async function(session, entity) {
    var products = await feebee.getProducts(entity);
    if (products.length > 0) {

      var attachments = [];

      products.forEach(function(value, index, array) {

        var heroCard = new builder.HeroCard(session)
          .title(array[index].title)
          .text(array[index].price)
          .images([
            builder.CardImage.create(session,
              array[index].image)
          ])
          .buttons([
            builder.CardAction.openUrl(session,
              `https://fairybot.azureedge.net/web/index.html#${array[index].url}`,
              array[0].action)
          ]);

        attachments.push(heroCard);
      });

      var reply = getCarouselReply(session, attachments);
      session.send(reply);
    } else {
      session.send('抱歉, 我們沒找到相關商品');
    }
  },
  RankProducts: async function(session) {
    var products = await feebee.getRankProducts();
    if (products.length > 0) {

      var attachments = [];

      products.forEach(function(value, index, array) {

        var heroCard = new builder.HeroCard(session)
          .title(array[index].title)
          .text(array[index].price)
          .images([
            builder.CardImage.create(session,
              array[index].image)
          ])
          .buttons([
            builder.CardAction.openUrl(session,
              `https://fairybot.azureedge.net/web/index.html#${array[index].url}`,
              array[0].action)
          ]);

        attachments.push(heroCard);
      });

      var reply = getCarouselReply(session, attachments);
      session.send(reply);
    } else {
      session.send('抱歉, 我們沒找到相關商品');
    }
  },
  GroupByProducts: async function(session) {
    var products = await feebee.getGroupByProducts();
    if (products.length > 0) {

      var attachments = [];

      products.forEach(function(value, index, array) {

        var heroCard = new builder.HeroCard(session)
          .title(array[index].title)
          .text(array[index].price)
          .images([
            builder.CardImage.create(session,
              array[index].image)
          ])
          .buttons([
            builder.CardAction.openUrl(session,
              `https://fairybot.azureedge.net/web/index.html#${array[index].url}`,
              array[0].action)
          ]);

        attachments.push(heroCard);
      });

      var reply = getCarouselReply(session, attachments);
      session.send(reply);
    } else {
      session.send('抱歉, 我們沒找到相關商品');
    }
  },
  TodayProducts: async function(session) {
    var products = await feebee.getTodayProducts();
    if (products.length > 0) {

      var attachments = [];

      products.forEach(function(value, index, array) {

        var heroCard = new builder.HeroCard(session)
          .title(array[index].title)
          .text(array[index].price)
          .images([
            builder.CardImage.create(session,
              array[index].image)
          ])
          .buttons([
            builder.CardAction.openUrl(session,
              `https://fairybot.azureedge.net/web/index.html#${array[index].url}`,
              array[0].action)
          ]);

        attachments.push(heroCard);
      });

      var reply = getCarouselReply(session, attachments);
      session.send(reply);
    } else {
      session.send('抱歉, 我們沒找到相關商品');
    }
  },
  Adopts: async function(session, type, questions, feedback) {
    session.send(questions[random.integer(0, questions.length)]);

    var offset;
    var animal;

    switch (type) {
      case 'dog':
        offset = random.integer(0, 171);
        animal = encodeURI('犬');
        break;
      case 'cat':
        offset = random.integer(0, 93);
        animal = encodeURI('貓');
        break;
      case 'rabbit':
        offset = random.integer(0, 62);
        animal = encodeURI('其他');
        break;
      default:
        offset = random.integer(0, 340);
        break
    }

    var url = (type == 'all') ?
      `http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=f4a75ba9-7721-4363-884d-c3820b0b917c&limit=8&offset=${offset}` :
      `http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=f4a75ba9-7721-4363-884d-c3820b0b917c&limit=8&offset=${offset}&q=${animal}`

    var body = await request.get(url);
    var adopts = JSON.parse(body).result.results;

    var attachments = [];

    shuffle(adopts);
    adopts.forEach(function(value, index, array) {

      var title = array[index].Name == '' ? '未命名毛小孩' : array[index].Name;

      var heroCard = new builder.HeroCard(session)
        .title(title)
        .text(`* 編號 -  ${array[index].AcceptNum}   \n\n` +
          `* 性別 - ${array[index].Sex}   \n\n` +
          `* 電話 - ${array[index].Phone}   \n\n`)
        .images([
          builder.CardImage.create(session,
            `https://fairybot.azureedge.net/adopt/${path.basename(array[index].ImageName)}`)
        ])
        .buttons([
          builder.CardAction.showImage(session,
            `https://fairybot.azureedge.net/adopt/${path.basename(array[index].ImageName)}`, '查看')
        ])
      attachments.push(heroCard);
    })

    var reply = getCarouselReply(session, attachments);
    session.send(reply);

    session.send(feedback[random.integer(0, feedback.length)]);
  },
  Fortune: async function(session, prepares) {
    await session.send(prepares[random.integer(0, prepares.length - 1)]);

    return new Promise((resolve) => {
      setTimeout(() => {
        var filename = padLeft(random.integer(1, 10), 2);

        var card = createAnimationCard(session, filename);
        var reply = new builder.Message(session).addAttachment(card);

        session.send(reply);
        resolve(filename);
      }, 600);
    })
  },
  Fairy: async function(session) {
    return new Promise((resolve) => {
      setTimeout(() => {


        var card = getImageCard(session, 'https://fairy.blob.core.windows.net/fairy/fairy.jpg', 'image/jpg', 'alice.jpg');
        var reply = new builder.Message(session).addAttachment(card);

        session.send(reply);

        session.send('多來店舖逛逛也許你有機會認識她喔');
      }, 600);
    })
  }
}

function getCarouselReply(session, attachments) {

  return new builder.Message(session)
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments(attachments);
}

function getImageCard(session, url, contentType, attachmentFileName) {
  return {
    contentUrl: url,
    contentType: contentType,
    name: attachmentFileName
  };
}

function createAnimationCard(session, filename) {
  return new builder.AnimationCard(session)
    .image(builder.CardImage.create(session,
      `https://fairybot.azureedge.net/fortunecard/${filename}.png`))
    .media([
      { url: `https://fairybot.azureedge.net/fortunegif/${filename}.gif` }
    ]);
}


function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

function padLeft(str, len) {    
  str = '' + str;    
  if (str.length >= len) {        
    return str;    
  } else {        
    return padLeft("0" + str, len);    
  }
}

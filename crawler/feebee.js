var request = require("request-promise");
var cheerio = require("cheerio");

module.exports = {
  getProducts: async function(query) {

    query = query.replace(" ", "+");

    var body = await request.get(`https://feebee.com.tw/s/${encodeURI(query)}/?mode=l&s=d`);

    var $ = cheerio.load(body);

    var products = [];
    var results = $(".results li.fb-u:not(.promo-area)");

    var slice = (results.length - 10) < 0 ? 0 : results.length - 10;
    results = results.slice(slice);

    results.each(function(index) {

      var product = {};
      var prices = $(this).find("em.xlarge");

      product.title = $(this).find("h2.large").text();

      if (prices.length == 1) {
        product.price = `$${prices.text()}`;
      } else {
        product.price = `$${prices.first().text()} ~ $${prices.last().text()}`;
      }

      var image = $(this).find("img").prop('src');

      image = image.replace('200x200', '400x400');
      image = image.replace('https://img.feebee.com.tw/ip/200', 'https://img.feebee.com.tw/ip/300');
      image = image.replace('https://img.feebee.com.tw/ip/180', 'https://img.feebee.com.tw/ip/200');

      var res = image.split("https://");
      if (res.length == 3) {
        image = 'https://' + res[res.length - 1];
      }

      var gohappy = image.split("http://img.gohappy.com.tw/images");
      if (gohappy.length == 2) {
        image = 'https://img.gohappy.com.tw/images' + gohappy[1];
      }

      var savesafe = image.split("http://www.savesafe.com.tw");
      if (savesafe.length == 2) {
        image = 'https://www.savesafe.com.tw' + savesafe[1];
      }

      var udn = image.split("http://img.udn.com/image");
      if (udn.length == 2) {
        image = 'https://img.udn.com/image' + udn[1];
      }

      var momomall = image.split("http://www.momomall.com.tw");
      if (momomall.length == 2) {
        image = 'https://www.momomall.com.tw' + momomall[1];
      }

      // var ec1img = image.split("http://ec1img.pchome.com.tw/items");
      // if (ec1img.length == 2) {
      //   image = 'https://a.ecimg.tw/items' + ec1img[1];
      // }

      product.image = image;

      product.url = $(this).find("a.compare").attr('href') ?
        `https://feebee.com.tw${$(this).find("a.compare").attr('href')}` :
        $(this).find("a.rightnow").attr('href');

      product.action = '前往購買';

      products.push(product);
    });

    return products;
  },
  getRankProducts: async function() {

    var body = await request.get('https://feebee.com.tw/rank');

    var $ = cheerio.load(body);

    var products = [];
    var results = $("li.pure-u");

    results.slice(0, 10).each(function(index) {

      var product = {};
      var prices = $(this).find("div.price");

      product.title = $(this).find("h4.normal").text();

      if (prices.length == 1) {
        product.price = `$${prices.text()}`;
      } else {
        product.price = `$${prices.first().text()} ~ $${prices.last().text()}`;
      }

      var image = $(this).find("img").prop('src');
      product.image = image;

      product.url = $(this).find("a.link_ghost").attr('href');

      product.action = '前往購買';

      products.push(product);
    });

    return products;
  },
  getGroupByProducts: async function() {

    var body = await request.get('https://feebee.com.tw/groupbuy/north');

    var $ = cheerio.load(body);

    var products = [];
    var results = $("li.pure-u");

    results.slice(0, 10).each(function(index) {

      var product = {};
      var prices = $(this).find("span.price");

      product.title = $(this).find("h4.normal").text();

      if (prices.length == 1) {
        product.price = `$${prices.text()}`;
      } else {
        product.price = `$${prices.first().text()} ~ $${prices.last().text()}`;
      }

      var image = $(this).find("meta").prop('content');
      product.image = image;

      product.url = $(this).find("a.link_ghost").attr('href');

      product.action = '前往團購';

      products.push(product);
    });

    return products;
  },
  getTodayProducts: async function() {

    var body = await request.get('https://feebee.com.tw/today');

    var $ = cheerio.load(body);

    var shopContainers = $("div.shop_container");

    var products = [];
    var results = $(shopContainers[0]).find("li.pure-u");

    results.slice(0, 10).each(function(index) {

      var product = {};
      var prices = $(this).find("span.price");

      product.title = $(this).find("h4.normal").text();

      if (prices.length == 1) {
        product.price = `$${prices.text()}`;
      } else {
        product.price = `$${prices.first().text()} ~ $${prices.last().text()}`;
      }

      var image = $(this).find("img").prop('src');
      product.image = image;

      product.url = $(this).find("a.link_ghost").attr('href');

      product.action = '前往購買';

      products.push(product);
    });

    return products;
  },
}

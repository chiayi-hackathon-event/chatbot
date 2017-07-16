var NICKNAME = require('../utility/nickname');
const _ = require('underscore');
const unirest = require("unirest");
const debug = require('debug')('defaultHandler');

const oxford = require('../Congitives/oxford');
var random = require("../utility/random");
var reply = require('../utility/reply');

module.exports = session => {
  const util = require('util');

  if (session.message.attachments.length > 0) {
    // _handlePhoto(session);
    var url = getImageUrl(session);

    var req = unirest("POST", "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/428ce140-8c2b-497b-bb9c-3b906b362f2a/url");

    req.headers({
      "content-type": "application/json",
      "prediction-key": "672a7c5fda4746c1943377cbe538ce0c"
    });

    req.type("json");

    req.send({
      "Url": url
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      const { Predictions } = res.body;

      var tag = Predictions[0].Tag;

      session.send('這是' + tag);
    });
  } else {
    console.log(session.message);
    console.log('text = ' + session.message.text);
    switch (session.message.text) {
      case '1':
        session.beginDialog('/today');
        break;
      case '2':
        session.beginDialog('/findsuitme');
        break;
      case '3':
        session.send('不能只按3拉~~ 請直接上傳照片看看' + NICKNAME + '的厲害喔!');
        session.endDialog();
        break;
      case '4':
        session.beginDialog('/fortuneTeller');
        break;
      case '5':
        session.beginDialog('/adopt');
        break;
      case '6':
        session.beginDialog('/weatherForecast');
        break;
      default:
        session.send('抱歉' + NICKNAME + '聽不懂>"<~~');
        session.beginDialog('/listFeature');
        break;
    }
  }
};

function getImageUrl(session) {
  const { message: { attachments } } = session;
  if (!attachments.length) return;
  const [attachment] = attachments;
  if (attachment.contentType.indexOf('image') === -1) return;
  console.log('has image');
  const { contentUrl } = attachment;
  console.log('contentUrl: ', contentUrl);
  return contentUrl;
}

// async function _handlePhoto(session) {
//   const { message: { attachments } } = session;
//   if (!attachments.length) return;
//   const [attachment] = attachments;
//   if (attachment.contentType.indexOf('image') === -1) return;
//   debug('has image');
//   const { contentUrl } = attachment;
//   debug('contentUrl: ', contentUrl);

//   [faces, emotions] = await Promise.all([
//     oxford.face({ url: contentUrl }),
//     oxford.emotion({ url: contentUrl })
//   ]);

//   var feedbacks = [
//     "你的眼睛真美~~ 好像會說話一樣!!",
//     "你的眼睛和眉毛的比例真是完美",
//     "你的嘴巴好性感喔~~",
//     "你的耳朵真有福氣~~",
//     "你好有氣質喔~~",
//     "你五官也太好看了~~",
//     "你的眼睛好有靈性~~",
//   ];

//   if (faces.length > 0 && emotions.length > 0) {
//     var age = faces[0].faceAttributes.age;
//     var gender = faces[0].faceAttributes.gender;
//     var smile = faces[0].faceAttributes.smile;

//     if (smile > 0.5) {
//       feedbacks.push('你笑容真可愛~~');
//       feedbacks.push('你笑容真靦腆~~');
//     } else if (smile > 0.8) {
//       if (gender == 'male') {
//         feedbacks.push('你笑起來真帥');
//         feedbacks.push('你笑起也太帥');
//       } else {
//         feedbacks.push('你笑容燦爛到讓仙女融化~~');
//         feedbacks.push('你笑起來也太美了!!~~');
//       }
//     }

//     var greeting;

//     if (gender == 'male') {
//       feedbacks.push('你還挺帥的耶~~');

//       if (age < 2) {
//         greeting = `嗨~小男嬰, 我猜你${age}歲, `;
//       } else if (age < 10) {
//         greeting = `嗨~小男孩, 我猜你${age}歲, `;
//       } else if (age < 16) {
//         greeting = `嗨~小鬼, 我猜你${age}歲, `;
//       } else if (age < 40) {
//         greeting = `嗨~帥哥, 我猜你${age}歲, `;
//       } else {
//         greeting = `嗨~大叔, 我猜你${age}歲, `;
//       }
//     } else {
//       feedbacks.push('你好漂亮喔~~');

//       if (age < 2) {
//         greeting = `嗨~小女嬰, 我猜你${age}歲, `;
//       } else if (age < 10) {
//         greeting = `嗨~小女孩, 我猜你${age}歲, `;
//       } else if (age < 16) {
//         greeting = `嗨~少女, 我猜你${age}歲, `;
//       } else if (age < 40) {
//         greeting = `嗨~正妹, 我猜你${age}歲, `;
//       } else {
//         greeting = `嗨~美女, 我猜你${age}歲, `;
//       }
//     }

//     session.send(greeting + feedbacks[random.integer(0, feedbacks.length - 1)]);

//     var maxKey = _.max(Object.keys(emotions[0].scores), function(o) {
//       return emotions[0].scores[o];
//     });

//     switch (maxKey) {
//       case "anger":
//         session.send('別這麼生氣咩, 讓仙女報好康的給你唷~');
//         var datas = [
//           "刨冰機",
//           "拳擊沙包",
//           "慘叫雞",
//           "擠泡泡",
//           "棉被",
//           "卡比獸 大娃娃",
//           "拳擊  不倒翁",
//           "飛鏢靶",
//           "刺小人",
//           "紓壓指尖陀螺",
//         ];
//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('快快氣消喔!~');
//         break;
//       case "disgust":
//         session.send('別這麼生氣咩, 讓仙女報好康的給你唷~');
//         var datas = [
//           "牙醫級氣壓式免插電便攜型強力沖牙器",
//           "美之凍",
//           "五月天 專輯",
//           "韓國浣熊炸醬麵",
//           "噴霧式香氛水氧機",
//           "蔓越莓乾",
//           "尼斯湖水怪泡茶器",
//           "養氣人蔘",
//           "光劍傘",
//           "Ora2 極緻香水漱口水",
//         ];

//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('快快氣消喔!~');
//         break;
//       case "contempt":
//         session.send('眼神別這麼可怕拉~ 讓仙女找東西讓你開心');
//         var datas = [
//           "李施德霖 全效護理漱口水",
//           "minipresso迷你濃縮咖啡機",
//           "寵愛之名 神經醯胺精華輕油",
//           "星空投影燈",
//           "nds 主機",
//           "breo 眼部按摩器",
//           "健身大師 全方位舞動魔力板",
//           "綜合維他命+礦物質發泡錠",
//           "窈窕美臀機",
//           "全能輕巧健身機",
//         ];

//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('要開心喔!~');
//         break;
//       case "fear":
//         session.send('別怕別怕, 仙女拿東西來秀秀唷~');
//         var datas = [
//           "美國Fidget Cube 創意神奇解壓方塊",
//           "滴雞精老協珍",
//           "香帥蛋糕 芋泥卷",
//           "Jo Malone 香氛工藝蠟燭",
//           "尼斯湖水怪泡茶器",
//           "旗艦中桶多功能泡腳機",
//           "breo 倍輕鬆 頭皮SPA按摩器",
//           "皇家東方泰spa",
//           "蒸氣眼罩花王",
//           "muva小精靈電動魔術枕",
//         ];

//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('沒什麼好怕的拉!~');
//         break;
//       case "happiness":
//         session.send('開心嗎?~ 看看以下的東西會更開心喔!');
//         var datas = [
//           "飛利浦 嫩白緊緻煥膚儀",
//           "MUID 多功能化妝鏡檯燈",
//           "OGUMA水美媒", "老行家珍珠粉面膜",
//           "burner倍熱 運動代謝燃料專業補給配方組",
//           "KAFEN卡氛 還原酸蛋白洗髮精/護髮素",
//           "歐娜雅 oanaya 香水 沐浴乳",
//           "葛洛莉SPA美學館",
//           "Solo Kaffe 單杯咖啡機",
//           "美國旅行者 28吋行李箱紫",
//           "窈窕美臀機",
//         ];

//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('要一直保持開心喔!~');
//         break;
//       case "neutral":
//         session.send('心情普普嗎?~ 看看以下的東西會更開心喔!');
//         var datas = [
//           "企鵝破冰台兒童益智桌遊",
//           "Jo Malone 香氛工藝蠟燭",
//           "療癒小盆栽",
//           "泡澡錠",
//           "nds 主機",
//           "Zero零感肌瞬卸凝霜",
//           "誰是放屁王",
//           "KIEHL’S 契爾氏 修護眼霜",
//           "za 粉餅",
//           "無痕壁貼 倫敦",
//         ];

//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('可以更好的!~ 加油');
//         break;
//       case "sadness":
//         session.send('別傷心拉~ 仙女拿東西幫你轉轉運!');
//         var datas = [
//           "懶骨頭沙發",
//           "御茶園 冰釀綠茶",
//           "OGUMA水美媒",
//           "北投-春天酒店",
//           "智能雙效美顏機",
//           "白金美容滾輪按摩器",
//           "皇家東方泰spa",
//           "NIKE 瑜珈柱",
//           "ray-ban雷朋 太陽眼鏡",
//           "Solo Kaffe 單杯咖啡機",
//         ];

//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('有仙女在, 拍拍');
//         break;
//       case "surprise":
//         session.send('這麼驚訝喔?~ 更讓人驚訝的還在後面呢!');
//         var datas = [
//           "宇宙人 抱枕",
//           "香蕉先生 娃娃",
//           "療癒大象抱枕",
//           "喬巴帽",
//           "行動麥克風 k99",
//           "小小兵 玩具",
//           "SONY SRS-X11 藍芽隨身喇叭",
//           "EPSON Pulsense 心率有氧教練 PS-100 心率運動手環",
//           "瑜珈按摩球",
//           "NEW BALANCE WRT580",
//         ];

//         var data = datas[random.integer(0, datas.length - 1)];

//         await reply.Products(session, data);
//         session.send('嘿嘿');
//         break;
//     }

//   } else {
//     session.send('哎呀呀, 仙女用放大鏡找過了...這張照片沒有人啊!');
//   }
// }

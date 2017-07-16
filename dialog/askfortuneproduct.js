var NICKNAME = require('../utility/nickname');
var builder = require('botbuilder');

var reply = require('../utility/reply');
var random = require("../utility/random");

module.exports = [
  (session, args, next) => {
    var message = new builder.Message(session)
      .sourceEvent({
        facebook: {
          "quick_replies": [{
            "content_type": "text",
            "title": "好",
            "payload": "好"
          }, {
            "content_type": "text",
            "title": "不要",
            "payload": "不要"
          }]
        }
      });
    var datas = [];
    switch (args) {
      case '01':
        datas = [
          "懶骨頭沙發",
          "御茶園 冰釀綠茶",
          "OGUMA水美媒",
          "老行家 珍珠粉禮盒",
          "智能雙效美顏機",
          "白金美容滾輪按摩器",
          "皇家東方泰spa",
          "NIKE 瑜珈柱",
          "ray-ban雷朋 太陽眼鏡",
          "Solo Kaffe 單杯咖啡機",
        ];

        message.text('你運氣也太好了! 要不要再搭配' + NICKNAME + '的乘勝追擊小魔法?');
        break;

      case '02':
        datas = [
          "蜂王乳精萃膠原凍",
          "PLAYBOY Avenue 時尚大道系列",
          "薇姿眼霜",
          "洗臉機倩碧",
          "義大利rudy profumi 沐浴露",
          "CASIO TR80 美肌自拍神器",
          "24K黃金活力按摩棒",
          "葛洛莉SPA美學館",
          "Whoo后 天氣丹華炫雙層蕾絲氣墊粉底禮盒",
          "全能輕巧健身機",
        ];


        message.text('你運氣也太好了! 要不要再搭配' + NICKNAME + '的乘勝追擊小魔法?');
        break;
      case '03':
        datas = [
          "粉紅色 床包",
          "粉紅色 飛行外套",
          "Kiss me眼線筆",
          "粉紅色手錶",
          "北投-春天酒店",
          "粉紅色 泳衣",
          "pony 唇膏",
          "MAYBELLINE 腮紅",
          "za 粉餅",
          "TESCOM 白金奈米膠原蛋白吹風機",
        ];

        message.text('你運氣也太好了! 要不要再搭配' + NICKNAME + '的乘勝追擊小魔法?');
      case '04':
        datas = [
          "飛利浦 嫩白緊緻煥膚儀",
          "MUID 多功能化妝鏡檯燈",
          "老行家珍珠粉面膜",
          "burner倍熱 運動代謝燃料專業補給配方組",
          "KAFEN卡氛 還原酸蛋白洗髮精/護髮素",
          "歐娜雅 oanaya 香水 沐浴乳",
          "直升機童趣燈",
          "華歌爾 內衣",
          "美國旅行者 28吋行李箱紫",
          "窈窕美臀機",
        ];

        message.text('你運氣也太好了! 要不要再搭配' + NICKNAME + '的乘勝追擊小魔法?');
        break;
      case '05':
        datas = [
          "氣墊粉餅蘭芝",
          "3M 淨呼吸超舒淨型負離子空氣清淨機",
          "Morocco GaGa Oil 摩洛哥5.5頭皮專科舒緩洗髮精",
          "無痕壁貼 倫敦",
          "多功能機能型4+2格書櫃型書桌",
          "綜合維他命+礦物質發泡錠",
          "紅豆水 纖q",
          "舒摩兒淨潤浴潔露",
          "飛利浦 迪士尼 毛怪",
          "健身大師 全方位舞動魔力板",
        ];
        message.text('普普通通嗎? 要不要試試' + NICKNAME + '的小確幸秘方?');
        break;
      case '06':
        datas = [
          "療癒熱賣!!可愛動物尾巴吸水造型盆栽",
          "【Matter Lab】NOIR 證件套",
          "LULUR SPA去角質霜",
          "韓國 Beloved & Co Q10高保濕美肌彈力/ 珍珠膠原嫩白身體乳",
          "香氛精油包 玫瑰花園",
          "Jo Malone 香氛工藝蠟燭",
          "淨白高效導入擦拭面膜",
          "療癒小盆栽",
          "寵愛之名 神經醯胺精華輕油",
          "牙醫級氣壓式免插電便攜型強力沖牙器",
        ];

        message.text('運氣指數有點不太好... 要不要看看' + NICKNAME + '的開運小物?');
        break;
      case '07':
        datas = [
          "春風衛生紙",
          "棉花糖機",
          "刨冰機",
          "星空投影燈",
          "造型藍芽喇叭",
          "手帕領巾",
          "五月天 專輯",
          "泡澡錠",
          "nds 主機",
          "Zero零感肌瞬卸凝霜",
        ];

        message.text('運氣指數有點不太好... 要不要看看' + NICKNAME + '的開運小物?');
        break;
      case '08':
        datas = [
          "膠原蛋白粉 明治",
          "美之凍",
          "【日本Utena 佑天蘭】黃金果凍",
          "韓國浣熊炸醬麵",
          "噴霧式香氛水氧機",
          "蔓越莓乾",
          "尼斯湖水怪泡茶器",
          "養氣人蔘",
          "光劍傘",
          "Ora2 極緻香水漱口水",
        ];

        message.text('運氣指數有點不太好... 要不要看看' + NICKNAME + '的開運小物?');
        break;
      case '09':
        datas = [
          "蒟蒻條",
          "西雅圖 濾掛 咖啡",
          "滑板車",
          "KIEHL’S 契爾氏 修護眼霜",
          "空氣清淨機 honeywell",
          "李施德霖 漱口水 酷涼橙橘",
          "驅塵氏 超黏拖",
          "寒舍艾麗酒店",
          "鈴鹿賽道樂園",
          "breo 眼部按摩器",
        ];

        message.text('運氣指數很糟糕耶... 要不要看看' + NICKNAME + '的轉運聖物?');
        break;
      case '10':
        datas = [
          "發洩香蕉",
          "拳擊沙包",
          "慘叫雞",
          "擠泡泡",
          "棉被",
          "卡比獸 大娃娃",
          "拳擊  不倒翁",
          "飛鏢靶",
          "刺小人",
          "紓壓指尖陀螺",
        ];

        message.text('運氣指數很糟糕耶... 要不要看看' + NICKNAME + '的轉運聖物?');
        break;
    }

    session.dialogData.fortuneData = datas[random.integer(0, datas.length - 1)];

    builder.Prompts.text(session, message);
  },
  async(session, results) => {

    var input = results.response.toLowerCase();

    if (input.includes('好') ||
      input.includes('恩') ||
      input.includes('sure') ||
      input.includes('y')) {
      session.send('讓' + NICKNAME + '翻翻魔法書~~ ');
      await reply.Products(session, session.dialogData.fortuneData);
      session.send('希望能讓你的運氣更佳!');
    } else {
      session.send('好吧...><');
    }

    delete session.dialogData.fortuneData;
    session.endDialogWithResult(results);
  },
];

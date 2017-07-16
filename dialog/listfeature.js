var NICKNAME = require('../utility/nickname');

module.exports = [
  (session, args, next) => {
    session.send(`哈囉，我是口袋旅遊達人～${NICKNAME}，你可以問我🙋  \n\n
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
    你可以這樣問我：附近哪裡好吃`);
    session.endDialog();
  }
];

var NICKNAME = require('../utility/nickname');

module.exports = [
  (session, args, next) => {
    session.send(`目前讓台灣卡好玩的` + NICKNAME + `來介紹功能有  \n\n
      1. 跟` + NICKNAME + `撒嬌
        - 我不知道什麼適合我....
      2. 拍照給` + NICKNAME + `施魔法
        - 上傳一張有你美美的照片
      3. 猜猜今天的運勢
        - 幫我算算今天的運氣
      4. 領養寵物
        - 我想領養毛小孩
      5. 瞭解今天天氣狀態
        - 今天天氣如何呢?
      `);
    session.endDialog();
  }
];

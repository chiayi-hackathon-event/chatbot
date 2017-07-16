var NICKNAME = require('../utility/nickname');

module.exports = (intent) => {
  intent.matches(/哈囉你好嗎/i, (session, args) => {
    session.send('衷心感謝~');
  });

  intent.matches(/^.*948794狂.*$/i, (session, args) => {
    session.send('我的老天鵝啊');
  });

  intent.matches(/^.*(再一次|再來一次|在一次|在來一次).*$/i, (session, args) => {
    session.send('孩子, 人生哪來這麼多再一次');
  });

  intent.matches(/^.*幾歲.*$/i, (session, args) => {
    session.send(NICKNAME + '永遠都是18歲');
  });

  intent.matches(/^.*笨.*$/i, (session, args) => {
    session.send('別罵' + NICKNAME + '笨拉...');
  });

  intent.matches(/^.*笑話.*$/i, (session, args) => {
    session.send(`一個物理學家，數學家和化學家一起到海邊去，

物理學家說：「我要研究海洋那運動的規律性。」於是就跑向海裡，

數學家說：「我要研究海浪潮起潮落時的曲線。」於是也跑向海裡，

但過了很久之後，二人都沒有再回來，於是化學家提筆寫下：

「物理學家和數學家可溶於水。」
`);
  });

  intent.matches(/^.*不好笑.*$/i, (session, args) => {
    session.send('你笑點很高耶');
  });

  intent.matches(/^.*(shutdown|關機).*$/i, (session, args) => {
    session.send('關掉就沒辦法burn azure consumption了');
  });

  intent.matches(/^.*屁.*$/i, (session, args) => {
    session.send('真的拉');
  });

  intent.matches(/^.*答應.*$/i, (session, args) => {
    session.send('>////<');
  });

  intent.matches(/^.*上傳.*$/i, (session, args) => {
    session.send('直接點選你要上傳的照片給' + NICKNAME + '吧');
  });

  intent.matches(/^.*按摩.*$/i, (session, args) => {
    session.send(NICKNAME + '不熟按摩拉><');
  });

  intent.matches(/^.*包多少.*$/i, (session, args) => {
    session.send('我想至少三千以上吧');
  });

  intent.matches(/^.*給虧嗎.*$/i, (session, args) => {
    session.send('...我們這邊是正派營業拉');
  });

  intent.matches(/^.*洗咧共蝦.*$/i, (session, args) => {
    session.send('...冷靜冷靜');
  });

  intent.matches(/^.*放大絕.*$/i, (session, args) => {
    session.send('有絕招就是要放呀');
  });

  intent.matches(/^.*電影.*$/i, (session, args) => {
    session.send('最近唯一期待的電影就是星際異攻隊2, 沒有之一');
  });

  intent.matches(/^.*暈.*$/i, (session, args) => {
    session.send('血糖太低可以隨身帶糖預防喔');
  });

  intent.matches(/^.*(買不起|好貴|太貴).*$/i, (session, args) => {
    session.send('貴有貴的價值拉!');
  });

  intent.matches(/^.*哭.*$/i, (session, args) => {
    session.send('別哭別哭~~ 慢慢的你就會習慣了');
  });
};

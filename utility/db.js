const tedious = require('tedious');
const {Connection, Request} = tedious;
const debug = require('debug')('db');

const config = {
  userName: 'sqladmin',
  password: 'S@mle@nn',
  server: 'fairy-bot.database.windows.net',
  options: {
      database: 'fairy-bot',
      encrypt: true
  }
}
const connection = new Connection(config);

connection.on('connect', err => {
    if (err) console.error('db connect fail: ', err);
});

module.exports = {
  insert: _insertHelper,
  insertUser({User_Id, Age, Gender, Emotion}) {
    return _insertHelper({
      tableName: 'Fairy_User',
      row: {
        User_Id,
        Age,
        Gender,
        Emotion
      }
    });
  },
  insertSearch({User_Id, Items}) {
    return _insertHelper({
      tableName: 'Fairy_Search',
      row: {
        User_Id,
        Items
      }
    });
  },
  insertPet({User_Id, Pet}) {
    return _insertHelper({
      tableName: 'Fairy_Pet',
      row: {
        User_Id,
        Pet
      }
    });
  },
  insertDraw({User_Id, Pet}) {
    return _insertHelper({
      tableName: 'Fairy_Draw',
      row: {
        User_Id
      }
    });
  }
};

function _insertHelper({tableName, row}) {
  return new Promise((resolve, reject) => {
    const cols = [];
    const vals = [];

    for (let key in row) {
      cols.push(key);
      vals.push(`N'${row[key]}'`);
    }

    const sqlStr =
      `INSERT INTO ${tableName} (${cols.join(', ')}) VALUES (${vals.join(', ')})`
    ;

    debug('sql: ', sqlStr);

    const request = new Request(
      sqlStr,
      (err, rowCount, rows) => {
        if (err) reject(err);
        else resolve({rowCount, row});
      }
    );
    connection.execSql(request);
  }).
    then((data) => debug(JSON.stringify(data))).
    catch(debug)
  ;
}

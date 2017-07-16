module.exports = (url) =>
  new Promise((resolve, reject) => {
    const uuidV4 = require('uuid/v4');
    const fileName = uuidV4();
    const fs = require('fs');
    const file = fs.createWriteStream(fileName);
    const request = require("request");

    request.get(url).pipe(file).
      on('finish', () => resolve(fileName)).
      on('error', () => reject(new Error('fail to download file')))
    ;
  })
;

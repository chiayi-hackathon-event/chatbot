var reply = require('../utility/reply');

module.exports = [
  (session, args, next) => {
    session.beginDialog('/askAdopt');
  },
  (session, results) => {
    session.endDialogWithResult(results);
  }
];

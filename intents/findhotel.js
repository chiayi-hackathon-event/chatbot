module.exports = [
  (session, args, next) => {
    session.beginDialog('/askhotellocation');
  },
  (session, results) => {
    session.endDialogWithResult(results);
  }
];

module.exports = [
  (session, args, next) => {
    session.beginDialog('/askSuitMe');
  },
  (session, results) => {
    session.endDialogWithResult(results);
  }
];

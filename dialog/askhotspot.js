var builder = require('botbuilder');
var unirest = require("unirest");

var reply = require('../utility/reply');
var random = require("../utility/random");

module.exports = session => {
  session.send('請直接上傳圖片就好!!');
};

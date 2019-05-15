const md5 = require("md5");

var hash = function(url, height, background) {
  return md5(`${url.toLowerCase()}${height}${background}`);
};

module.exports = hash;

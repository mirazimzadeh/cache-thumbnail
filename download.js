const axios = require("axios");
const fs = require("fs");
var path = require("path");

var download = async function(url, md5, callback) {
  const fileName = `img\\o\\${md5}${path.extname(url)}`;
  const file = fs.createWriteStream(fileName);

  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream"
  });
  response.data.pipe(file);

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });
    response.data.on("error", () => {
      reject();
    });
  });
};

module.exports = download;

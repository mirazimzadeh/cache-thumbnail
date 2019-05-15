// Oli Azimi

const express = require("express");
const app = express();

const download = require("./download");
const resize = require("./resize");
const hash = require("./hash");
const fs = require("fs");
var path = require("path");

app.get("/", function(req, res) {
  var url = req.query.url;

  if (url == undefined) {
    res.send("url is not defined");
    return;
  }

  const background = req.query.w != undefined ? "#ffffff" : "#000000";

  const height =
    req.query.s != undefined
      ? 150
      : req.query.m != undefined
      ? 250
      : req.query.l != undefined
      ? 400
      : 150;

  const md5 = hash(url, height, background);

  const thumbnailFile = path.join(__dirname, `/img/t/${md5}.png`);
  //check exist
  if (fs.existsSync(thumbnailFile)) {
    res.sendFile(thumbnailFile);
    return;
  }

  // download //
  download(url, md5).then(() => {
    resize(url, height, background, md5, () => {
      // send to response
      res.sendFile(thumbnailFile);
    });
  });
});

var server = app.listen(8081, function() {});

const sharp = require("sharp");
var path = require("path");

var resize = function(url, height, background, hash, callback) {
  var bg = background == undefined ? "black" : background;
  var originalFile = path.join(__dirname, `/img/o/${hash}${path.extname(url)}`);
  var thumbnailFile = path.join(__dirname, `/img/t/${hash}.png`);

  sharp(originalFile)
    // .flatten({
    //   background: bg
    // })
    .resize(undefined, height, {
      kernel: sharp.kernel.nearest,
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    //.jpeg({ quality: 80, progressive: true })
    .toFile(thumbnailFile)
    .then(() => {
      callback();
    });
};

module.exports = resize;

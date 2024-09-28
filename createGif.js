const fs = require('fs');

const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');

const width = 2480;
const height = 3508;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const encoder = new GIFEncoder(width, height);
encoder.createReadStream().pipe(fs.createWriteStream('./GIF.gif'));
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(15);
encoder.setQuality(100);

const imgList = fs.readdirSync('./images/');
imgList.forEach(async (f, i) => {
  const image = await loadImage(`./images/${f}`);
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  encoder.addFrame(ctx);
  if (i === imgList.length - 1) {
    encoder.finish();
    res.send({ message: 'GIF Generated!' });
  }
});

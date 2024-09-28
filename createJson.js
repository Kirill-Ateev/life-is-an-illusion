const imageToBase64 = require('image-to-base64');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Define the path to the directory containing the files
const directoryPath = './compressedImages';

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}
const arrayOfCompressedImages = [];
const files = fs.readdirSync(directoryPath);
console.log(
  files.sort((a, b) => Number(path.parse(a).name) - Number(path.parse(b).name))
);
// Loop through the files in the directory
files
  .sort((a, b) => Number(path.parse(a).name) - Number(path.parse(b).name))
  .forEach(function (file, index) {
    // Extract the file name without extension
    const fileName = path.parse(file).name;
    console.log(path.parse(file));
    const response = base64_encode(`compressedImages/${path.parse(file).base}`); // Path to the image

    // Create the JSON object
    // const data = {
    //   name: `Piece #${fileName}`,
    //   description: `Piece #${fileName}`,
    //   image: `data:image/webp;base64,${response}`,
    //   seller_fee_basis_points: 100,
    //   fee_recipient: '0x2dbf1b40f0593e338e56a2c2e6beade46ac83e8b',
    // };

    const data = `data:image/webp;base64,${response}`;

    arrayOfCompressedImages.push(data);
    // Write the JSON object to a file
    const jsonFile = `./json/${index + 1}.json`;
    fs.writeFileSync(jsonFile, data, function (err) {
      if (err) {
        return console.log('Error writing file: ' + err);
      }
      console.log(`File ${jsonFile} created successfully.`);
    });
  });

fs.writeFileSync(
  './data.json',
  JSON.stringify(arrayOfCompressedImages),
  function (err) {
    if (err) {
      return console.log('Error writing file: ' + err);
    }
    console.log(`File with compressed image data created successfully`);
  }
);

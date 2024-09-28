const fs = require('fs');
const path = require('path');

fs.readdirSync('./json', function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  // Loop through the files in the directory
  files.forEach(function (file, index) {
    const response = readFileSync(file);
    console.log(path.parse(file));
    arrayOfCompressedImages.push(response);
  });

  fs.writeFile(
    './data.json',
    JSON.stringify(arrayOfCompressedImages),
    function (err) {
      if (err) {
        return console.log('Error writing file: ' + err);
      }
      console.log(`File with compressed image data created successfully`);
    }
  );
});

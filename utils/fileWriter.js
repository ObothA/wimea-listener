const fs = require('fs');

function fileWriter(path, dataToWrite) {
  console.log('filewriter called .....');
  console.log();
  fs.appendFile(path, dataToWrite, (errorAppending) => {
    if (errorAppending) {
      console.log('append error in appendFile method ===>');
      console.error(errorAppending);
    }
  });
}

module.exports = fileWriter;

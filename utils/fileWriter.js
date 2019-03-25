const fs = require('fs');

function fileWriter(path, dataToWrite) {
  fs.appendFile(path, dataToWrite, (errorAppending) => {
    if (errorAppending) {
      console.log('append error in appendFile method ===>');
      console.error(errorAppending);
    }
  });
}

module.exports = fileWriter;

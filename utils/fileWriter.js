const fs = require('fs');

function fileWriter(path, dataToWrite) {
  console.log(' ===> fileWriter called <====');
  fs.appendFile(path, dataToWrite, (errorAppending) => {
    if (errorAppending) {
      console.log('append error in appendFile method ===>');
      console.error(errorAppending);
    }
  });
}

module.exports = fileWriter;

/* function that does actual writing to the files* */
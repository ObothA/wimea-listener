const fs = require("fs");

function fileWriter(path, dataToWrite) {
    fs.appendFile(path, dataToWrite, (errorAppending) => {
        console.log(" ===> fileWriter called <====");
        if (errorAppending) {
            console.log("append error in appendFile method ===>");
            console.error(errorAppending);
        }
    });
}

module.exports = fileWriter;

/*function that does actual writing to the files* */
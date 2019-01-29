export function fileWriter(path, dataToWrite) {
    fs.appendFile(path, dataToWrite, (errorAppending) => {
        if (errorAppending) {
            console.log("append error in appendFile method ===>");
            console.error(errorAppending);
        }
    });
}

/*function that does actual writing to the files* */
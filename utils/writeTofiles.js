const fileWriter = require("./fileWriter");


function wrtieToFiles(dataToWrite) {
    //** ***************************** */
    const path = "/var/www/html/awsmonitor/aws-monitor/public/stationsData/";
    if (dataToWrite.includes("byd-1")) {
        fileWriter(`${path}buyende_1.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("byd-2")) {
        fileWriter(`${path}buyende_2.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("ebb")) {
        fileWriter(`${path}entebbe.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("jja")) {
        fileWriter(`${path}jinja.dat`, dataToWrite);
    }


    else if (dataToWrite.includes("klr")) {
        fileWriter(`${path}kaliro.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("kml")) {
        fileWriter(`${path}kamuli.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("lwg")) {
        fileWriter(`${path}lwengo.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("mak")) {
        fileWriter(`${path}makerere.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("myg")) {
        fileWriter(`${path}mayuge.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("mbd")) {
        fileWriter(`${path}mubende.dat`, dataToWrite);
    }

    else if (dataToWrite.includes("uoj")) {
        fileWriter(`${path}uoj.dat`, dataToWrite);
    }

    // test gateway
    else if (dataToWrite.includes("test")) {
        fileWriter(`${path}test.dat`, dataToWrite);
    }

}

/** function to write data to files */

module.exports = wrtieToFiles;
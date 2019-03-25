/* eslint-disable brace-style */
const fileWriter = require('./fileWriter');


function wrtieToFiles(dataToWrite) {
  if (dataToWrite.includes('fos')) {
    console.log();
    console.log('write line to file');
    console.log(dataToWrite);
  }
  //* * ***************************** */
  const path = '/var/www/html/awsmonitor/aws-monitor/public/stationsData/';
  if (dataToWrite.includes('byd-1')) {
    fileWriter(`${path}buyende_1.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('byd-2')) {
    fileWriter(`${path}buyende_2.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('ebb')) {
    fileWriter(`${path}entebbe.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('jja')) {
    fileWriter(`${path}jinja.dat`, dataToWrite);
  }


  else if (dataToWrite.includes('klr')) {
    fileWriter(`${path}kaliro.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('kml')) {
    fileWriter(`${path}kamuli.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('lwg')) {
    fileWriter(`${path}lwengo.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('mak')) {
    fileWriter(`${path}makerere.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('myg')) {
    fileWriter(`${path}mayuge.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('mbd')) {
    fileWriter(`${path}mubende.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('uoj')) {
    fileWriter(`${path}uoj.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('fos')) {
    fileWriter(`${path}fos.dat`, dataToWrite);
  }

  // test gateway
  else if (dataToWrite.includes('test')) {
    fileWriter(`${path}test.dat`, dataToWrite);
  }

  /** new station  */
  else {
    
  }

}

/** function to write data to files */

module.exports = wrtieToFiles;
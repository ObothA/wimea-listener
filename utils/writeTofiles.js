/* eslint-disable vars-on-top */
/* eslint-disable prefer-destructuring */
/* eslint-disable brace-style */
const fileWriter = require('./fileWriter');


function wrtieToFiles(dataToWrite) {
  console.log('write to files called.... ');
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
    // eslint-disable-next-line no-var
    var NAME = '';
    dataToWrite.split(' ').map((item) => {
      item = item.replace('[', '');
      item = item.replace(']', '');

      /** handle names */
      if (item.includes('NAME')) {
        console.log('item has name');
        NAME = item.split('=')[1];
        fileWriter(`${path}${NAME}.dat`, dataToWrite);
      }

      if (item.includes('TXT')) {
        console.log('item has txt');
        NAME = item.split('=')[1];
        fileWriter(`${path}${NAME}.dat`, dataToWrite);
      }
    });
  }
}

/** function to write data to files */

module.exports = wrtieToFiles;
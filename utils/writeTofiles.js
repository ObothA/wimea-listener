/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-destructuring */
/* eslint-disable brace-style */
const fileWriter = require('./fileWriter');


function wrtieToFiles(dataToWrite) {
  //* * ***************************** */
  const path = '/var/www/html/awsmonitor/aws-monitor/public/stationsData/';
  if (dataToWrite.includes('byd-1')) {
    fileWriter(`${path}buyende_1.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('byd-2')) {
    fileWriter(`${path}buyende_2.dat`, dataToWrite);
  }

  else if (dataToWrite.includes('ebbg3-sink')) {
    fileWriter(`${path}kamuli.dat`, dataToWrite);
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

  else if (dataToWrite.includes('ebb')) {
    fileWriter(`${path}entebbe.dat`, dataToWrite);
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
        NAME = item.split('=')[1];

        /** handle stations with number eg byd_1 */
        if (NAME && NAME.includes('-')) {
          var origName = NAME;
          NAME = NAME.split('-')[0];
          var stationNumber = origName.split('-')[1];
          if (!isNaN(stationNumber)) {
            NAME = `${NAME}-${stationNumber}`;
          }
        } else if (NAME && NAME.includes('_')) {
          var origName1 = NAME;
          NAME = NAME.split('_')[0];
          var stationNumber2 = origName1.split('_')[1];
          if (!isNaN(stationNumber2)) {
            NAME = `${NAME}_${stationNumber2}`;
          }
        }

        /** use regex to macth only alphabet, numbers, - and _ */
        if (NAME && !NAME.match(/[^a-z,0-9,_,-]/gi)) {
          fileWriter(`${path}${NAME}.dat`, dataToWrite);
          NAME = '';
        }
      }

      if (item.includes('TXT')) {
        NAME = item.split('=')[1];

        /** handle stations with number eg byd_1 */
        if (NAME && NAME.includes('-')) {
          var origName2 = NAME;
          NAME = NAME.split('-')[0];
          var stationNumberTXT = origName2.split('-')[1];
          if (!isNaN(stationNumberTXT)) {
            NAME = `${NAME}-${stationNumberTXT}`;
          }
        } else if (NAME && NAME.includes('_')) {
          var origName2TXT = NAME;
          NAME = NAME.split('_')[0];
          var stationNumber2TXT = origName2TXT.split('_')[1];
          if (!isNaN(stationNumber2TXT)) {
            NAME = `${NAME}_${stationNumber2TXT}`;
          }
        }

        /** use regex to macth only alphabet, numbers, - and _ * to avoid corrupt names */
        if (NAME && !NAME.match(/[^a-z,0-9,_,-]/gi)) {
          fileWriter(`${path}${NAME}.dat`, dataToWrite);
          NAME = '';
        }
      }
    });
  }
}

/** function to write data to files */

module.exports = wrtieToFiles;
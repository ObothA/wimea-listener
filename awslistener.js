/* eslint-disable newline-per-chained-call */
/* eslint-disable prefer-destructuring */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */

const net = require('net');
const moment = require('moment');


const wrtieToFiles = require('./utils/writeTofiles');
const insertIntoDb = require('./utils/insertIntoDb');
const callback = require('./utils/callback');

const HOST = '0.0.0.0';
const PORT = 10024;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer((sock) => {
  /* We have a connection - a socket object is assigned to the connection automatically */
  console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`);

  /* Add a 'data' event handler to this instance of socket */
  sock.on('data', (data) => {
    // method that writes to db below
    receiveData(data.toString());
    /* method that writes to files */
  });

  /** *  Add a 'close' event handler to this instance of socket */
  sock.on('end', (/* data */) => {
    console.log(`CLOSED: ${sock.remoteAddress} ${sock.remotePort}`);
  });

  sock.on('error', (error) => {
    console.log(error);
    console.log(`listening afresh on ${HOST} : ${PORT}`);
  });

  sock.on('close', () => {
    console.log('socket closed');
    console.log('socket still listening');
  });
}).listen(PORT, HOST);

console.log(`Server listening on ${HOST}:${PORT}`);


function receiveData(packet) {
  /** **** */
  /* variables to insert into the db */
  /** *** */
  var masterObject = {
    RTC_T: null,
    NAME: '',
    E64: null,
    RH: null,
    T: null,
    V_IN: null,
    V_MCU: null,
    ADDR: null,
    SEQ: null,
    TTL: null,
    RSSI: null,
    LQI: null,
    PS: null,
    T1: null,
    P0_LST60: null,
    V_A2: null,
    V_A1: null,
    V_A3: null,
    T_SHT2X: null,
    RH_SHT2X: null,
    REPS: null,
    UP_TIME: null,
    V_AD1: null,
    UP: null,
    P_MS5611: null,
    V_BAT: null,
    SOC: null,
    V_MCRTC_T: null,
    V_AD2: null,
    UTC_TZ: null,
    stationname: null,
    stationID: null,
  };
  /** variables to use  through function */
  var packetArray = [];


  if (packet.includes('RTC_T') && packet.includes('\r\n')) {
    // eslint-disable-next-line no-param-reassign
    packet = packet.replace(/\r\n/gi, 'xyzabc');
    packetArray = packet.split('xyzabc');
  } else {
    packetArray = packet.split(']');
  }

  packetArray.map((line) => {
    if (line.trim()) {
      /* write line by line to files */
      wrtieToFiles(`${line}\r\n`);

      if (line.includes('TZ=UTC')) {
        masterObject.UTC_TZ = true;
      }

      /** ** this is intended to handle pi data **** */
      if (!line.includes('RTC_T')) {
        var datereg = RegExp('([2][0-9]{3})[-]([0-9]{2})[-]([0-9]{2})', 'g');
        var timereg = RegExp('([0-9]{2})[\\:]([0-9]{2})[\\:]([0-9]{2})', 'g');

        var date = datereg.exec(line);
        var time = timereg.exec(line);
        if (date && time) {
          masterObject.RTC_T = `${date[0]},${time[0]}`;
          /* convert utc time to ugandan time */
          if (masterObject.UTC_TZ) {
            var momentDate = moment(`${date[0]} ${time[0]}`, 'YYYY-MM-DD HH:mm:ss');
            // eslint-disable-next-line prefer-destructuring
            time = momentDate.add(3, 'hours').toString().split(' ')[4];
            masterObject.RTC_T = `${date[0]},${time}`;
            masterObject.UTC_TZ = null; // to avoid another operation down
          }

          if (masterObject.RTC_T && masterObject.RTC_T.length > 19) {
            /** if the data is corrupt, clean */
            masterObject.RTC_T = masterObject.RTC_T.slice(-19);
          } else if (!masterObject.RTC_T) {
            // console.log('** somehow rtc from pi is null!');
          }
        }
      }

      /** * end of handle pi data** */
      line.split(' ').map((item) => {
        item = item.replace('[', '');
        item = item.replace(']', '');
        if (item) {
          if (item.includes('RTC_T')) {
            date = item.split('=');
            date.map((x) => {
              if (x.includes(':')) {
                masterObject.RTC_T = x;
              }
            });

            /* convert utc time to ugandan time */
            if (masterObject.UTC_TZ && masterObject.RTC_T) {
              var onlyDate = masterObject.RTC_T.split(',')[0];
              var momentDate = moment(`${masterObject.RTC_T.replace(',', ' ')}`, 'YYYY-MM-DD HH:mm:ss');
              var timeOnly = momentDate.add(3, 'hours').toString().split(' ')[4];
              masterObject.RTC_T = `${onlyDate},${timeOnly}`;
            }

            if (masterObject.RTC_T && masterObject.RTC_T.length > 19) {
              /** if the data is corrupt, clean */
              masterObject.RTC_T = masterObject.RTC_T.slice(-19);
            } else if (!masterObject.RTC_T) {
              // console.log('** somehow rtc is null!');
            }
          }

          
          if (!masterObject.RTC_T) {
            /** console log the node with a null rtc */
            // console.log(`culprit of null rtc is: ${NAME}`);
          }

          if (item.includes('E64')) {
            masterObject.E64 = item.split('=')[1];
          }

          if (item.includes('RH')) {
            var tempRH = item.split('=');
            if (tempRH[0].length === 2) {
              masterObject.RH = tempRH[1];
            }
          }

          if (item.includes('T')) {
            if (item.split('=')[0].length === 1) {
              masterObject.T = item.split('=')[1];
            }
          }

          // to be remved
          if (item.includes('ADDR')) {
            masterObject.ADDR = item.split('=')[1];
          }

          if (item.includes('SEQ')) {
            masterObject.SEQ = item.split('=')[1];
          }

          if (item.includes('TTL')) {
            masterObject.TTL = item.split('=')[1];
          }

          if (item.includes('RSSI')) {
            masterObject.RSSI = item.split('=')[1];
          }

          if (item.includes('LQI')) {
            masterObject.LQI = item.split('=')[1];
          }

          if (item.includes('PS')) {
            var tempPS = item.split('=');
            if (tempPS[0].length === 2) {
              masterObject.PS = tempPS[1];
            }
          }

          if (item.includes('T1')) {
            masterObject.T1 = item.split('=')[1];
          }

          if (item.includes('P0_LST60')) {
            masterObject.P0_LST60 = item.split('=')[1];
          }

          if (item.includes('V_A1')) {
            masterObject.V_A1 = item.split('=')[1];
          }

          if (item.includes('V_A2')) {
            masterObject.V_A2 = item.split('=')[1];
          }

          if (item.includes('V_A3')) {
            masterObject.V_A3 = item.split('=')[1];
          }

          if (item.includes('V_IN')) {
            masterObject.V_IN = item.split('=')[1];
          }

          if (item.includes('V_MCU')) {
            masterObject.V_MCU = item.split('=')[1];
          }

          if (item.includes('T_SHT2X')) {
            masterObject.T_SHT2X = item.split('=')[1];
          }

          // handle temperature of 2m fos
          if (item.includes('T') && masterObject.NAME && masterObject.NAME.includes('fos')) {
            if (item.split('=')[0].length === 1) {
              masterObject.T_SHT2X = item.split('=')[1];
            }
          }


          if (item.includes('REPS')) {
            masterObject.REPS = item.split('=')[1];
          }

          if (item.includes('UP_TIME')) {
            masterObject.UP_TIME = item.split('=')[1];
          }

          if (item.includes('V_AD1')) {
            masterObject.V_AD1 = item.split('=')[1];
          }

          if (item.includes('UP')) {
            var tempUP = item.split('=');
            if (tempUP[0].length === 2) {
              masterObject.UP = tempUP[1];
            }
          }

          if (item.includes('P_MS5611')) {
            masterObject.P_MS5611 = item.split('=')[1];
          }

          if (item.includes('V_BAT')) {
            masterObject.V_BAT = item.split('=')[1];
          }

          if (item.includes('SOC')) {
            masterObject.SOC = item.split('=')[1];
          }

          if (item.includes('V_MCRTC_T')) {
            masterObject.V_MCRTC_T = item.split('=')[1];
          }

          if (item.includes('V_AD2')) {
            masterObject.V_AD2 = item.split('=')[1];
          }

          if (item.includes('RH_SHT2X')) {
            masterObject.RH_SHT2X = item.split('=')[1];
          }

          // handle relative humidity for fos
          if (item.includes('RH') && masterObject.NAME && masterObject.NAME.includes('fos')) {
            // eslint-disable-next-line block-scoped-var
            tempRH = item.split('=');
            // eslint-disable-next-line block-scoped-var
            if (tempRH[0].length === 2) {
              // eslint-disable-next-line block-scoped-var
              masterObject.RH_SHT2X = tempRH[1];
            }
          }

          /** handle names */
          if (item.includes('NAME')) {
            masterObject.NAME = item.split('=')[1];
          }

          if (item.includes('TXT')) {
            masterObject.NAME = item.split('=')[1];
            // console.log(item.split('=')[1]);
          }
        }
      });
      // close inner map
    
      console.log(masterObject.NAME);
      /** responsible for linking */
      if (masterObject.NAME && masterObject.NAME.includes('-')) {
        masterObject.stationname = masterObject.NAME.split('-')[0];
        var stationNumber = masterObject.NAME.split('-')[1];
        if (!isNaN(stationNumber)) {
          masterObject.stationname = `${masterObject.stationname}-${stationNumber}`;
        }
      } else if (masterObject.NAME && masterObject.NAME.includes('_')) {
        masterObject.stationname = masterObject.NAME.split('_')[0];
        var stationNumber2 = masterObject.NAME.split('_')[1];
        if (!isNaN(stationNumber2)) {
          masterObject.stationname = `${masterObject.stationname}_${stationNumber2}`;
        }
      }

      const masterObjectCopy = Object.assign({}, masterObject);

      const hasAccess = (id, masterObjectCopyArg, pool) => {
        masterObjectCopyArg.stationID = id;
        if (masterObjectCopyArg.stationID) {
          insertIntoDb(masterObjectCopyArg, pool);
        }
      };

      const QUERY = `SELECT station_id FROM stations WHERE StationName = '${masterObjectCopy.stationname}'`;
      callback(QUERY, masterObjectCopy, masterObjectCopy.stationname, hasAccess);
      /** responsible for linking */
    }
  });
  // close outter map

  // reinitialise the variables
  /** *** */
  masterObject.RTC_T = null;
  masterObject.NAME = '';
  masterObject.E64 = null;
  masterObject.RH = null;
  masterObject.T = null;
  masterObject.V_IN = null;
  masterObject.V_MCU = null;
  masterObject.ADDR = null;
  masterObject.SEQ = null;
  masterObject.TTL = null;
  masterObject.RSSI = null;
  masterObject.LQI = null;
  masterObject.PS = null;
  masterObject.T1 = null;
  masterObject.P0_LST60 = null;
  masterObject.V_A2 = null;
  masterObject.V_A1 = null;
  masterObject.V_A3 = null;
  masterObject.T_SHT2X = null;
  masterObject.RH_SHT2X = null;
  masterObject.REPS = null;
  masterObject.UP_TIME = null;
  masterObject.V_AD1 = null;
  masterObject.UP = null;
  masterObject.P_MS5611 = null;
  masterObject.V_BAT = null;
  masterObject.SOC = null;
  masterObject.V_MCRTC_T = null;
  masterObject.V_AD2 = null;
  masterObject.UTC_TZ = null;
  masterObject.stationname = null;
  masterObject.stationID = null;
  // /** ******* */
}

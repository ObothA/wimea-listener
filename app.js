/* eslint-disable newline-per-chained-call */
/* eslint-disable prefer-destructuring */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */

const net = require('net');
const mysql = require('mysql');
const moment = require('moment');


const wrtieToFiles = require('./utils/writeTofiles');

const HOST = '0.0.0.0';
const PORT = 10024;

// db init connetion
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'jmuhumuza',
  password: 'joshua',
  database: 'wdrDb',
});

// connect to the db
connection.connect((err) => {
  if (err) {
    console.log(err);
    console.log('error connecting to the db!');
  } else {
    console.log('Connection Established!');
  }
});

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
    wrtieToFiles(data.toString());
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
  var RTC_T = null;
  var NAME = '';
  var E64 = null;
  var RH = null;
  var T = null;
  var V_IN = null;
  var V_MCU = null;
  var ADDR = null;
  var SEQ = null;
  var TTL = null;
  var RSSI = null;
  var LQI = null;
  var PS = null;
  var T1 = null;
  var P0_LST60 = null;
  var V_A2 = null;
  var V_A1 = null;
  var V_A3 = null;
  var T_SHT2X = null;
  var RH_SHT2X = null;
  var REPS = null;
  var UP_TIME = null;
  var V_AD1 = null;
  var UP = null;
  var P_MS5611 = null;
  var V_BAT = null;
  var SOC = null;
  var V_MCRTC_T = null;
  var V_AD2 = null;
  var UTC_TZ = null;

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
      if (line.includes('TZ=UTC')) {
        UTC_TZ = true;
      }

      /** ** this is intended to handle pi data **** */
      if (!line.includes('RTC_T')) {
        var datereg = RegExp('([2][0-9]{3})[-]([0-9]{2})[-]([0-9]{2})', 'g');
        var timereg = RegExp('([0-9]{2})[\\:]([0-9]{2})[\\:]([0-9]{2})', 'g');

        var date = datereg.exec(line);
        var time = timereg.exec(line);
        if (date && time) {
          RTC_T = `${date[0]},${time[0]}`;
          /* convert utc time to ugandan time */
          if (UTC_TZ) {
            var momentDate = moment(`${date[0]} ${time[0]}`, 'YYYY-MM-DD HH:mm:ss');
            // eslint-disable-next-line prefer-destructuring
            time = momentDate.add(3, 'hours').toString().split(' ')[4];
            RTC_T = `${date[0]},${time}`;
            UTC_TZ = null; // to avoid another operation down
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
            date.map(function (x) {
              if (x.includes(':')) {
                RTC_T = x;
              }
            });

            /* convert utc time to ugandan time */
            if (UTC_TZ && RTC_T) {
              var onlyDate = RTC_T.split(',')[0];
              var momentDate = moment(`${RTC_T.replace(',', ' ')}`, 'YYYY-MM-DD HH:mm:ss');
              var timeOnly = momentDate.add(3, 'hours').toString().split(' ')[4];
              RTC_T = `${onlyDate},${timeOnly}`;
            }
          }

          if (item.includes('NAME')) {
            NAME = item.split('=')[1];
          }

          if (item.includes('TXT')) {
            NAME = item.split('=')[1];
          }


          if (item.includes('E64')) {
            E64 = item.split('=')[1];
          }

          if (item.includes('RH')) {
            var tempRH = item.split('=');
            if (tempRH[0].length === 2) {
              RH = tempRH[1];
            }
          }

          if (item.includes('T')) {
            if (item.split('=')[0].length === 1) {
              T = item.split('=')[1];
            }
          }

          // to be remved
          if (item.includes('ADDR')) {
            ADDR = item.split('=')[1];
          }

          if (item.includes('SEQ')) {
            SEQ = item.split('=')[1];
          }

          if (item.includes('TTL')) {
            TTL = item.split('=')[1];
          }

          if (item.includes('RSSI')) {
            RSSI = item.split('=')[1];
          }

          if (item.includes('LQI')) {
            LQI = item.split('=')[1];
          }

          if (item.includes('PS')) {
            var tempPS = item.split('=');
            if (tempPS[0].length === 2) {
              PS = tempPS[1];
            }
          }

          if (item.includes('T1')) {
            T1 = item.split('=')[1];
          }

          if (item.includes('P0_LST60')) {
            P0_LST60 = item.split('=')[1];
          }

          if (item.includes('V_A1')) {
            V_A1 = item.split('=')[1];
          }

          if (item.includes('V_A2')) {
            V_A2 = item.split('=')[1];
          }

          if (item.includes('V_A3')) {
            V_A3 = item.split('=')[1];
          }

          if (item.includes('V_IN')) {
            V_IN = item.split('=')[1];
          }

          if (item.includes('V_MCU')) {
            V_MCU = item.split('=')[1];
          }

          if (item.includes('T_SHT2X')) {
            T_SHT2X = item.split('=')[1];
          }

          // handle temperature of 2m fos
          if (item.includes('T') && NAME && NAME.includes('fos')) {
            if (item.split('=')[0].length === 1) {
              T_SHT2X = item.split('=')[1];
            }
          }


          if (item.includes('REPS')) {
            REPS = item.split('=')[1];
          }

          if (item.includes('UP_TIME')) {
            UP_TIME = item.split('=')[1];
          }

          if (item.includes('V_AD1')) {
            V_AD1 = item.split('=')[1];
          }

          if (item.includes('UP')) {
            var tempUP = item.split('=');
            if (tempUP[0].length === 2) {
              UP = tempUP[1];
            }
          }

          if (item.includes('P_MS5611')) {
            P_MS5611 = item.split('=')[1];
          }

          if (item.includes('V_BAT')) {
            V_BAT = item.split('=')[1];
          }

          if (item.includes('SOC')) {
            SOC = item.split('=')[1];
          }

          if (item.includes('V_MCRTC_T')) {
            V_MCRTC_T = item.split('=')[1];
          }

          if (item.includes('V_AD2')) {
            V_AD2 = item.split('=')[1];
          }

          if (item.includes('RH_SHT2X')) {
            RH_SHT2X = item.split('=')[1];
          }

          // handle relative humidity for fos
          if (item.includes('RH') && NAME && NAME.includes('fos')) {
            // eslint-disable-next-line block-scoped-var
            tempRH = item.split('=');
            // eslint-disable-next-line block-scoped-var
            if (tempRH[0].length === 2) {
              // eslint-disable-next-line block-scoped-var
              RH_SHT2X = tempRH[1];
            }
          }
        }
      });
      // close inner map


      if (NAME && NAME.toLowerCase().includes('2m')) {
        // object for the 2meter node
        const node_2m = {
          RTC_T,
          NAME,
          E64,
          T,
          V_IN,
          V_MCU,
          SEQ,
          TTL,
          RSSI,
          LQI,
          T_SHT2X,
          RH_SHT2X,
          UP_TIME,
          DATE: new Date().toString().split(' ').slice(0, 4).join(' '),
          TIME: new Date().toString().split(' ')[4],
          hoursSinceEpoch: new Date().getTime() / 36e5,
        };


        // query to insert into the 2 meter table
        connection.query('INSERT INTO TwoMeterNode SET ?', node_2m, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
      }


      if (NAME && NAME.toLowerCase().includes('10m')) {
        // object for 10 meter node
        const node_10_meter = {
          RTC_T,
          NAME,
          E64,
          T,
          V_IN,
          V_MCU,
          SEQ,
          TTL,
          RSSI,
          LQI,
          P0_LST60,
          V_A2,
          V_A1,
          UP_TIME,
          V_AD1,
          V_AD2,
          DATE: new Date().toString().split(' ').slice(0, 4).join(' '),
          TIME: new Date().toString().split(' ')[4],
          hoursSinceEpoch: new Date().getTime() / 36e5,

        };

        // query to insert into the 10 meter table
        connection.query('INSERT INTO TenMeterNode SET ?', node_10_meter, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
      }


      if (NAME && NAME.toLowerCase().includes('gnd')) {
        // object to be inserted into ground table
        const ground_node = {
          RTC_T,
          NAME,
          E64,
          T,
          V_IN,
          V_MCU,
          SEQ,
          TTL,
          RSSI,
          LQI,
          T1,
          P0_LST60,
          V_A2,
          V_A1,
          UP_TIME,
          DATE: new Date().toString().split(' ').slice(0, 4).join(' '),
          TIME: new Date().toString().split(' ')[4],
          hoursSinceEpoch: new Date().getTime() / 36e5,
        };


        // query to insert into the ground table
        connection.query('INSERT INTO GroundNode SET ?', ground_node, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
      }


      if (NAME && NAME.toLowerCase().includes('sink')) {
        // object to insert into sink table
        const sink_node = {
          RTC_T,
          NAME,
          E64,
          T,
          V_IN,
          V_MCU,
          SEQ,
          UP_TIME,
          P_MS5611,
          DATE: new Date().toString().split(' ').slice(0, 4).join(' '),
          TIME: new Date().toString().split(' ')[4],
          hoursSinceEpoch: new Date().getTime() / 36e5,

        };

        // query to insert into the sink table
        connection.query('INSERT INTO SinkNode SET ?', sink_node, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
      }

      var stationname;
      if (NAME && NAME.includes('-')) {
        stationname = NAME.split('-')[0];
      } else if (NAME && NAME.includes('_')) {
        stationname = NAME.split('_')[0];
      }

      // object to insert into the general table
      const general_table = {
        stationname,
        V_BAT,
        SOC,
        V_MCRTC_T,
        REPS,
        DATE: new Date().toString().split(' ').slice(0, 4).join(' '),
        TIME: new Date().toString().split(' ')[4],
        hoursSinceEpoch: new Date().getTime() / 36e5,

      };


      if (NAME) {
        // query to insert into the general table
        connection.query('INSERT INTO GeneralTable SET ?', general_table, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
      }


      // reinitialise the variables
      /** *** */
      RTC_T = null;
      NAME = '';
      E64 = null;
      RH = null;
      T = null;
      V_IN = null;
      V_MCU = null;
      ADDR = null;
      SEQ = null;
      TTL = null;
      RSSI = null;
      LQI = null;
      PS = null;
      T1 = null;
      P0_LST60 = null;
      V_A2 = null;
      V_A1 = null;
      V_A3 = null;
      T_SHT2X = null;
      RH_SHT2X = null;
      REPS = null;
      UP_TIME = null;
      V_AD1 = null;
      UP = null;
      P_MS5611 = null;
      V_BAT = null;
      SOC = null;
      V_MCRTC_T = null;
      V_AD2 = null;
      UTC_TZ = null;
      /** ******* */
    }
  });
  // close outter map
}

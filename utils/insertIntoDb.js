/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */
const insertIntoDb = (masterObject,connection) => {
  var RTC_T = masterObject.RTC_T;
  var NAME = masterObject.NAME;
  var E64 = masterObject.E64;
  var RH = masterObject.RH;
  var T = masterObject.T;
  var V_IN = masterObject.V_IN;
  var V_MCU = masterObject.V_MCU;
  var ADDR = masterObject.ADDR;
  var SEQ = masterObject.SEQ;
  var TTL = masterObject.TTL;
  var RSSI = masterObject.RSSI;
  var LQI = masterObject.LQI;
  var PS = masterObject.PS;
  var T1 = masterObject.T1;
  var P0_LST60 = masterObject.P0_LST60;
  var V_A2 = masterObject.V_A2;
  var V_A1 = masterObject.V_A1;
  var V_A3 = masterObject.V_A3;
  var T_SHT2X = masterObject.T_SHT2X;
  var RH_SHT2X = masterObject.RH_SHT2X;
  var REPS = masterObject.REPS;
  var UP_TIME = masterObject.UP_TIME;
  var V_AD1 = masterObject.V_AD1;
  var UP = masterObject.UP;
  var P_MS5611 = masterObject.P_MS5611;
  var V_BAT = masterObject.V_BAT;
  var SOC = masterObject.SOC;
  var V_MCRTC_T = masterObject.V_MCRTC_T;
  var V_AD2 = masterObject.V_AD2
  var UTC_TZ = masterObject.UTC_TZ;
  var stationname = masterObject.stationname;
  var stationID = masterObject.stationID;

    
  if (NAME && NAME.toLowerCase().includes('2m')) {
    // object for the 2meter node
    const node_2m = {
      stationID,
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
      stationID,
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
      stationID,
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
      stationID,
    };
  
    // query to insert into the sink table
    connection.query('INSERT INTO SinkNode SET ?', sink_node, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }
  
  
  // object to insert into the general table
  const general_table = {
    RTC_T,
    stationname,
    V_BAT,
    SOC,
    V_MCRTC_T,
    REPS,
    DATE: new Date().toString().split(' ').slice(0, 4).join(' '),
    TIME: new Date().toString().split(' ')[4],
    hoursSinceEpoch: new Date().getTime() / 36e5,
    stationID,
  };
  
  if ((NAME && V_BAT && SOC) || (NAME && REPS)) {
    // query to insert into the general table
    connection.query('INSERT INTO GeneralTable SET ?', general_table, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }
  
  const elec = {
    RTC_T,
    V_BAT,
    SOC,
    stationname,
    NAME,
    stationID,
  };
  
  if (NAME && V_BAT && SOC && NAME.toLowerCase().includes('elec')) {
    // query to insert into the elec
    connection.query('INSERT INTO Electron SET ?', elec, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }
  
//   connection.end((err) => {
//     // The connection is terminated now
//     if (err) {
//       console.log('=====================================================');
//       console.log('connection has been closed albeit with an error');
//       console.log('=====================================================');
//       console.log(err);
//     }
//   });
};


module.exports = insertIntoDb;

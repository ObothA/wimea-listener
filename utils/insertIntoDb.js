/* eslint-disable vars-on-top */
const closeConnection = require('./closeDbConnection');

/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */
const insertIntoDb = (masterObjectCopy, pool) => {
  var RTC_T = masterObjectCopy.RTC_T;
  var NAME = masterObjectCopy.NAME;
  var E64 = masterObjectCopy.E64;
  var RH = masterObjectCopy.RH;
  var T = masterObjectCopy.T;
  var V_IN = masterObjectCopy.V_IN;
  var V_MCU = masterObjectCopy.V_MCU;
  var ADDR = masterObjectCopy.ADDR;
  var SEQ = masterObjectCopy.SEQ;
  var TTL = masterObjectCopy.TTL;
  var RSSI = masterObjectCopy.RSSI;
  var LQI = masterObjectCopy.LQI;
  var PS = masterObjectCopy.PS;
  var T1 = masterObjectCopy.T1;
  var P0_LST60 = masterObjectCopy.P0_LST60;
  var V_A2 = masterObjectCopy.V_A2;
  var V_A1 = masterObjectCopy.V_A1;
  var V_A3 = masterObjectCopy.V_A3;
  var T_SHT2X = masterObjectCopy.T_SHT2X;
  var RH_SHT2X = masterObjectCopy.RH_SHT2X;
  var REPS = masterObjectCopy.REPS;
  var UP_TIME = masterObjectCopy.UP_TIME;
  var V_AD1 = masterObjectCopy.V_AD1;
  var UP = masterObjectCopy.UP;
  var P_MS5611 = masterObjectCopy.P_MS5611;
  var V_BAT = masterObjectCopy.V_BAT;
  var SOC = masterObjectCopy.SOC;
  var V_MCRTC_T = masterObjectCopy.V_MCRTC_T;
  var V_AD2 = masterObjectCopy.V_AD2
  var UTC_TZ = masterObjectCopy.UTC_TZ;
  var stationname = masterObjectCopy.stationname;
  var stationID = masterObjectCopy.stationID;

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
    pool.query('INSERT INTO TwoMeterNode SET ?', node_2m, (err, res) => {
      if (err) {
        throw err;
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
    pool.query('INSERT INTO TenMeterNode SET ?', node_10_meter, (err, res) => {
      if (err) {
        throw err;
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
    pool.query('INSERT INTO GroundNode SET ?', ground_node, (err, res) => {
      if (err) {
        throw err;
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
    pool.query('INSERT INTO SinkNode SET ?', sink_node, (err, res) => {
      if (err) {
        throw err;
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
    pool.query('INSERT INTO GeneralTable SET ?', general_table, (err, res) => {
      if (err) {
        throw err;
      }
    });
  }
  
  const elec = {
    RTC_T,
    V_BAT,
    SOC,
    stationname,
    stationID,
  };

  if (NAME && V_BAT && SOC && NAME.toLowerCase().includes('elec')) {
    // query to insert into the elec
    pool.query('INSERT INTO Electron SET ?', elec, (err, res) => {
      if (err) {
        throw err;
      }
    });
  }
};


module.exports = insertIntoDb;

/* eslint-disable no-var */
const mysql = require('mysql');
const closeDbConnection = require('./closeDbConnection');

function callback(QUERY, masterObjectCopy, stationname, callbackfunc) {
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
      console.log('Connection to the db established!');
    }
  });


  connection.query(QUERY, (queryError, result, fields) => {
    if (queryError) {
      throw queryError;
    } else if (result.length > 0) {
      callbackfunc(result[0].station_id, masterObjectCopy);
      closeDbConnection(connection);
    } else {
      const STATION_NAMES = {
        myg: 54,
        makg3: 53,
        kml: 52,
        jja: 50,
        'byd-2': 49,
        'byd-1': 48,
        /** duplicates to bend the rules for naming errors */
        jjag: 50,
        mak: 53,
        ebbg3: 52,
        makg2: 53,
        fos: 53,
        fios: 53,
        byd: 48,
        jjag3: 50,
        mygg3: 54,
        jnj: 50,
      };

      callbackfunc(STATION_NAMES[stationname], masterObjectCopy);
      closeDbConnection(connection);
    }
  });
}

module.exports = callback;

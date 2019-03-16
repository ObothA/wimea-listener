function callback(connection, QUERY, masterObject, stationname) {
  const hasAccess = (id) => {
    masterObject.stationID = id;

    console.log(masterObject);
  };

  connection.query(QUERY, (queryError, result, fields) => {
    console.log();
    console.log('query');
    if (queryError) {
      throw queryError;
    } else if (result.length > 0) {
      hasAccess(result[0].station_id);
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

      hasAccess(STATION_NAMES[stationname]);
    }
    // console.log(masterObject);
    // console.log();
    // console.log('master object');
    // console.log(masterObject);
    // insertIntoDb(masterObject, connection);
  });
}

module.exports = callback;

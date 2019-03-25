
function closeConnection(connection) {
  connection.end((ConnectionEndErr) => {
    // The connection is terminated now
    if (ConnectionEndErr) {
      console.log();
      console.log('=====================================================');
      console.log('connection has been closed albeit with an error');
      console.log('=====================================================');
      console.log(ConnectionEndErr);
    }
  });
}

module.exports = closeConnection;

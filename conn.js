const mysql = require('mysql');
const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
var con;

function handleDisconnect() {
  con = mysql.createConnection(db_config);

  con.connect(function (err){
      if(err) {
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000);
      }
  });

  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

module.exports = con
// ;rpl
// module.exports = con;

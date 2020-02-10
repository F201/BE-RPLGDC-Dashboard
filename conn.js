const mysql = require('mysql');
const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
var con;

function handleDisconnect() {
  console.log("\n New connection tentative...");
  con = mysql.createConnection(db_config);
  //- Destroy the current connection variable
  //- Try to reconnect
  con.connect(function (err){
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect(), 2000);
    }
    else {
      console.log("\n\t *** New connection established with the database. ***")
    }
  });

  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect(con);
    } else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        handleDisconnect(con);
    }
  
    //- Fatal error : connection variable must be recreated
    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        handleDisconnect();
    }
  
    //- Error because a connection is already being established
    else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
    }
  
    //- Anything else
    else{
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        handleDisconnect();
    }
  });
}

handleDisconnect();

module.exports = con;
// ;rpl
// module.exports = con;

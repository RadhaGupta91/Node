const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodeSql",
    multipleStatements:true,

});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log("Connection estabished");
    else
        console.log("Connection failed"+err);
})

module.exports = mysqlConnection;
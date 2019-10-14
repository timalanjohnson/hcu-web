var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'testdb'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connection');
});

module.exports = connection;
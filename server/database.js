const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vacationsdb'
});

connection.connect(err => {
    if(err) {
        console.log(err);
    } else {
    console.log('Connected to the MySQL server');
    }
});

module.exports = connection
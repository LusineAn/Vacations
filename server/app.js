const express = require('express');
const cors = require('cors');

const connection = require('./database')
const router = require('./routes');

const app = express();
const port = 8081;
app.use(cors());
app.use('/', router);

connection.connect(err => {
    if(err) {
        return console.log(err);
    }
    console.log('Connected to the MySQL server');
    var server = app.listen(port, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port)
    })
});

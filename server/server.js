const express = require('express');
const cors = require('cors');
const path = require('path');

const connection = require('./database')
const router = require('./routes');

// Express app setup
const app = express();

const port = process.env.PORT || 8081;

app.use(cors());

// use routes
app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/public')));

connection.connect(err => {
    if(err) {
        return console.log(err);
    }
    console.log('Connected to the MySQL server');

    var server = app.listen(port, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log("path is:", path.join(__dirname, 'public'))
        console.log("Example app listening at http://%s:%s", host, port)
    })
});

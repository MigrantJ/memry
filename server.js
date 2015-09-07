'use strict';

try {
    require('./server/local_env.js');
}
catch (err) {
    console.log('Cannot read local config, using server environment vars');
}

var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    dbConnection = require('./server/db_connection.js'),
    routes = require('./server/routes.js'),
    app = express();

app.set('root', __dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/build/'));

//init route
routes.initialize(app, dbConnection);

var server = http.createServer(app);

//prevents server crashes. should remove before prod
//process.on('uncaughtException', function (err) {
//   console.log(err);
//});

server.listen(process.env.PORT, function() {
  console.log('Server Ready');
});

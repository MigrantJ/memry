'use strict';

var   express = require('express'),
      bodyParser = require('body-parser'),
      http = require('http'),
      dbConnection = require('./server/db_connection.js'),
      routes = require('./server/routes.js'),
      app = express();

app.set('port', process.env.PORT || 8000);
app.set('root', __dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/build/'));

//init route
routes.initialize(app, dbConnection);

var server = http.createServer(app);

//todo: trying this out to prevent server crashes. should remove before prod
process.on('uncaughtException', function (err) {
   console.log(err);
});

server.listen(app.get('port'), function() {
  console.log('Server Ready');
});
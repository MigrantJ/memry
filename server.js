'use strict';

var   express = require('express'),
      //morgan = require('morgan'),
      bodyParser = require('body-parser'),
      http = require('http'),
      dbConnection = require('./server/db_connection.js'),
      routes = require('./server/routes.js'),
      app = express();

app.set('port', process.env.PORT || 8000);
app.set('root', __dirname);

//app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/build/'));

//init route
routes.initialize(app, dbConnection);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('Express GO! Listening on port:' + app.get('port'));
});
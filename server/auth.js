'use strict';

var jwt = require('jsonwebtoken');
//this can literally be any string you want. except 'secret' or 'pass' ;)
var secret = 'funeolv739t62/3uipblak';
var api = {};
//in minutes
var expiryTime = 1;

function getExpiryDate() {
  return (new Date()).getMinutes() + expiryTime;
}

api.getToken = function (user) {
  return jwt.sign({exp: getExpiryDate()}, secret);
};

api.checkReq = function (req, res, next) {
  var bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var token = bearer[1];
    jwt.verify(token, secret, function (err, decoded) {
      console.log(decoded);
      res.status(403).json(decoded);
    });
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = api;
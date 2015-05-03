'use strict';

var jwt = require('jsonwebtoken');
//this can literally be any string you want. except 'secret' or 'pass' ;)
var secret = 'funeolv739t62/3uipblak';
var api = {};
//in hours
var expiryTime = 2;

//time is the creation timestamp of the token, in seconds
function isExpired(time) {
  return time + (expiryTime * 60 * 60) < Date.now() / 1000;
}

api.getToken = function () {
  return jwt.sign({poop: 'asdf'}, secret);
};

api.checkReq = function (req, res, next) {
  var bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var token = bearer[1];
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).json(err);
      } else {
        if (isExpired(decoded.iat)) {
          res.status(401).json({err: 'Your token expired'});
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401).json({err: 'No auth found'});
  }
};

module.exports = api;
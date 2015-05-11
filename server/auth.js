'use strict';

var jwt = require('jsonwebtoken');
var https = require('https');
var querystring = require('querystring');

//this can literally be any string you want. except 'secret' or 'pass' ;)
var secret = 'funeolv739t62/3uipblak';
var api = {};
//in hours
var expiryTime = 1;

//Google oauth
var gTokenReq = {
  client_id: '479937515705-n9mktm5i15aq19p72fda9cnnjp5vp2rj.apps.googleusercontent.com',
  client_secret: 'Q94mrjjYhOrtVT5jEc_qzHh0',
  redirect_uri: 'http://localhost:8000/oauth2callback',
  grant_type: 'authorization_code'
};

//FB oauth
var fbTokenReq = {
  client_id: '1674549109435449',
  client_secret: '0d72319aeb2c1d235a620f8d0ae23c0f',
  redirect_uri: 'http://localhost:8000/oauth2callback',
  grant_type: 'client_credentials'
};

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
        //.iat is a timestamp added automatically to object payloads by jwt
        if (isExpired(decoded.iat)) {
          res.status(401).json({err: 'Token expired'});
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401).json({err: 'No auth found'});
  }
};

api.getGoogleToken = function (code) {
  gTokenReq.code = code;
  var postData = querystring.stringify(gTokenReq);
  var req = https.request({
    hostname: 'www.googleapis.com',
    path: '/oauth2/v3/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('body: ' + chunk);
    });
  });
  //  .on('error', function (e) {
  //  console.error(e);
  //});
  req.write(postData);
  req.end();
};

api.verifyFBToken = function (token) {
  //get app token
  var qString = querystring.stringify(fbTokenReq);
  https.get('https://graph.facebook.com/oauth/access_token' + qString, function (res) {
    res.on('data', function (chunk) {
      console.log(qString);
      console.log('body: ' + chunk);
    });
  });

  //use app token to verify user access token
};

module.exports = api;
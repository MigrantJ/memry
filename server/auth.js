'use strict';

var jwt = require('jsonwebtoken');
var https = require('https');
var querystring = require('querystring');
var bcrypt = require('bcrypt-nodejs');

var bcrypt_secret = process.env.BCRYPT_SECRET;
var api = {};
//in hours
var expiryTime = 1;

//Google oauth
var gTokenReq = {
  client_id: '479937515705-n9mktm5i15aq19p72fda9cnnjp5vp2rj.apps.googleusercontent.com',
  client_secret: process.env.GOOGLE_AUTH_SECRET,
  redirect_uri: 'http://memry.herokuapp.com/oauth2callback',
  grant_type: 'authorization_code'
};

//FB oauth
var fbTokenReq = {
  client_id: '1674549109435449',
  client_secret: process.env.FB_AUTH_SECRET,
  redirect_uri: 'http://memry.herokuapp.com/oauth2callback',
  grant_type: 'client_credentials'
};

//time is the creation timestamp of the token, in seconds
function isExpired(time) {
  return time + (expiryTime * 60 * 60) < Date.now() / 1000;
}

api.getToken = function (user_id, deflist_id) {
  return jwt.sign({user_id: user_id, deflist_id: deflist_id}, bcrypt_secret);
};

api.checkReq = function (req, res, next) {
  var bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ');
    var token = bearer[1];
    jwt.verify(token, bcrypt_secret, function (err, decoded) {
      if (err) {
        res.status(401).json(err);
      } else {
        //.iat is a timestamp added automatically to object payloads by jwt
        if (isExpired(decoded.iat)) {
          res.status(401).json({error: 'Token expired'});
        } else {
          req.memry = {};
          req.memry.user_id = decoded.user_id;
          req.memry.deflist_id = decoded.deflist_id;
          next();
        }
      }
    });
  } else {
    res.status(401).json({error: 'No auth found'});
  }
};

api.getGoogleToken = function (code) {
  var qString = 'client_id=' + gTokenReq.client_id + '&client_secret=' + gTokenReq.client_secret + '&redirect_uri=' + gTokenReq.redirect_uri + '&grant_type=' + gTokenReq.grant_type + '&code=' + code;
  var req = https.request({
    hostname: 'www.googleapis.com',
    path: '/oauth2/v3/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(qString)
    }
  }, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('qString: ' + qString);
      console.log('body: ' + chunk);
    });
  });
  req.write(qString);
  req.end();
};

api.checkOauth = function (req, res, next) {
  //get app token
  var qString = querystring.stringify(fbTokenReq);
  https.get('https://graph.facebook.com/oauth/access_token?' + qString, function (fbres) {
    fbres.on('data', function (chunk) {
      var chunkArray = chunk.toString().split('=');
      if (chunkArray[0] === 'access_token') {
        //now use it to verify the user's token
        qString = querystring.stringify({ access_token: chunkArray[1], input_token: req.body.token});
        https.get('https://graph.facebook.com/debug_token?' + qString, function (fbres2) {
          fbres2.on('data', function (chunk) {
            var tokenData = JSON.parse(chunk).data;
            if (tokenData.is_valid) {
              req.username = tokenData.user_id;
              next();
            } else {
              console.log(JSON.parse(chunk));
              res.status(401).send({error: 'Facebook token auth failed'});
            }
          });
        });
      }
    });
  });
};

api.hashPassword = function (pass) {
  return bcrypt.hashSync(pass);
};

api.comparePassword = function (pass, hash) {
  return bcrypt.compareSync(pass, hash);
};

api.checkCaptcha = function (req, res, next) {
  var captchaReqObj = {
    secret: process.env.GOOGLE_CAPTCHA_SECRET,
    response: req.body.captcha
  };
  var qString = querystring.stringify(captchaReqObj);
  var cReq = https.request({
    hostname: 'www.google.com',
    path: '/recaptcha/api/siteverify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(qString)
    }
  }, function (cRes) {
    cRes.setEncoding('utf8');
    cRes.on('data', function (chunk) {
      if (JSON.parse(chunk).success) {
        next();
      } else {
        res.status(401).send('Please check the captcha box!');
      }
    });
  });

  cReq.write(qString);
  cReq.end();
};

module.exports = api;

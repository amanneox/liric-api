var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.profileRead = function(req, res,next) {

var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

if (!token)
   return res.status(403).send({ auth: false, message: 'No token provided.' });

 jwt.verify(token, 'MY_SECRET', function(err, decoded) {
   if (err)
   return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });



   req.auth = decoded;

   next();
 });

};

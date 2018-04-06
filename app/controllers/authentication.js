var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');
var cookieParser = require('cookie-parser');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var auth;
module.exports.register = function(req, res,next) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.cookie('x-access-token',token);
    req.session.user = user;
    next();
  /* res.json({
     "token" : token
   });
*/
  });




};
module.exports.login = function(req, res,next) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.cookie('x-access-token',token);
      req.session.user = user;

     next();

    } else {

      res.status(401).json(info);
    }
  })(req, res);

};

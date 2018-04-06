var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }

      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }

      return done(null, user);
    });
  }

));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.loadOne({ _id: id }).then(function(user) {
        done(null, user);
    }).catch(function(err) {
        done(err, null);
    });
  });

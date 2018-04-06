var express = require('express'),
  app = express(),
  cors = require('cors'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./app/models/apiModel'),
  User = require('./app/models/users'),
  bodyParser = require('body-parser');
  var session = require('express-session');
  var path = require('path');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var passport = require('passport');


require('./app/models/db');

require('./app/config/passport');

  mongoose.Promise = global.Promise;
//  mongoose.connect('mongodb://localhost/music');

  app.use(session({
      key: '_id',
      secret: 'somerandonstuffs',
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 600000*6
      }
  }));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use(express.static(path.join(__dirname, 'views')));

var routes = require('./app/routes/routes');
routes(app);

app.use(passport.initialize());
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);

    res.json({"message" : err.name + ": " + err.message});
  }
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port);
app.set('view engine', 'pug');

console.log('server started on: ' + port);

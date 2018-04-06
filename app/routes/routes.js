'use strict'
module.exports=function(app){
  var nodeapi=require('../controllers/apiController');
  var jwt = require('express-jwt');
  var session = require('express-session');
var cookieParser = require('cookie-parser');
  var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
  });

  var ctrlProfile = require('../controllers/auth');
  var ctrlAuth = require('../controllers/authentication');




  app.route('/api')
  .get(nodeapi.list_all)
  .post(nodeapi.create);

  app.route('/api/:taskId')
  .get(nodeapi.read)
  .put(nodeapi.update)
  .delete(nodeapi.delete);

  app.route('/api/artist/:author')
  .get(nodeapi.get_artist);


    app.route('/api/song/:song')
    .get(nodeapi.get_song);

app.route('/auth')
.get(ctrlProfile.profileRead);

var sessionChecker = (req, res, next) => {
    if (req.session.user || req.cookies._id) {
        res.redirect('/');
    } else {
        next();
    }
};

    app.route('/login')
       .get(sessionChecker,function (req,res,next) {

           res.render('pug/login');
      })
      .post(ctrlAuth.login,sessionChecker,function (req,res,next) {

          res.render('pug/login');

      });

      app.route('/register')
      .get(function (req,res) {
        res.render('pug/register')
      })
        .post(ctrlAuth.register,sessionChecker,function (req,res,next) {

        });

        app.route('/')
        .get(function (req, res,next) {

          if (req.session.user || req.cookies._id) {

            res.render('pug/index')
          }
          else {
            res.render('pug/login');
          }

        })

        app.route('/checkout')
        .get(function (req, res,next) {

            res.render('pug/checkout')


        })

        .post(function (req, res) {
          res.render('pug/index')
        })

        app.route('/logout')
        .get(function (req,res,next) {
          if (req.session.user || req.cookies._id) {
            res.clearCookie('_id');
             res.redirect('/');
           } else {
     res.redirect('/login');
    }
        })

        app.route('/data')
        .get(function(req,res,next) {
            if (req.session.user || req.cookies._id) {
              res.render('pug/data');
            }
            else {
              res.redirect('/login')
            }
        })

};

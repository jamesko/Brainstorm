'use strict';

var User = require('../db.js').User;
var passport = require('passport');
var session = require('express-session');

module.exports = function(app) {
  app.use(session({
    secret: 'hackReactorStudentsAreAwesome',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    User.findOne({username: username}, function(err, user) {
      if (user) {
        done(null, user);
      } else {
        done(err, false);
      }
    });
  });


  app.get('/auth', passport.authenticate('github'));
  app.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      console.log('req.session.passport.user: ', req.user.socialData.name);
       res.cookie('user', req.user);
      res.redirect('/');
    });


  var GitHubStrategy = require('passport-github').Strategy;
  passport.use(new GitHubStrategy({
      clientID: '19e10f18979367efa3df',
      clientSecret: '38d0670cabad59d8d87948060e832d666828d88d',
      callbackURL: 'http://localhost:3000/auth/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({username: profile.username}, function(err, user) {
        if(err) {
          console.log(err);
        }

        if (!user) {
          user = new User({ username: profile.username, socialData: profile._json });
          user.save();
        }
        done(null, user);
      });
    }
  ));
};

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
      console.log('req.session.passport.user: ', req.user);
      res.redirect('/');
    });


  var GitHubStrategy = require('passport-github').Strategy;
  passport.use(new GitHubStrategy({
      clientID: 'c89845e3280771d24f9d',
      clientSecret: 'f85688ce214114d86cef84c232575c413ef51685',
      callbackURL: 'http://agile-reaches-5003.herokuapp.com/auth/callback'
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

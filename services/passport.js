const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//one arg means to fetch, two arg means to load something into it
const User = mongoose.model('users');

//we need to define the serializeUser to embed the userID in the cookie
passport.serializeUser((user, done) => {
  // user.id is referring to the userid in mongodb
  // cuz everyone will have a userid, not googleid
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //findone finds the first record that meets that criteria
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we alrdy have a record with the given profile id
          done(null, existingUser); //null means no error
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

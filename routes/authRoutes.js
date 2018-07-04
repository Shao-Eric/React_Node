const passport = require('passport');

module.exports = app => {
  //GoogleStrategy identifies itself as google
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // logout is a func appended by the passport to kill this cookie to log user out
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  //flow:
  //  1. request comes in
  //  2. request sent to route handler
  //  3. cookie session extracts cookie data
  //  4. passport pulls users id out of cookie data
  //  5. deserialize func turns user id into a users
  //  6. user model instance added to req obj as req.user
  app.get('/api/current_user', (req, res) => {
    //res.send(req.session);
    res.send(req.user);
  });
};

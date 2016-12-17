const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {
  passport.use(new LocalPassport({
    usernameField: 'username',
    passwordField: 'passord'
  },
  (username, password, done) => {
    User.findOne({username: username})
      .then(user => {
        if (!user) return done(null, false)
        if(!user.authenticate(passport)) return done(null, false)
        return done(null, user)
      })
  }))

  passport.serializeUser((user, done) => {
    if (user) return done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .catch(console.log)
      .then(user => {
        if (!user) return done(null, false);
        return done(null, user);
      })
  })
}
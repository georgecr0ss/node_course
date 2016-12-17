let express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app,config) => {
  app.set('view engine', 'pug');
  app.set('views', config.rootPath + 'server/views');

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extend: true}))
  app.use(session({
      secret: 'first_blog-66',
      resave: true,
      saveUnitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if(req.user) {
      res.locals.currentUser = req.user;
    }
    next();
  })
  app.use(express.static(config.rootPath + 'public'))


  console.log('Express ready');
}

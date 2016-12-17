let controllers = require('../controllers');
let auth = require('../config/auth');

module.exports = (app) => {
  app.get('/', controllers.home.index);
  
  app.get('/about', controllers.home.about);

  app.get('/users/register', controllers.users.register);

  app.post('/users/create', controllers.users.createUser);

  app.get('/users/login', controllers.users.login);

  app.post('/users/authenticate', controllers.users.authenticate);

  app.get('/articles/create', controllers.articles.create);
  
  app.post('/articles/save', controllers.articles.save);

  app.post('/users/logout', controllers.users.logout);

  app.all('*', (req, res) => { 
    res.render('error');
  });
};
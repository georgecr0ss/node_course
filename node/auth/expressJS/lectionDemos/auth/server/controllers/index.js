let homeController = require('./homeController');
let usersController = require('./usersController');
let articleController = require('./articlesController');

module.exports = {
  home: homeController,
  users: usersController,
  articles: articleController
}
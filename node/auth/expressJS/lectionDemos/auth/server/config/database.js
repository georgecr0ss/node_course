let mongoose = require('mongoose');
let createAdmin = require('../data/User').seedAdminUser;
mongoose.Promise = global.Promise;

module.exports = (config) => {
  mongoose.connect(config.db)
    .then(() => {
      console.log('connected to blog DB');
    });

  let db = mongoose.connection;

  db.once('open', (err) => {
    if(err)
      console.log(err);
    createAdmin();
    console.log('mongoDB ready');
  });

  db.on('error', err => console.log('Database error:' + err));
}

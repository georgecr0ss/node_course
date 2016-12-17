const path = require('path');

let rootFolder = path.normalize(path.join(__dirname, '../../')); 

module.exports = {
  development: {
    rootPath: rootFolder,
    db: 'mongodb://gogo:66@ds163417.mlab.com:63417/blog',
    port: 3000,
    host: 'gl'
  },
  production : {
    rootPath: rootFolder,
    db: process.env.MONGO_DB_CONN_STRING,
    port: process.env.port
  }
};
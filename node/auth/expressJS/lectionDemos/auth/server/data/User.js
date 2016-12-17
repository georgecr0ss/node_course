const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

let validationMessage = '{PATH} is required';
let userSchema = mongoose.Schema({
  username: { type: String, required: validationMessage, unique: true},
  firstName: { type: String, required: validationMessage },
  lastName: { type: String, required: validationMessage },
  salt: String,
  hashedPass: String,
  roles: [String]
});

userSchema.method({
  authenticate: function (password) {
    console.log(this.salt, this.hashedPass);
    let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);
    if(inputHashedPassword === this.hashedPass) {
      return true;
    } else {
      return false;
    }
  }
})

let User = mongoose.model('User', userSchema);

module.exports.User = User;

module.exports.seedAdminUser = () => {
  User.find()
    .then(users => { 
      if(users.length === 0) {  
        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, 'Admin66');
        
        User.create({
          username: 'Admin',
          firstName: 'Admin',
          lastName: 'Admin',
          salt: salt,
          hashedPass: hashedPass,
          roles: ['Admin']
        }) 
      }
    })

    // User.find({})
    // .then(console.log)
};
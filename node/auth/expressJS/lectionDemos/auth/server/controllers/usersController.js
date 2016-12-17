let encryption = require('../utilities/encryption');
let User = require('../data/User').User;

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  createUser: (req, res) => {
    let user = req.body;
    console.log(encryption)
  if (user.password !== user.confirmPassword) {

    } else  {      
      user.salt = encryption.generateSalt();
      user.hashedPass = encryption.generateHashedPassword(user.salt, user.password);

      User.create({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        salt: user.salt,
        hashedPass: user.hashedPass
      })
      .catch(err => console.log(err))
      .then(user => {
        req.logIn(user, (err, user) => {
          if(err){
            res.render('user/register',{globalError: 'Oooops something went wrong 500'})
            return  
          }    
          res.redirect('/') 
        }, (err) => console.log(err))
      })   
    } 
  }, 
  login: (req, res) => {
    res.render('users/login');
  },
  authenticate: (req, res) => {
    let inputUser = req.body;
    
    User.findOne({username: inputUser.username})
      .then(user => {
        if (!user.authenticate(inputUser.password)) {
          res.render('users/login', { globalError: 'Wrong password' })
        } else {
          req.logIn(user, (err, user) => {
            if(err){
              res.render('user/login',{globalError: 'Oooops something went wrong 500'})
              return  
            }    
            res.redirect('/') 
          });
      }
    })
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  } 
}
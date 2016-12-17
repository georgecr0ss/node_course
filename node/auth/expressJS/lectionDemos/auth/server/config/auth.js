module.exports = { 
  isAuthenticated: (req, res) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/users/login');
    }
  },
  isInRole: (role) => {
    if(req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
      next();
    } else {
      res.redirect('/iser/login');
    }
  }
}
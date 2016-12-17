let Article = require('../data/Article');

module.exports = {
  create: (req, res) => {
    res.render('articles/create')
    console.log(res.locals.currentUser._id)
  },
  save: (req, res) => {
     let dateNow = () => {
      let date = new Date();
      let thisDate = date.getHours() + ' : ' + date.getMinutes(); 
      return thisDate;
    }

    let input = req.body;
    Article.create({
      title: input.title,
      text: input.text,
      timestamp: Date.now(),
      date: Date.now
    })
    .catch(res.render('articles/create'))
    .then(console.log)
  }
}
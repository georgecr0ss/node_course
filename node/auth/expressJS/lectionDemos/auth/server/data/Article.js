const mongoose = require('mongoose');

let articlesSchema = mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  timestamp: String,
  date: Date
})

articlesSchema.metho = {
  dateNow: () => {
    let date = new Date();
    let thisDate = date.getHours() + ' : ' + date.getMinutes(); 
    return thisDate;
  }
}

module.exports = mongoose.model('Article', articlesSchema);

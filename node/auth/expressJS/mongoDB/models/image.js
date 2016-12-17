let mongoose = require('mongoose')

let imageSchema = new mongoose.Schema({
  url: String,
  date: { type: Date, default: Date.now },
  description: String,
  tags: [String]
})
module.exports = mongoose.model('images', imageSchema)


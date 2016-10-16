let mongoose = require('mongoose')
mongoose.Promise = global.Promise
// let connection = 'mongodb://localhost:27017/images'
let Image = require('./models/image')
// mongoose
//     .connect(connection)
//     .then(() => {
//       console.log('Connection accomplished')
//     })


function isSaved (data) {
  console.log('data has been saved')
}
let crud = {}
crud.saveImage = (obj) => {
  new Image({
    url: obj.url,
    date: Date.now(),
    description: obj.description,
    tags: obj.tags
  })
  .save()
  .then(console.log)
}

crud.find = () => {
  Image
    .find()
    // .toArray()
    .then(console.log)
}
module.exports = crud

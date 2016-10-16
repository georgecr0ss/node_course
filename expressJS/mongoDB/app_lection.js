let mongoose = require('mongoose')
mongoose.Promise = global.Promise
let connection = 'mongodb://localhost:27017/cats'
let db = require('instantnode-db')
let CatSchema = new mongoose.Schema({
  name: String,
  age: Number
})

CatSchema.methods.sayHello = () => {
  console.log('Mqu')
}
CatSchema.virtual('introduction').get(function () {
  return this.someValue
})
CatSchema.virtual('introduction').set(function (value) {
  this.someValue = value
})
let Cat = mongoose.model('Article', CatSchema)
mongoose
    .connect(connection)
    .then(() => {
      Cat
        .find({
            name: 'Pesho'
        })
        .then(console.log)
    })

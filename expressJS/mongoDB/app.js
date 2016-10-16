let mongoose = require('mongoose')
mongoose.Promise = global.Promise
let connection = 'mongodb://localhost:27017/images'
let db = require('./instantnode-db')

mongoose
    .connect(connection)
    .then(() => {
      console.log('Connected to the images db')
    })
let image = {
  url: 'http://www.topcarrating.com/mercedes-benz/1954-mercedes-benz-300-sl-gullwing-6.jpg',
  date: Date.now(),
  description: 'Engineering master pice',
  tags: ['super cars', 'lambo', 'lamborghini']
}
// db.saveImage(image)
db.find()

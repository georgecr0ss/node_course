let fs = require('fs')

fs.readFile('index.js', (err, data) => {
    if(err) throw err
    console.log(data)
})
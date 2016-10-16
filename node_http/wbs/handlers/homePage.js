let fs = require('fs')
let url = require('url')

module.exports = (req, res) => {
  req.pathName = req.pathname || url.parse(req.url).pathname
  // console.log(req.cars)
  if (req.pathName === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) throw err

      res.writeHead(200, {
        'Type-Content': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}

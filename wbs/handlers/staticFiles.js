let fs = require('fs')
let url = require('url')

function getContentType (url) {
  switch (true) {
    case url.endsWith('.js'):
      return 'application/javascript'
    case url.endsWith('.jpg'):
      return 'image/jpeg'
    case url.endsWith('.html'):
      return 'text/html'
    case url.endsWith('.css'):
      return 'text/css'
  }
}

module.exports = (req, res) => {
  req.pathName = req.pathname ||
      url.parse(req.url).pathname
  if (req.pathName.includes('content')) {
    fs.readFile('.' + req.pathName, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        })
        res.write('Error')
        res.end()
        return true
      }
      res.writeHead(200, {
        'Content-Type': getContentType(req.pathName)
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}

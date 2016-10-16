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
  req.pathname = req.pathname ||
    url.parse(req.url).pathname
  let isPathPublic = req.pathname.includes('content') ||
    req.pathname.includes('images')
  if (isPathPublic) {
    fs.readFile('.' + req.pathname, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.write('404 not found')
        res.end()
        return true
      }
      res.writeHead(200, {
        'Type-Content': getContentType(req.pathname)
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}

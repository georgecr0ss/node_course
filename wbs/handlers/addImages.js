// let fs = require('fs')
let url = require('url')
let qs = require('querystring')
let menu = require('./menu')
let formData = []
let createImage = (req, res) => {
  req.pathName = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathName === '/images/add') {
    if (req.method === 'POST') {
      let body = []
      let chunks = ''
      req.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        chunks = Buffer.concat(body).toString()
        formData.push(qs.parse(chunks))
      })
      res.writeHead(302, {
        'Location': '/images/add'
      })
      res.write('POST METHOD')
      res.end()
    } else {
      let html = render(formData)
      res.writeHead(200, {
        'Type-Content': 'text/html'
      })
      res.write(html)
      res.end()
    }
  } else {
    return true
  }
}

module.exports = {
  createImage: createImage,
  cars: formData
}

function render (array) {
  let html = `
               ${menu}
               <form action="/images/add" method="POST">
                <input type="text" name="name">
                <br/>
                <input type="text" name="imageUrl">
                <br/>
                <input type="submit" value="Save image">
               </form>
            </body>
            </html>`

  return html
}

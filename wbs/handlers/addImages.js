// let fs = require('fs')
let url = require('url')
let qs = require('querystring')
let menu = require('./menu')
let formData = []
let areSavedImages = false
let jsonModel = {
  name: '',
  imageUrl: '',
  comments: []
}
let createImage = (req, res) => {
  req.pathName = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathName === '/images/add') {
    if (req.method === 'POST') {
      let body = []
      let chunks = ''
      areSavedImages = true
      req.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        chunks = Buffer.concat(body).toString()
        let parsedChunk =  qs.parse(chunks)
        jsonModel.name = parsedChunk.name
        jsonModel.imageUrl = parsedChunk.imageUrl
        formData.push(jsonModel)
      })
      res.writeHead(302, {
        'Location': '/images/add'
      })
      res.write('POST METHOD')
      res.end()
    } else if (req.method === 'GET') {
      let html = render(formData, areSavedImages)
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

function render (array, isTrue) {
  let hasBeenSaved = isTrue ? `<p id="addInfo">image has been saved</p>` : ``
  let html = `${menu}
               <form action="/images/add" method="POST">
                <input type="text" name="name">
                <br/>
                <input type="text" name="imageUrl">
                <br/>
                <input type="submit" value="Save image">
               </form>` +
                hasBeenSaved +
            `</body>
            </html>`
  areSavedImages = false
  return html
}

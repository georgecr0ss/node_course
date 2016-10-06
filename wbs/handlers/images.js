let fs = require('fs')
let url = require('url')
let qs = require('querystring')
let formData = {}
let counter = 0
module.exports = (req, res) => {
  req.pathName = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathName === '/addImages') {
    if (req.method === 'POST') {
      let body = []
      let chunks = ''
      req.on('data', (chunk) => {
        // console.log(chunk)
        body.push(chunk)
      }).on('end', () => {
        chunks = Buffer.concat(body).toString()
        // console.log(chunks)
        formData[counter] = (qs.parse(chunks))
        counter += 1
      })
      res.writeHead(302, {
        'Location': '/addImages'
      })
      res.write('POST METHOD')
      res.end()
    } else {
      let html = render(formData)
      res.writeHead(200)
      res.write(html)
      res.end()
    }
  } else {
    return true
  }
}

function render (array) {
  let images = ''
  for (let data in array) {
    // console.log(data)
    images += `<p style="border: 1px solid #1e1e1e; width: 400px;">
                  <span style="background-color: #ffff00; width: 100%;">
                    <strong>
                      ${array[data].name}
                    </strong>
                  </span> <br/>
                  <a href="/details/${0}">
                      <img
                        src=${array[data].imageUrl}
                        alt=${array[data].name}
                        width=400
                        height=auto />
                    </a>
                </p>`
  }
  let html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
               <form action="/addImages" method="POST">
                <input type="text" name="name">
                <br/>
                <input type="text" name="imageUrl">
                <br/>
                <input type="submit" value="Save image">
               </form>
               ${images}
            </body>
            </html>`

  return html
}

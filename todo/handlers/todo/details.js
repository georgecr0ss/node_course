let url = require('url')
let allTODOs = require('./create').todo
let html = require('../menu')

module.exports = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname

  let splitUrl = req.pathname.split('/')
  let currEl = allTODOs[splitUrl[splitUrl.length - 1]]
  console.log(currEl)
  if (req.pathname === `/details/${splitUrl[splitUrl.length - 1]}`) {
    let fullHtml = render(currEl)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(fullHtml)
    res.end()
  } else {
    return true
  }
}

function render (el) {
  let detailsHtml = html
  detailsHtml += `<div style=" width: 400px;">
                  <h2 style="background-color: #ffff00; width: 100%;">
                      ${el.title}
                  </h2>
                  <span>status:${el.status}</span>
                    <h3>
                      Description:<h4> ${el.description} </h4>
                    </h3>
                </div>
            </body>
            </html>`
  return detailsHtml
}

let url = require('url')
let allTODOs = require('./create').todo
let html = require('../menu')
console.log(allTODOs)
module.exports = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathname === '/all') {
    let fullHtml = render(allTODOs)
    // console.log(fullHtml)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(fullHtml)
    res.end()
  } else {
    return true
  }
}

function render (todo) {
  console.log(html)
  let todoArray = todo
  let todosHtml = html
  for (let todo in todoArray) {
    todosHtml += `<div style="border: 1px solid #1e1e1e; width: 400px;">
                  <h2 style="background-color: #ffff00; width: 100%;">
                    <a href="/details/${todo}">
                      ${todoArray[todo].title}
                  </a>
                  </h2>
                  <span>status:${todoArray[todo].status}</span>
                    <h3>
                      Description:<h4> ${todoArray[todo].description} </h4>
                    </h3>
                </div>`
  }
  todosHtml += `</body>
            </html>`
  return todosHtml
}

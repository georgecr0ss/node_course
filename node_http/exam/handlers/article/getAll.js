let url = require('url')
let articlesArray = require('./create').articlesArray
let html = require('../menu')
module.exports = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathname === '/all') {
    let fullHtml = render(articlesArray)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(fullHtml)
    res.end()
  } else {
    return true
  }
}

function render (array) {
  let arrayOfArticles = array
  let articlesHtml = html
  for (let article in arrayOfArticles.created) {
    if (!arrayOfArticles.created[article].deleted) {
      articlesHtml += `<div style="border: 1px solid #1e1e1e; width: 400px;">
                   <a href="/details/${article}">
                    <h2 style="background-color: #ffff00; width: 100%;">
                      ${arrayOfArticles.created[article].title}
                    </h2>
                   </a>
                  <span>Created on:${arrayOfArticles.created[article].date.currDate}</span><br/>
                  <span>At:${arrayOfArticles.created[article].date.currTime}</span><br/>
                  <h3>
                    Description:${arrayOfArticles.created[article].description}
                  </h3>
                </div>`
   }
  }
  articlesHtml += `</body>
            </html>`
  return articlesHtml
}

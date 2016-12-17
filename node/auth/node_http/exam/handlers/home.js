let url = require('url')
let fs = require('fs')
let articlesArray = require('./article/create').articlesArray.created
function dynamicHtml (homePage, articlesArray) {
  let slplittedHomeHtml = homePage.split('</body>')
  let articlesHtml = slplittedHomeHtml[0] + '<h2>Last six added articles</h2>'
  let limit = articlesArray.length < 5 ? (articlesArray.length - 1) : 5
  for (let article = 0; article <= limit; article += 1) {
    if (!articlesArray[article].deleted) {
      articlesHtml += `<div style="border: 1px solid #1e1e1e; width: 400px;">
                      <a href="/details/${article}">
                        <h2 style="background-color: #ffff00; width: 100%;">
                          ${articlesArray[article].title}
                        </h2>
                      </a>
                      <span>Created on:${articlesArray[article].date.currDate}</span><br/>
                      <span>At:${articlesArray[article].date.currTime}</span><br/>
                        <h3>
                        Description: ${articlesArray[article].description}
                      </h3>
                    </div>`
    }
  }
  articlesHtml += `</body>
            </html>`

  return articlesHtml
}

module.exports = (req, res) => {
  req.pathname = req.pathname ||
      url.parse(req.url).pathname
  if (req.pathname === '/') {
    fs.readFile('./index.html', 'utf-8', (err, data) => {
      if (err) throw err
      let homePage = data
      if (articlesArray.length !== 0) {
        homePage = dynamicHtml(data, articlesArray)
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(homePage)
      res.end()
    })
  } else {
    return true
  }
}


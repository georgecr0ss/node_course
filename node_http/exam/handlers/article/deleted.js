let url = require('url')
let articlesArray = require('./create').articlesArray
let html = require('../menu')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  let splitedUrl = req.pathname.split('/')
  let elIndex = splitedUrl[2]
  let currElement = articlesArray.created[elIndex]
  if (req.pathname === `/details/${elIndex}/delete`) {
    currElement.deleted = !currElement.deleted ? true : false
    res.writeHead(302, {
      'Location': '/deleted'
    })
    res.end()
  } else if (req.pathname === '/deleted') {
    let deletedAricles = render(articlesArray)
    res.writeHead(200, {
      'Type-Content': 'text/html'
    })
    res.write(deletedAricles)
    res.end()
  } else {
    return true
  }
}

function render (array) {
  let arrayOfArticles = array
  let articlesHtml = html + '<h1>Deleted Articles</h1>'
  for (let article in arrayOfArticles.created) {
    if (arrayOfArticles.created[article].deleted) {
      let urlDelte = '/details/' + article + '/delete'
      let deletedTitle = '<span class="deleted"><strong>The Article has been deteled</strong></span>'
      articlesHtml += `<div style="border: 1px solid #1e1e1e; width: 400px; background-color: grey;">
                      <h2 style="background-color:red; width: 100%;">
                      <a href="/details/${article}">
                        ${arrayOfArticles.created[article].title}
                        ${deletedTitle}
                    </h2>
                    <span>Created on:${arrayOfArticles.created[article].date.currDate}</span><br/>
                    <span>At:${arrayOfArticles.created[article].date.currTime}</span><br/>
                    <h3>
                      Description:<h4> ${arrayOfArticles.created[article].description} </h4>
                    </h3>
                  <form action="${urlDelte}" method="POST">
                   <input type="submit" value="Undelete article" />
                  </form>
                  </div>`
    }
  }
  articlesHtml += `</body>
            </html>`
  return articlesHtml
}

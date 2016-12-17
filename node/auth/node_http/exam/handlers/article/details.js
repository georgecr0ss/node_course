let url = require('url')
let articlesArray = require('./create').articlesArray.created
let html = require('../menu')
module.exports = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname

  let splitUrl = req.pathname.split('/')
  let index = splitUrl[splitUrl.length - 1]
  let currElement = articlesArray[index]
  let urlPath = `/details/${splitUrl[splitUrl.length - 1]}`
  if (req.pathname === urlPath) {
    if (req.method === 'GET') {
      if (currElement === undefined) {
        res.writeHead(301, {
          'Location': '/'
        })
        res.end()
      } else {
        let fullHtml = render(currElement, urlPath)
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(fullHtml)
        res.end()
      }
    }
  } else {
    return true
  }
}

function render (el, urlPath) {
  let commentUrlPath = urlPath + '/comment'
  let detailsHtml = html
  let comments = ''
  let deleteUrlPath = urlPath + '/delete'
  for (let comment of el.comments) {
    comments += `<p><strong>${comment.user}</strong>:${comment.comment}</p>`
  }
  let isDeleted = el.deleted ? 'grey' : 'white'
  let titleColor = el.deleted ? 'red' : 'yellow'
  let buttonAction = el.deleted ? 'Undelete the article' : 'Delete the Acrticle'
  let deletedTitle = el.deleted ? '<span class="deleted"><strong>The Article has been deteled</strong></span>' : ''
  detailsHtml += `<div style="width: 400px; background-color: ${isDeleted};">
                  <h2 style="background-color: ${titleColor}; width: 100%;">
                      ${el.title} ${deletedTitle}
                  </h2>
                  <span>Created on:${el.date.currDate}</span><br/>
                  <span>At:${el.date.currTime}</span><br/>
                  <h3>
                    Description:${el.description}
                  </h3>
                  <img src="${el.image.url}" alt="${el.image.alt}" />
                  <form action="${deleteUrlPath}" method="POST">
                   <input type="submit" value="${buttonAction}" />
                  </form>
                  <form action="${commentUrlPath} " method="POST">
                    <input type="text" name="user" placeholder="Enter your username"/>
                    <input type="text" name="comment" placeholder="Enter a comment"/>
                    <input type="submit" value="post" />
                  </form>
                    ${comments}
                </div>
            </body>
            </html>`
  return detailsHtml
}

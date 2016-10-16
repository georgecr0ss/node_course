let url = require('url')
let allTODOs = require('./create').todo
let html = require('../menu')
module.exports = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname

  let splitUrl = req.pathname.split('/')
  let currElement = allTODOs[splitUrl[splitUrl.length - 1]]
  let urlPath = `/details/${splitUrl[splitUrl.length - 1]}`
  if (req.pathname === urlPath) {
    let fullHtml = render(currElement, urlPath)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(fullHtml)
    res.end()
  } else {
    return true
  }
}

function render (el, urlPath) {
  console.log(el)
  let commentUrlPath = urlPath + '/comment'
  let detailsHtml = html
  let comments = ''
  for (let comment of el.comments) {
    comments += `<p>${comment.comment}</p>`
  }
  detailsHtml += `<div style=" width: 400px;">
                  <h2 style="background-color: #ffff00; width: 100%;">
                      ${el.title}
                  </h2>
                  <span>status:${el.status}</span>
                    <h3>
                      Description:<h4> ${el.description} </h4>
                    </h3>
                    <img src="${el.image.url}" alt="${el.image.alt}"/>
                    <form action="${commentUrlPath} " method="POST">
                      <input type="text" name="comment" placeholder="Enter a comment"/>
                      <input type="submit" value="post" />
                    </form>
                    ${comments}
                </div>
            </body>
            </html>`
  return detailsHtml
}

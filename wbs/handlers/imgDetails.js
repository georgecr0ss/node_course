let url = require('url')
let addedImages = require('./addImages').cars
let menu = require('./menu')
let qs = require('querystring')
module.exports = (req, res) => {
  req.pathName = req.pathname ||
    url.parse(req.url).pathname
  let splittedUrl = req.pathName.split('/')
  let index = splittedUrl[3]
  let currImage = addedImages[index]
  let path = '/images/details/' + index
  if (req.pathName === path) {
    let htmlPice = getHtml(menu, currImage, path, getCommentsAsHtml)

    res.writeHead(200)
    res.write(htmlPice)
    res.end()
  } else if (req.pathName === (path + '/comment')) {
    if (req.method === 'POST') {
      let currComment = {
        id: '',
        comment: ''
      }
      let body = []
      let chunks = ''
      req.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        chunks = Buffer.concat(body).toString()
        let parsed = qs.parse(chunks)
        currComment.id = Date.now()
        currComment.comment = parsed.comment
        currImage.comments.unshift(currComment)
      })
      res.writeHead(302, {
        'Location': path
      })
      res.write('working')
      res.end()
    }
  } else {
    return true
  }
}

function getHtml (menu, car, path, getCommentsAsHtml) {
  let comments = car.comments.length !== 0 ? getCommentsAsHtml(car.comments) : ''
  // console.log(comments)
  let htmlTop = menu
  let carDetails = car
  let actionUrl = path + '/comment'
  let html = `${htmlTop}
                <h2>${carDetails.name} s details page</h2>
                  <p style="width: 400px;">
                    <span style="background-color: #ffff00; width: 100%;">
                      <strong>
                      </strong>
                    </span> <br/>
                    <img
                      src=${carDetails.imageUrl}
                      alt=${carDetails.name}
                      width=400
                      height=auto />
                  </p>
               <form action="${actionUrl}" method="POST">
                <input type="textarea" name="comment">
                <input type="submit" value="Post comment">
               </form>
               ${comments}
            </body>
            </html>`
  return html
}

function getCommentsAsHtml(comments) {
  let commentsAsHtml = ''
  for (let comment in comments) {
    commentsAsHtml += `<p>${comments[comment].comment}</p>`
  }

  return commentsAsHtml
}


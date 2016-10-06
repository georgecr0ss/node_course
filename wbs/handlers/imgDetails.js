let url = require('url')
let addedImages = require('./addImages').cars

module.exports = (req, res) => {
  req.pathName = req.pathname ||
    url.parse(req.url).pathname
  // console.log(req.pathName)
  let splittedUrl = req.pathName.split('/')
  let index = splittedUrl[3]
  let currImage = addedImages[index]
  let path = '/images/details/' + index
  if (req.pathName === path) {
    let htmlPice = `<p style="border: 1px solid #1e1e1e; width: 400px;">
                    <span style="background-color: #ffff00; width: 100%;">
                      <strong>
                        ${currImage.name}
                      </strong>
                    </span> <br/>
                    <a href="/images/details/${0}">
                        <img
                          src=${currImage.imageUrl}
                          alt=${currImage.name}
                          width=400
                          height=auto />
                      </a>
                  </p>`
    if (req.pathName === path) {
      res.writeHead(200)
      res.write(htmlPice)
      res.end()
    }
  } else {
    return true
  }
}

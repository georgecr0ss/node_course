let url = require('url')
let addedImages = require('./addImages').cars
let menu = require('./menu')

module.exports = (req, res) => {
  req.pathName = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathName === '/images/all') {
    let allImages = render(addedImages)
    console.log(allImages)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(allImages)
    res.end()
  } else {
    return true
  }
}

function render (array) {
  let carsArray = array
  let cars = ''
  for (let car in array) {
    cars += `${menu}<p style="border: 1px solid #1e1e1e; width: 400px;">
                  <span style="background-color: #ffff00; width: 100%;">
                    <strong>
                      ${carsArray[car].name}
                    </strong>
                  </span> <br/>
                  <a href="/images/details/${car}">
                      <img
                        src=${carsArray[car].imageUrl}
                        alt=${carsArray[car].name}
                        width=400
                        height=auto />
                    </a>
                </p>
            </body>
            </html>`
  }
  return cars
}

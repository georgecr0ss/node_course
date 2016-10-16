let url = require('url')
let zlib = require('zlib')
let fs = require('fs')
let multiparty = require('multiparty')
let menu = require('../menu')
let allTODOs = []
let counter = 0
let gzip = zlib.createGzip()

let wasSaveTodo = false
// function addTODO (data) {
// }
let createTODO = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathname === '/create') {
    if (req.method === 'POST') {
      let todoModel = {
        title: '',
        description: '',
        status: 'pending',
        comments: [],
        image: {
          url: '',
          alt: ''
        }
      }
      let form = new multiparty.Form()
      form.parse(req)
      form.on('part', (part) => {
        if (part.filename) {
          let url = '/content/' + part.filename + '.gz'
          let imageWrite = fs.createWriteStream('./content/' + part.filename + '.gz')
          todoModel.image.url = url
          todoModel.image.alt = part.filename
          part.on('data', data => { imageWrite.write(data) })
          part.on('end', () => {
            gzip.pipe(imageWrite)
            allTODOs.push(todoModel)
            console.log(allTODOs)
            counter += 1
            imageWrite.end(() => {
              res.writeHead(302, {
                'Location': '/create'
              })
              res.write('Hello')
              res.end()
            })
          })
          part.resume()
        } else {
          let result = ''
          part.on('data', (chunk) => {
            console.log(chunk)
            result += chunk
          })
          part.on('end', (chunk) => {
            todoModel[part.name] = result
            console.log(part.name)
            console.log(result)
          })
          // part.resume()
        }
      })
    } else if (req.method === 'GET') {
      let html = render(wasSaveTodo)
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(html)
      res.end()
    }
  } else {
    return true
  }
}

module.exports = {
  createTodo: createTODO,
  todo: allTODOs
}

function render (isTrue) {
  let hasBeenSaved = isTrue ? `<p id="addInfo">TODO has been saved</p>` : ``
  let html = `${menu}
                <h2>Add TODO's</h2>
                <h4>All TODO's will be with status PENDING</h4>
               <form action="/create" method="POST" enctype="multipart/form-data">
                <input type="text" name="title" placeholder="Enter your title here" required>
                <br/>
                <input type="text" name="description" placeholder="description" required>
                <br/>
                <input type="file" name="file">
                <br/>
                <input type="submit" value="Save TODO">
               </form>` +
                hasBeenSaved +
            `</body>
            </html>`
  wasSaveTodo = false
  return html
}

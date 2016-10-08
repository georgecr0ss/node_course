let url = require('url')
let qs = require('querystring')
let allTODOs = []
let menu = require('../menu')
let wasSaveTodo = false

let createTODO = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathname === '/create') {
    if (req.method === 'POST') {
      let pice = ''
      req.on('data', (data) => { pice += data })
      req.on('end', () => {
        let parsedPice = qs.parse(pice)
        let newTODO = {
          title: parsedPice.title,
          description: parsedPice.description,
          status: 'pending',
          comments: []
        }
        allTODOs.push(newTODO)
      })
      wasSaveTodo = true
      res.writeHead(302, {
        'Location': '/create'
      })
      res.write('Woring fine')
      res.end()
    } else if (req.method === 'GET') {
      console.log(allTODOs)
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
               <form action="/create" method="POST">
                <input type="text" name="title" placeholder="Enter your title here" required>
                <br/>
                <input type="text" name="description" placeholder="description" required>
                <br/>
                <input type="submit" value="Save TODO">
               </form>` +
                hasBeenSaved +
            `</body>
            </html>`
  wasSaveTodo = false
  return html
}

let http = require('http')
let port = 4400
let handlers = require('./handlers/index')
http
    .createServer((req, res) => {
      for (let handler of handlers) {
        let next = handler(req, res)
        if (!next) {
          break
        }
      }
    }).listen(port)

console.log(`Server running on port ${port}`)

let http = require('http')

let favicon = require('./handlers/favicon')
let home = require('./handlers/home')
let staticFile = require('./handlers/staticFile')
let image = require('./handlers/image').processRequests
let imageDetails = require('./handlers/imageDetails')


let port = 1337

http
  .createServer((req, res) => {
        var handlers = [
          favicon,
          home,
          staticFile,
          image,
          imageDetails
        ]
        for(let handler of handlers) {  
          let next = handler(req,res)
          if(!next) {
            break
          }
        }
  })
  .listen(port)

console.log(`Server listening on ${port}`)
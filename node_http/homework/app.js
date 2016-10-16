let http = require('http')
let fs = require('fs')
let PORT = 4000
let url = require('url')
let handlers = require('./handlers/index')


http
    .createServer((req, res) => {   
        for(let handler of handlers) {
            var next = handler(req, res)
            if(!next) {
                break
            }
        }
    }).listen(PORT)


console.log(`Server running on port ${PORT}`)
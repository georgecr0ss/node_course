let http = require('http')
let fs = require('fs')
let PORT = 4440
let url = require('url')
let handlers = require('./handlers/index')
let saveImg = require('./handlers/save-img')


http
    .createServer((req, res) => {   
        console.log()
        if(req.method === 'POST') {
            saveImg(req,res);
        } else {            
            for(let handler of handlers) {
                var next = handler(req, res)
                if(!next) {
                    break
                }
            }
        }

    }).listen(PORT)


console.log(`Server running on port ${PORT}`)
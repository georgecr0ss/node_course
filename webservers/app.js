let http = require('http')
let fs = require('fs')
let PORT = 4400


http 
    .createServer((req,res) => { 
        console.log(req.url)
        if(req.url === '/favicon.ico'){
            fs.readFile('./favicon.ico', (err, data) =>{
                if(err) {
                    console.log(err)
                }
                // console.log(data)
                res.writeHead(200)
                res.write(data)
                res.end()
            })
        } else if (req.url === '/') {            
            fs.readFile('./index.html', (err, data) =>{
                if(err) {
                    console.log(err)
                }
                // console.log(data)
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(data)
                res.end()
            })
        } else {
            res.writeHead(404)
            res.end()
        }
        // console.log(req.headers)
    }).listen(PORT)

console.log(`Server listening on port ${PORT}`)
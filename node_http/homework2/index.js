let fs = require('fs')
let http = require('http')
let query = require('querystring')
let multi = require('multiparty')
http.createServer((req, res) => {
        if(req.method === 'GET') {
            fs.readFile('index.html', (err, file) => {  
                if(err) throw err   
                res.writeHead(200)
                res.write(file)
                res.end()
            })  
        } else if ( req.method === "POST") {
           let form = new multi.Form()

           form.on('part', part => {
                if(part.filename) { //file
                    let body = ''
                    part.on('data', data=>{ body += data})
                    part.on('end', () => {
                        fs.writeFile(part.filename, body, err => {
                            res.writeHead(200)
                            res.write('Uploaded')
                            res.end()
                        })
                    })
                } else { //text
                    let result = ''
                    part.on('data', data => {
                      part.resume()
                    })
                }
            })
           form.parse(req)
        }
    })
    .listen(1234)


    //  let body = ""
    //         req.on('data', (data) => { body +=data})
    //         req.on('end', () => {
    //              let result = query.parse(body)
    //              console.log(result.name)
    //              res.writeHead(200)
    //              res.write(302, {
    //                  'Location': '/redirectPage' 
    //              })
    //              res.end()
    //         })
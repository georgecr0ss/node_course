let fs = require('fs')
let url = require('url')
var qs = require('querystring')

function getContentType(url) {
    let contentType = ''
    if(url.endsWith('.css')) {
        contentType = 'text/css'
    } else if (url.endsWith('.js')) {
        contentType = 'application/javascript'
    }

    return contentType
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    let extentions = [
        '.css', '.js', '.html', '.jpg'
    ] 
    let hasMatch = extentions.filter((ext) => {        
        if(req.pathname.endsWith(ext)) { 
            return true 
        } 
    })
    hasMatch = hasMatch.length != 0 ? true : false
    let folder = req.pathname.startsWith('/content') 
    let passFile  = (folder && hasMatch)
    // console.log(req.method)
    // console.log(passFile)
    // console.log(passFile && req.method === 'GET')
    if(passFile && req.method === 'GET'){
        fs.readFile('.' + req.pathname, (err, data) => {
            if(err) {
                res.writeHead(404)
                res.write('Not found 404')
                res.end()
                return true    
            } 
            let contentType = getContentType(req.pathname)

            res.writeHead(200, {
                'Content-Type' : contentType
            })
            res.write(data)
            res.end()
        })
    } else if(req.method === 'GET')  {        
        res.writeHead(404)
        res.write('You do not have premission to access the file')
        res.end()
    }
}
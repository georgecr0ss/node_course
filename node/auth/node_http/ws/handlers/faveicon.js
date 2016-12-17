let fs = require('fs')
let url = require('url')

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if(req.pathname === '/faveicon.ico') {
        fs.readFile('./faveicon.ico', (err, data) => {
            if(err) console.log(err)
            
            res.writeHead(200)
            res.write(data)
            res.end()
        })
    } else {
        return true
    }
}
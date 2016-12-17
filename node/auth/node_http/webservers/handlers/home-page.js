let fs = require('fs')
let url = require('url')

module.exports = (req, res) => {
    req.pathName = req.pathname || url.parse(req.url).pathname 

    if (req.pathName === '/') {               
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
        return true;
    }
}
let fs = require('fs')
let url = require('url') 

function getcontentType(url) {
    
        let contentType = 'text/plain'

        // console.log(pathName.startsWith('/styles'));
        if(url.endsWith('.css')){
            contentType = 'text/css'
        } else if(url.endsWith('.js')) {
            contentType = 'application/javascript'
        }

        return contentType;
}

module.exports = (req, res) => {
    req.pathName = req.pathname || url.parse(req.url).pathname 
    // let extention = 
    let extentions = [
        '.css', '.html', '.js', '.jpg' 
    ]

    let hasMatch = req.pathname.startsWith('/content').endsWith(extentions.map((data)=> {
        return data;
    }))
    console.log(hasMatch)
        // if(data) 
    let resctriction =  true
    // (req.pathname.startsWith('/content') &&  )

    if (resctriction) {        
        fs.readFile('.' + req.pathName, (err, data) => {
            if(err) {                
                res.writeHead(404) 
                res.write('not found 404')
                res.end()
                return true;
            }
            let contetntType = getcontentType(req.pathName)
            res.writeHead(200, {
                'Content-Type': contetntType
            })
            res.write(data)
            res.end()
        })
    }
}
let fs = require('fs')
let url = require('url')
let qs = require('querystring')
let imgArray = [];
module.exports = (req, res) => {    
    console.log(req.method)
    req.pathname = req.pathname || url.parse(req.url).pathname
    var formData = {}
    if(req.pathname === '/') { 
        var reqBody = ''
        req.on('data', (data) => {
            reqBody += data;
        })
        req.on('end', (data) => {
            // console.log(reqBody)
            formData = qs.parse(reqBody)
            console.log(formData)
            imgArray.push(formData);
            render(imgArray);
        })
        function render(imgArray) {            
            console.log(imgArray);
            res.writeHead(200, {
                method: 'GET'
            })
            // res.write('<html>');
            // res.write('<body>');
            // res.write('<h1>Hello, World!</h1>');    
            // res.write('<form action="/" method="POST">');
            // res.write(' Url: <input type="text" name="url" placeholder="place url here"><br>');      
            // res.write(' Name: <input type="text" name="name" placeholder="name of the picture"><br>'); 
            // res.write('<input type="submit" value="submit"/>')    
            // res.write('</form>')       
            // for(img of imgArray) {                
            //     res.write('<img src="'+img.url + '" alt="' + img.name + '" width="auto" height="200px"  style="display:block; margin:10px;" />');
            // }
            // res.write('</body>');
            // res.write('</html>');
            // res.end()
            
            fs.readFile('./index.html', (err, data) => {
                if(err) console.log(err)

                res.writeHead(200, {
                    'Content-Type' : 'text/html',
                    'data': 'sent data'
                })
                res.write(data)
                res.end( )
            })
        }
        
            // res.end()
    //   return res.redirect("localhost:4000/", 301);
    } 
}
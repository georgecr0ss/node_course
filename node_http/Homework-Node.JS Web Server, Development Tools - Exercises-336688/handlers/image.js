let fs = require('fs')
let url = require('url')
let http = require('http')
let handlebars = require('handlebars')
let imageIndex = 0
let fields = []

var exports = module.exports = {}
exports.processRequests = (req, res) => {  
  req.pathName = req.pathName || url.parse(req.url).pathname
  if(req.pathName === '/getImage.html') {
    if(req.method === 'GET') {
      displayForm(req,res, false)  
    }  
    else if (req.method === 'POST'){
      processFormFields(req,res)
    }
  } else {
    return true
  }
}
exports.getFields =  () => {
  return fields
}

function displayForm(req,res,hbsVars) {
    fs.readFile('./content/getImage.html', (err, data) => {
      if(err) console.log(err)

      let source = data.toString()
      let template = handlebars.compile(source)
      let templatedData = template(hbsVars)
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(templatedData)
      res.end()
      })
}

function processFormFields(req,res) {
  let body = []
  req.on('error', function(err) {
    console.log(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    body = body.split('&')
    
    let hasNullEmpty = false
    
    let currName = body[0].split('=')
    let currImageUrl = body[1].split('=')

    hasNullEmpty = !currName[1] || !currImageUrl[1] ? true : false
        
    let hbsVars = {
      formValue: true,
      validationFail: hasNullEmpty,
      data: []
    }
    if(hasNullEmpty) {      
      displayForm(req,res, hbsVars)
      return
    }

    let id = `/images/details/${imageIndex}`
    imageIndex++
    
    let field = {
      name: currName[1],
      imageUrls: [{
        id: id,
        imageUrl: currImageUrl[1]
      }],
    }
    
    var fieldObj = fields.find((obj) => {
      if(obj.name == field.name) {
        return obj
      }
    })
    if(fieldObj){
      fieldObj.imageUrls.push(field.imageUrls[0])
    } else {
      fields.push(field)
    }
    hbsVars.data = fields
    displayForm(req,res, hbsVars)
  })
}
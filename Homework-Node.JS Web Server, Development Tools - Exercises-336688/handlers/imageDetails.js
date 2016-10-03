let fs = require('fs')
let url = require('url')
let handlebars = require('handlebars')
let imageHandler = require('./image')

module.exports = (req, res) => {  
  req.pathName = req.pathName || url.parse(req.url).pathname
  let idPrefix = '/images/details/'
  if(req.pathName.includes(idPrefix)) {
    fs.readFile('./content/detailsPage.html', (err, data) => {
      if(err) console.log(err)
      let imageIndex = req.pathName.match(new RegExp(idPrefix + '.*'))[0]
      let image = {
          name: '',
          imageUrl: ''
      }
      for(let currField of imageHandler.getFields()) {
        let field = currField.imageUrls.find((obj) =>{
            if(obj.id === imageIndex) {
                return obj
            }
        })
        if(field) {
            image.imageUrl = field.imageUrl
            image.name = currField.name
            break;
        }
      }

      
      let source = data.toString()
      let template = handlebars.compile(source)
      let templatedData = template(image)
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(templatedData)
      res.end()
      })
  } else {
      return true;
  } 
}
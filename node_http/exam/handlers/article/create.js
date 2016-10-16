let url = require('url')
let fs = require('fs')
let multiparty = require('multiparty')
let menu = require('../menu')
let articlesArray = {
  created: [],
  deleted: []
}
let picturesArr = []
let arrInputsEmpty = false
let isSaved = false
function isDataCollect (res, counter, articleModel) {
  if (counter === 3) {
    if (articleModel.title.trim() === '' || articleModel.description.trim() === '') {
      arrInputsEmpty = true
      res.writeHead(302, {
        'Location': '/create'
      })
      res.write('Done')
      res.end()
    } else {
      isSaved = true
      articlesArray.created.unshift(articleModel)
      res.writeHead(302, {
        'Location': '/create'
      })
      res.write('Done')
      res.end()
    }
  }
}


let createArticle = (req, res) => {
  req.pathname = req.pathname ||
    url.parse(req.url).pathname
  if (req.pathname === '/create') {
    if (req.method === 'POST') {
      let counter = 0
      let fileName = ''
      let time = new Date().toLocaleTimeString()
      let date = new Date().toLocaleDateString()
      let articleModel = {
        title: '',
        description: '',
        date: {
          currDate: date,
          currTime: time
        },
        comments: [],
        image: {
          url: '',
          alt: ''
        },
        deleted: false
      }
      let form = new multiparty.Form()
      form.parse(req)
      form.on('part', (part) => {
        if (part.filename) {
          fileName = part.filename
          let areNameEqual = picturesArr.filter((data) => {
            if (data === part.filename) {
              return true
            }
          })
          if (areNameEqual) {
            let splitedname = part.filename.split('.')
            let extention = splitedname[splitedname.length - 1]
            let newName = splitedname[0] + Math.floor((Math.random() * 66) + 1) + '.' + extention
            fileName = newName
          }
          let url = '/images/' + fileName
          let imageWrite = fs.createWriteStream('./images/' + fileName)
          articleModel.image.url = url
          articleModel.image.alt = part.filename
          part.on('data', data => { imageWrite.write(data) })
          part.on('end', () => {
            counter += 1
            imageWrite.end(() => {
              picturesArr.push(part.filename)
              isDataCollect(res, counter, articleModel)
            })
          })
        } else {
          let result = ''
          part.on('data', (chunk) => {
            result += chunk
          })
          part.on('end', () => {
            counter += 1
            articleModel[part.name] = result
            isDataCollect(res, counter, articleModel)
          })
        }
      })
    } else if (req.method === 'GET') {
      let html = render(isSaved, arrInputsEmpty)
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(html)
      res.end()
    }
  } else {
    return true
  }
}

module.exports = {
  createArticle: createArticle,
  articlesArray: articlesArray
}
function render (saved, empty) {
  let warning = empty ? `<h4 style="background-color: maroon; color: white">Please fill the unfilled input. Inputs cannot be Empty</h4 style="background-color: red; color: yellow">` : ''
  let hasBeenSaved = saved ? `<h4 style="background-color: maroon; color: white">The article has been saved</h4>` : ``
  let html = `${menu}
                <h2>Add Article</h2>
               <form action="/create" method="POST" enctype="multipart/form-data">
                <input type="text" name="title" placeholder="Enter your title here">
                <br/>
                <input type="text" name="description" placeholder="description">
                <br/>
                <input type="file" name="file">
                <br/>
                <input type="submit" value="Save article">
               </form>` +
                hasBeenSaved + warning +
            `</body>
            </html>`
  isSaved = false
  arrInputsEmpty = false
  return html
}

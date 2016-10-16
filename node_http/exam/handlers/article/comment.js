let url = require('url')
let qs = require('querystring')
let articlesArray = require('./create').articlesArray.created

module.exports = (req, res) => {
  req.pathname === req.pathname ||
    url.parse(req.url).pathname
  let splitedUrl = req.pathname.split('/')
  let elIndex = splitedUrl[2]
  let currElement = articlesArray[elIndex]
  let redirectionUrl = `/details/${elIndex}`
  if (req.pathname === `/details/${elIndex}/comment`) {
    let currComment = ''
    let commentModel = {
      id: Date.now(),
      user: '',
      comment: ''
    }
    req.on('data', (chunk) => {
      currComment += chunk
    })
    req.on('end', () => {
      let parsedData = qs.parse(currComment)
      commentModel.comment = parsedData.comment
      commentModel.user = parsedData.user
      currElement.comments.unshift(commentModel)
    })
    res.writeHead(302, {
      'Location': `${redirectionUrl}`
    })
    res.write('Done')
    res.end()
  } else {
    return true
  }
}

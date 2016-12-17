let url = require('url')
let qs = require('querystring')
let allTODOs = require('./create').todo

module.exports = (req, res) => {
  req.pathname === req.pathname ||
    url.parse(req.url).pathname
  let splitedUrl = req.pathname.split('/')
  let elIndex = splitedUrl[2]
  let currElement = allTODOs[elIndex]
  let redirectionUrl = `/details/${elIndex}`
  console.log(`/details/${elIndex}/comment`)
  if (req.pathname === `/details/${elIndex}/comment`) {
    let currComment = ''
    let commentModel = {
      id: Date.now(),
      comment: ''
    }
    req.on('data', (chunk) => {
      currComment += chunk
    })
    req.on('end', () => {
      let parsedData = qs.parse(currComment)
      commentModel.comment = parsedData.comment
      console.log(commentModel)
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

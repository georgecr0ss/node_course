let url = require('url')

module.exports = (req, res) => {
  req.pathName = req.pathname ||
    url.parse(req.url).pathname
  if(req.pathName === `/details/${}`)
}

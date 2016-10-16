let homePage = require('./homePage')
let faveIcon = require('./faveIcon')
let addImages = require('./addImages').createImage
let detailsPage = require('./imgDetails')
let allImages = require('./allImages')
let staticFiles = require('./staticFiles')
module.exports = [faveIcon,
                    homePage,
                    addImages,
                    detailsPage,
                    allImages,
                    staticFiles]

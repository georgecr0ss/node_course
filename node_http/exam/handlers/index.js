let home = require('./home')
let favicon = require('./favicon')
let staticFiles = require('./staticFiles')
let createBlog = require('./article/create').createArticle
let getAll = require('./article/getAll')
let details = require('./article/details')
let comment = require('./article/comment')
let deleted = require('./article/deleted')

module.exports = [ home,
                    favicon,
                    staticFiles,
                    createBlog,
                    getAll,
                    details,
                    comment,
                    deleted ]

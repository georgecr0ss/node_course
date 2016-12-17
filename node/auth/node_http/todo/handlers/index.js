let home = require('./home')
let favicon = require('./favicon')
let staticFiles = require('./staticFiles')
let createTodo = require('./todo/create').createTodo
let getAll = require('./todo/getAll')
let details = require('./todo/details')
let comment = require('./todo/comment')

module.exports = [home, favicon, staticFiles, createTodo, comment, getAll, details]

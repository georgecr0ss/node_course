let home = require('./home')
let favicon = require('./favicon')
let staticFiles = require('./staticFiles')
let createTodo = require('./todo/create').createTodo
let getAll = require('./todo/getAll')
let details = require('./todo/details')
module.exports = [home, favicon, staticFiles, createTodo, getAll, details]

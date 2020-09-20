const express = require('express')
const frontend = express.Router()
const utils = require('../utils')
const path = require('path')


frontend.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'))
})


module.exports = frontend
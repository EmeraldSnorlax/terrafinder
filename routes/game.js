const express = require('express')
const game = express.Router()
const utils = require('../utils')
const fetch = require('node-fetch')
const { randomInt } = require('../utils')

var catalogue = {
    url: 'https://api.openaerialmap.org/',
    resp: {},
    lastRequestSuccessful: null,
    lastError: null,
    maxPage: 1 // API starts counting pages from 1...?

}


game.get('/generate', function(req, res, next) {
    res.send(catalogue)
})


/*
    Get information about the catalogue
    Call it immediately upon startup, and then every 5 minutes thereafter.
    (5 minutes = 300000ms)
    After first call, it will randomly pick a page
*/
function updateCatalogueInfo() {
    fetch(catalogue.url + 'meta?page=' + randomInt(1, catalogue.maxPage + 1))
        .then(resp => resp.json())
        .then(res => {
            catalogue.resp = res
            catalogue.lastRequestSuccessful = true
            console.log(catalogue.resp.meta)
            /* Find the highest page value to select from.
            Each page serves 100 results (0 - 99)
            Selects the last full page as the maximum page.
            */
            catalogue.maxPage = Math.floor(res.meta.found / 100)
            console.log(catalogue)
        })
        .catch(err => {
            console.log('Fetching catalogue data failed, is openaerialmap down?')            
            console.log(err)
            catalogue.lastRequestSuccessful = false
            catalogue.lastError = err      
    })
}

updateCatalogueInfo()
setInterval(updateCatalogueInfo, 300000)


module.exports = game;
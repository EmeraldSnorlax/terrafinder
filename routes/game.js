const express = require('express')
const game = express.Router()
const utils = require('../utils')
const fetch = require('node-fetch')
const Map = require('../mapClass.js')
const { v4: uuidv4 } = require('uuid');

var catalogue = {
    url: 'https://api.openaerialmap.org/',
    resp: {},
    lastRequestSuccessful: null,
    lastError: null,
    maxPage: 1 // API starts counting pages from 1...?
}

var mapsInPlay = []

game.get('/generate', function(req, res, next) {
    let selected = catalogue.resp.results[utils.randomInt(0, catalogue.resp.results.length)]
    
    let newMap = new Map(uuidv4(), selected.properties.thumbnail, selected.uuid, selected.provider, selected.meta_uri,  [selected.bbox[1], selected.bbox[0]])
    mapsInPlay.push(newMap)
    res.send({
        thumbnail: newMap.thumbnail,
        image: newMap.image,
        id: newMap.id
    })

})

game.get('/check/:uuid', function(req, res, next) {
    let uuid = req.params.uuid
    let guess = [req.query.lat, req.query.lon]
    let mapIndex = null
    mapsInPlay.forEach(function (item, index) {
        if (item.id === uuid) {
            mapIndex = index
        }
        // Now is also a good time to clean up expired games
        if (item.expiry < Date.now()) {
            mapsInPlay.splice(index, 1)
        }
    })
    
    let map = mapsInPlay[mapIndex]
    if (!map) {
        let reply = {
            wasSuccessful: false,
            comment: `The game "${uuid}" does not exist!`,
            score: null,
            location: null
        }
        res.status(404).send(reply)
    } else {
        let score = map.getScore(guess)
        let reply = {
            wasSuccessful: true,
            comment: 'OK',
            score: score,
            location: map.location
        }
        mapsInPlay.splice(mapIndex, 1)
        res.status(200).send(reply)
    }
})

/*
    Get information about the catalogue
    Call it immediately upon startup, and then every 3 seconds thereafter.
    (3 seconds = 3000ms)
    After first call, it will randomly pick a page
*/

function updateCatalogueInfo() {
    fetch(catalogue.url + 'meta?page=' + utils.randomInt(1, catalogue.maxPage + 1))
        .then(resp => resp.json())
        .then(res => {
            catalogue.resp = res
            catalogue.lastRequestSuccessful = true
            /* Find the highest page value to select from.
            Each page serves 100 results (0 - 99)
            Selects the last full page subtract 40 as the maximum page. The last bunch of pages seem to be filled with garbage.
            */
            catalogue.maxPage = Math.floor((res.meta.found - 40) / 100)
        })
        .catch(err => {
            console.log('Fetching catalogue data failed, is openaerialmap down?')            
            console.log(err)
            catalogue.lastRequestSuccessful = false
            catalogue.lastError = err      
    })
}

updateCatalogueInfo()
setInterval(updateCatalogueInfo, 3000)

module.exports = game

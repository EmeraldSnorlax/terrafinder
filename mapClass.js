const utils = require('./utils')


class Map {
    constructor(id, thumbnail, image, provider, meta, location) {
        this.id = id
        this.thumbnail = thumbnail
        this.image = image
        this.provider = provider
        this.meta = meta
        this.location = location
    }
    getScore(guess) {
        // https://en.wikipedia.org/wiki/Haversine_formula
	let distLat = degToRad(guess[0] - this.location[0])
        let distLon = degToRad(guess[1] - this.location[1]) 
        let a = 
            Math.sin(distLat/2) * Math.sin(distLat/2) +
            Math.cos(degToRad(this.location[0])) * Math.cos(degToRad(guess[0])) * 
            Math.sin(distLon/2) * Math.sin(distLon/2)
    
        let b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) 
        let res = utils.earthRadius * b
        return res
    }
}

module.exports = Map

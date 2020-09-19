function randomNum(min, max) {
  return Math.random() * (max - min) + min
}

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function degToRad(deg) {
  return deg * (Math.PI / 180)
}

const earthRadius = 6371 // km

module.exports = {
  randomNum,
  randomInt,
  degToRad
}
var id = ''
var solution = null
function generateMap() {
    if (solution) { map.removeLayer(solution) } // Remove old solution
    fetch('./game/generate')
    .then(response => response.json())
    .then(map => {
        console.log(map)
        document.getElementById('map-img').src = map.thumbnail
        document.getElementById('fullsize').href = map.image
        document.getElementById('fullsize').innerHTML = 'Click here to download high-res TIFF. <br> WARNING: VERY LARGE, A LOT OF RAM IS NEEDED TO VIEW!'
        document.getElementById('map-id').innerHTML = 'Game ID: ' + map.id
        id = map.id
        document.getElementById('score').innerHTML = ''
    })
}

function checkMap() {
    let lat = document.getElementById('lat').value
    let lon = document.getElementById('lng').value
    fetch('./game/check/' + id + '?lat=' + lat + '&lon=' + lon)
    .then(response => response.json())
    .then(answer => {
        console.log(answer)
        if (!answer.wasSuccessful) {
            alert('Something went wrong! :: ' + answer.comment)
        }
        solution = L.marker(answer.location).addTo(map).bindPopup('Actual location').openPopup()
        document.getElementById('score').innerHTML = 'Score: ' + answer.score.toFixed(1) + 'km (' + (answer.score * 0.62137119).toFixed(1) + 'miles)'
    })
}
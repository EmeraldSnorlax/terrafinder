function generateMap() {
    console.log('button clicked!')
    fetch('./game/generate')
    .then(response => response.json())
    .then(map => {
        console.log(map)
    })
}

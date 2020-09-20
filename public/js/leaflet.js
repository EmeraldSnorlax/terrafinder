
var map = L.map('selection-map').setView({lon: 0, lat: 0}, 2)


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map)

L.control.scale().addTo(map)

var selectedLocation = L.marker([0, 0]).addTo(map)
map.on('click', function(e) {
    selectedLocation.setLatLng(e.latlng)
    document.getElementById('lat').value = e.latlng.lat
    document.getElementById('lng').value = e.latlng.lng
})

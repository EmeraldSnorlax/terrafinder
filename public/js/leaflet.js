
var map = L.map('selection-map').setView({lon: 0, lat: 0}, 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  noWrap: true,
  maxBoundsViscosity: 1.0,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map)

L.control.scale().addTo(map)

var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180)
var bounds = L.latLngBounds(southWest, northEast)

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false })
})


map.setMaxBounds(L.latLng(179, 89), L.latLng(-179, -89))
map.on('click', function(e) {
    selectedLocation.setLatLng(e.latlng)
    document.getElementById('lat').value = e.latlng.lat
    document.getElementById('lng').value = e.latlng.lng
})

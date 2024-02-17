// leaflet-init.js

var map = L.map('map');
map.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.getCurrentPosition(success, error);

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    let marker = L.marker([lat, lng]).addTo(map);
    let circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

    map.setView([lat, lng], 13);
}

function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation address");
    } else {
        alert("Cannot get location");
    }
}

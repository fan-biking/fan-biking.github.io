/* Interaktive Karte Skript*/

let lat = 47.223193
let lng = 11.526103
let zoom = 11

L.map('map').setView([47.223193, 11.526103], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


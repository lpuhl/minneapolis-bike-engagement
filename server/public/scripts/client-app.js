$(document).ready(function() {

var map = L.map('map',{ center: [44.8611, -93.2933], zoom: 12});

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

var lyn65 = L.marker([44.885933,-93.286542]).addTo(map);

var lineToCoop = L.polyline([[44.885713, -93.286768], [44.886533,  -93.287808]],
    {color: 'red', weight: 10}).addTo(map);

lyn65.bindPopup('<h3><a href="http://lyn65.com">Lyn 65</a></h3>');

// var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
// 	maxZoom: 18,
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// });

});

$(document).ready(function() {

var map = L.map('map',{ center: [44.8611, -93.2933], zoom: 12});

var bars =  {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature",
        "properties": {
          "amenity": "bar",
          "name": "Houlihan's"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-93.2858392, 44.8831415]
        }
    },
    { "type": "Feature",
        "properties": {
          "amenity": "bar",
          "name": "Sandy's Tavern",
          "website": "http://www.sandystavern.com"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-93.3089008, 44.882959]
        }
    }]};

var lyn65 = L.marker([44.885933,-93.286542]).addTo(map);

var lineToCoop = L.polyline([[44.885713, -93.286768], [44.886533,  -93.287808]],
    {color: 'red', weight: 10}).addTo(map);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
// 	maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

// map.doubleClickZoom.disable();

L.geoJson(bars).addTo(map);
L.geoJson(bars, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    }
}).addTo(map);

lyn65.bindPopup('<h3><a href="http://lyn65.com">Lyn 65</a></h3>');

// var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
// 	maxZoom: 18,
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// });

});

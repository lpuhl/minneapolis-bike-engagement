var mymap = L.map("bikemap").setView([44.97, -93.25], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZWxpemFiZXRoIiwiYSI6IkNmdnB1cmMifQ.NlNxa3kOsDxhWJVGxZsPGg'
}).addTo(mymap);

var bikewaysLayer = new L.GeoJSON.AJAX("../../data/bikeways_lines.geojson");
bikewaysLayer.addTo(mymap);

console.log(bikewaysLayer);

var lyn65 = L.marker([44.885933,-93.286542]).addTo(mymap);
lyn65.bindPopup('<h3><a href="http://lyn65.com">Lyn 65</a></h3>');

var mplsBikeCoal = L.marker([44.9733, -93.2478]).addTo(mymap);
mplsBikeCoal.bindPopup('<h3><a href="http://www.mplsbike.org/">Minneapolis Bicycle Coalition</a></h3><img src="./images/MBC-logo-square-white-bg_bigger.jpg" />');


var lineToCoop = L.polyline([[44.885713, -93.286768], [44.886533,  -93.287808]],
    {color: 'red', weight: 10}).addTo(mymap);
//
//




// L.geoJson(bars).addTo(mymap);

// Create event listener for the Add button
// document.getElementById("addButton").addEventListener("click", addBars);
// document.getElementById("removeButton").addEventListener("click", removeBars);
// document.getElementById("toggleButton").addEventListener("click", toggleBars);
// // set barPoints to a our coffeeShop GeoJSON

// var barPoints = L.geoJson(bars, {
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(feature.properties.name);
//     }
// });


// add coffee shops function
// function addBars() {
//     barPoints.addTo(mymap);
// };
// function removeBars() {
//     map.removeLayer(barPoints);
// };
//
// function toggleBars(){
//     if(map.hasLayer(barPoints)){
//         removeBars();
//     } else {
//         addBars();
//     }
// };

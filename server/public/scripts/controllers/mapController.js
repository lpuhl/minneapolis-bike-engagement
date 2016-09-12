// 'use strict';
myApp.controller("mapController", function($scope, leafletDrawEvents) {
  console.log("map controller working!");

  // Initialise the FeatureGroup to store drawn layers
  var drawnItems = new L.FeatureGroup();

  angular.extend($scope, {
    map: {
      minneapolis: {
        lat: 44.9766,
        lng: -93.2655,
        zoom: 12
      },
      layers: {
        baselayers: {
          mapbox_streets: {
            name: 'Map View',
            url: 'https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            layerOptions: {
              apikey: 'pk.eyJ1IjoiZWxpemFiZXRoIiwiYSI6IkNmdnB1cmMifQ.NlNxa3kOsDxhWJVGxZsPGg',
              mapid: 'mapbox.streets',
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
            }
          },
          mapbox_hybrid: {
            name: 'Satellite/Streets View',
            url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxpemFiZXRoIiwiYSI6IkNmdnB1cmMifQ.NlNxa3kOsDxhWJVGxZsPGg',
            type: 'xyz',
            layerOptions: {
              // apikey: 'pk.eyJ1IjoiZWxpemFiZXRoIiwiYSI6IkNmdnB1cmMifQ.NlNxa3kOsDxhWJVGxZsPGg',
              mapid: 'mapbox.satellite',
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
            }
          }
        }
      },
      defaults: {
          minZoom: 12,
          path: {
              weight: 10,
              color: '#800000',
              opacity: 1
          }
      },
      drawOptions: {
        position: "bottomright",
        draw: {
          polyline: {
            metric: false
          },
          polygon: false,
          rectangle: false,
          circle: false,
          marker: true
        },
        edit: {
        featureGroup: drawnItems,
        remove: true
        }
      }
    }
  });

  var handle = {
  created: function(e,leafletEvent, leafletObject, model, modelName) {
    // Add newly-drawn feature to leafletEvent layer
    drawnItems.addLayer(leafletEvent.layer);
    var shape = drawnItems.toGeoJSON();
    var shape_for_db = JSON.stringify(shape);
    $('#formModal').modal();
    console.log(shape)
  },
  edited: function(arg) {},
  deleted: function(arg) {
    var layers;
    layers = arg.layers;
    drawnItems.removeLayer(layer);
  },
  drawstart: function(arg) {},
  drawstop: function(arg) {
    //  dialog.dialog("open");
  },
  editstart: function(arg) {},
  editstop: function(arg) {},
  deletestart: function(arg) {},
  deletestop: function(arg) {}
  };

  var drawEvents = leafletDrawEvents.getAvailableEvents();

  drawEvents.forEach(function(eventName){
      $scope.$on('leafletDirectiveDraw.' + eventName, function(e, payload) {
        //{leafletEvent, leafletObject, model, modelName} = payload
        var leafletEvent, leafletObject, model, modelName; //destructuring not supported by chrome yet :(
        leafletEvent = payload.leafletEvent,
        leafletObject = payload.leafletObject,
        model = payload.model,
        modelName = payload.modelName;
        handle[eventName.replace('draw:','')](e,leafletEvent, leafletObject, model, modelName);
      });
  });


});

  // // Create Leaflet Draw Control for the draw tools and toolbox
  // var drawControl = new L.Control.Draw({
  //     draw: {
  //         polygon: false,
  //         polyline: true,
  //         rectangle: false,
  //         circle: false
  //     },
  //     edit: {
  //       featureGroup: drawnItems
  //     },
  //     remove: false
  // });
  // bikemap.addControl(drawControl);
  //
  // // Function to run when feature is drawn on map
  // bikemap.on('draw:created', function (e){
  //   var layer = e.layer;
  //   drawnItems.addLayer(layer);
  //   bikemap.addLayer(drawnItems);
  //   // dialog.dialog("open");
  // });




// // Add Data from CartoDB using the SQL API
// // Declare Variables
// // Create Global Variable to hold CartoDB points
// var cartoDBPoints = null;
//
// // Set your CartoDB Username
// var cartoDBusername = "lizzz";
//
// // Write SQL Selection Query to be Used on CartoDB Table
// // Name of table is 'data_collector'
// var sqlQuery = "SELECT * FROM data_collector";
//
// // Get CartoDB selection as GeoJSON and Add to Map
// function getGeoJSON() {
//     $.getJSON("https://" + cartoDBusername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery, function(data) {
//         cartoDBPoints = L.geoJson(data, {
//             pointToLayer: function(feature, latlng) {
//                 var marker = L.marker(latlng);
//                 marker.bindPopup('' + feature.properties.description + 'Submitted by ' + feature.properties.name + '');
//                 return marker;
//             }
//         }).addTo(bikemap);
//     });
// };
//
// // Run showAll function automatically when document loads
// $(document).ready(function() {
//     getGeoJSON();
// });



//   // Boolean global variable used to control visibility
//   var controlOnMap = false;
//   // Create variable for Leaflet.draw features
//   var drawnItems = new L.FeatureGroup();
//
//   // Function to add the draw control to the map to start editing
//   function startEdits(){
//     if(controlOnMap == true){
//       bikemap.removeControl(drawControl);
//       controlOnMap = false;
//     }
//     bikemap.addControl(drawControl);
//     controlOnMap = true;
//   }
//   // Function to remove the draw control from the map
//   function stopEdits(){
//     bikemap.removeControl(drawControl);
//     controlOnMap = false;
//   }
//
//
// // Use the jQuery UI dialog to create a dialog and set options
// var dialog = $("#dialog").dialog({
//   autoOpen: false,
//   height: 300,
//   width: 350,
//   modal: true,
//   position: {
//     my: "center center",
//     at: "center center",
//     of: "#map"
//   },
//   buttons: {
//     "Add to Database": setData,
//     Cancel: function() {
//       dialog.dialog("close");
//       bikemap.removeLayer(drawnItems);
//     }
//   },
//   close: function() {
//     form[0].reset();
//     console.log("Dialog closed");
//   }
// });
//
// // Stops default form submission and ensures that setData or the cancel function run
// var form = dialog.find("form").on("submit", function(event) {
//   event.preventDefault();
// });
//
// function setData() {
//   var enteredUsername = username.value;
//   var enteredDescription = description.value;
//   drawnItems.eachLayer(function (layer) {
//     var sql = "INSERT INTO data_collector (the_geom, description, name, latitude, longitude) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
//     var a = layer.getLatLng();
//     var sql2 = '{"type":"Point","coordinates":[' + a.lng + "," + a.lat + "]}'),4326),'" + enteredDescription + "','" + enteredUsername + "','" + a.lat + "','" + a.lng + "')";
//     var pURL = sql + sql2;
//     submitToProxy(pURL);
//     console.log("Feature has been submitted to the Proxy");
//   });
//   bikemap.removeLayer(drawnItems);
//   drawnItems = new L.FeatureGroup();
//   console.log("drawnItems has been cleared");
//   dialog.dialog("close");
// };

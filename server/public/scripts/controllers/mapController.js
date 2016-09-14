// 'use strict';
myApp.controller('mapController', ['$scope', '$http', 'leafletDrawEvents', 'leafletData', '$uibModal', 'DataFactory', function ($scope, $http, leafletDrawEvents, leafletData, $uibModal, DataFactory){
  console.log("map controller working!");
  $scope.dataFactory = DataFactory;

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

// from github.com/angular-ui/ui-leaflet-draw/blob/master/index.html
  var handle = {
    created: function(e,leafletEvent, leafletObject, model, modelName) {
      // Add newly-drawn feature to leafletEvent layer
      console.log("created");
      drawnItems.addLayer(leafletEvent.layer);
      console.log("drawnItems: ", drawnItems);
      var drawing = JSON.stringify(drawnItems.toGeoJSON());
      // var drawing = "'"+JSON.stringify(drawnItems.toGeoJSON().geometry)+"'";
      console.log("Drawing: ", drawing);

      $scope.dataFactory.saveDrawnItem(drawing);
      $uibModal.open({
        templateUrl: '/views/partials/inputForm.html',
        controller: 'InputController'
      });
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
        // console.log(e);
      });
  });

}]);

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


// 'use strict';

myApp.controller('mapController', ['$scope', '$http', 'leafletDrawEvents', 'leafletData', '$uibModal', 'DataFactory', function ($scope, $http, leafletDrawEvents, leafletData, $uibModal, DataFactory){
  console.log("map controller working!");
  $scope.dataFactory = DataFactory;

  $uibModal.open({
    templateUrl: '/views/partials/greeting.html',
    controller: 'GreetingController',
    windowClass: 'app-modal-window'
  });

  // Initialise the FeatureGroup to store drawn layers
  var drawnItems = new L.FeatureGroup();
  var featuresFromDB = null;
  var savedFeatures = new L.FeatureGroup();

  angular.extend($scope, {
    map: {
      minneapolis: {
        lat: 44.9766,
        lng: -93.2655,
        zoom: 14
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
        },
        overlays: {
        }
      },
      defaults: {
          scrollWheelZoom: false,
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
        }
        // ,
        // edit: {
        // featureGroup: drawnItems,
        // remove: false
        // }
      }
    }
  });


// from github.com/angular-ui/ui-leaflet-draw/blob/master/index.html
  var handle = {
    created: function(e,leafletEvent, leafletObject, model, modelName) {
      // Add newly-drawn feature to leafletEvent layer
      drawnItems.addLayer(leafletEvent.layer);
      // console.log("drawnItems: ", drawnItems);
      var drawing = JSON.stringify(drawnItems.toGeoJSON().features[0]['geometry']);
      console.log("Drawing: ", drawing);

      $scope.dataFactory.saveDrawnItem(drawing);

      $uibModal.open({
        templateUrl: '/views/partials/inputForm.html',
        controller: 'InputController',
        windowClass: 'app-modal-window'
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

  console.log($scope.map.layers);

////--------- from http://jsfiddle.net/jehope/9x86F/ --------------
  $scope.loadGeojson = function () {
      angular.extend($scope, {
          geojson: {
              data: $scope.dbFeatures,
              filter: function (feature) {
                  return feature.properties.show;
              }
          }
      });
  };

  $scope.hideGeoJSON = function() {
    leafletData.getMap().then(function (map) {
      console.log("getMap running");
        leafletData.getGeoJSON().then(function (geoJSON) {
            map.removeLayer(geoJSON);
            drawnItems.clearLayers();
            $scope.loadGeojson();
        });
    });
    console.log($scope.geojson);
  }
////---------------------------------------------------------------

  $scope.getFeaturesFromDB = function() {
    $scope.dataFactory.getFeaturesFromDB().then(function() {
      $scope.dbFeatures = $scope.dataFactory.getDataFromDB();
      console.log("data from DB: ", $scope.dbFeatures);

      angular.extend($scope, {
          geojson:{
                name: 'Comments',
                type: 'geoJSONShape',
                data: $scope.dbFeatures,
                layerOptions: {
                  showOnSelector: true,
                },
                style: {
                    // fillColor: "green",
                    // weight: 2,
                    // opacity: 1,
                    // color: 'white',
                    // dashArray: '3',
                    // fillOpacity: 0.2
                },
                onEachFeature: function (feature, layer) {
                  layer.bindPopup(feature.properties.comment);
                }

          }
      });
    });
  };

  // setInterval(function() {
  //   var drawingStatus = $scope.dataFactory.getDrawingStatus();
  //   if (drawingStatus == true) {
  //     console.log(drawingStatus);
  //     drawnItems.clearLayers();
  //   }
  // }, 2000);


// End controller
}]);

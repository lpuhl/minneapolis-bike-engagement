myApp.controller('ThanksController', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'DataFactory', function ($scope, $http, $uibModal, $uibModalInstance, DataFactory) {
  console.log("thanks controller working!");

  $scope.dataFactory = DataFactory;

  $scope.cancelForm = function () {
    $uibModalInstance.dismiss();
  };


  // leafletData.getMap().then(function (map) {
  //   console.log("getMap running");
  //     leafletData.getGeoJSON().then(function (geoJSON) {
  //         map.removeLayer(geoJSON);
  //         $scope.loadGeojson();
  //     });
  // });


      /// run factory function that will remove drawnItems layer from map and reset it


}]);

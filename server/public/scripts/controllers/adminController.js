myApp.controller("adminController", ["$scope", "$http", "DataFactory", function($scope, $http, DataFactory) {
  console.log("admin controller working!");

  $scope.dataFactory = DataFactory;

  getFeaturesFromDB();

  function getFeaturesFromDB() {
    $scope.dataFactory.getFeaturesFromDB().then(function() {
      $scope.dbFeatures = $scope.dataFactory.getDataFromDB();
      $scope.contacts = $scope.dbFeatures;
      console.log('contacts: ', $scope.contacts)
    });
  };


}]);

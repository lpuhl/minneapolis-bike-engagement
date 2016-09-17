myApp.controller("adminController", ["$scope", "$http", "DataFactory", function($scope, $http, DataFactory) {
  console.log("admin controller working!");

  $scope.dataFactory = DataFactory;

  getFeaturesFromDB();

  function getFeaturesFromDB() {
    $scope.dataFactory.getFeaturesFromDB().then(function() {
      $scope.dbFeatures = $scope.dataFactory.getDataFromDB();
      console.log("data from DB: ", $scope.dbFeatures);
      $scope.contacts = $scope.dbFeatures;
      console.log('contacts: ', $scope.contacts)
    });
  };


  // getContacts();
  // function getContacts() {
  //   $http.get('/contacts').then(function(response) {
  //     console.log('data', response.data);
  //     $scope.contacts = response.data;
  //   });
  // }


}]);

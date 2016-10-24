myApp.controller("adminController", ["$scope", "$http", "DataFactory", function($scope, $http, DataFactory) {
  console.log("admin controller working!");

  $scope.dataFactory = DataFactory;

  getFeaturesFromDB();

  function getFeaturesFromDB() {
    $scope.dataFactory.getFeaturesFromDB().then(function() {
      $scope.contacts = $scope.dataFactory.getDataFromDB();
      console.log('contacts: ', $scope.contacts);

      $scope.contacts.forEach(function(contact) {
          console.log(contact.properties);

          for (var property in contact.properties) {
            if (contact.properties[property] == 'undefined') {
              contact.properties[property] = "";
            };
          }
          contact.properties.list = Boolean(contact.properties.list);
          console.log(contact.properties.list);

      });


    });
  };



////////// End controller
}]);

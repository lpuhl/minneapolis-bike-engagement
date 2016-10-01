myApp.controller("adminController", ["$scope", "$http", "DataFactory", function($scope, $http, DataFactory) {
  console.log("admin controller working!");

  $scope.dataFactory = DataFactory;

  getFeaturesFromDB();

  function getFeaturesFromDB() {
    $scope.dataFactory.getFeaturesFromDB().then(function() {
      $scope.dbFeatures = $scope.dataFactory.getDataFromDB();
      $scope.contacts = $scope.dbFeatures;
      console.log('contacts: ', $scope.contacts);
      $scope.contacts.forEach(function(contact) {
          console.log(contact);
          if (contact.properties.firstname == 'undefined') {
            contact.properties.firstname = "";
          };
          if (contact.properties.lastname == 'undefined') {
            contact.properties.lastname = "";
          };
          if (contact.properties.street == 'undefined') {
            contact.properties.street = "";
          };
          if (contact.properties.city == 'undefined') {
            contact.properties.city = "";
          };
          if (contact.properties.state == 'undefined') {
            contact.properties.state = "";
          };
          if (contact.properties.zip == 'undefined') {
            contact.properties.zip = "";
          };
          if (contact.properties.phone == 'undefined') {
            contact.properties.phone = "";
          };
          if (contact.properties.email == 'undefined') {
            contact.properties.email = "";
          };
          if (contact.properties.list == 'undefined') {
            contact.properties.list = "";
          };
          if (contact.properties.comment == 'undefined') {
            contact.properties.comment = "";
          };
          contact.properties.list = Boolean(contact.properties.list);
          console.log(contact.properties.list);

      });


    });
  };



////////// End controller
}]);

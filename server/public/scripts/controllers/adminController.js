myApp.controller("adminController", ["$scope", "$http", function($scope, $http) {
  console.log("admin controller working!");

  getContacts();

  function getContacts() {
    $http.get('/contacts').then(function(response) {
      console.log('data', response.data);
      $scope.contacts = response.data;
    });
  }


}]);

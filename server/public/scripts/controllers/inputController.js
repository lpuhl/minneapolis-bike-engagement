myApp.controller("InputController", ['$scope', '$http', '$uibModal', '$uibModalInstance', 'DataFactory', function ($scope, $http, $uibModal, $uibModalInstance, DataFactory) {
  console.log("input controller working!");

  $scope.dataFactory = DataFactory;

  $scope.cancelForm = function () {
    $uibModalInstance.dismiss();
  };


  // Saving new input from form and geometry
  $scope.saveComment = function() {
      // var comment = $scope.comment;
      var newComment = {
          comment: $scope.comment,
          first_name: $scope.first_name,
          last_name: $scope.last_name,
          street: $scope.address,
          city: $scope.city,
          zip: $scope.zip,
          phone: $scope.phone,
          email: $scope.email,
          list: $scope.list
      };
      $scope.dataFactory.saveNewComment(newComment);
      // var test = $scope.dataFactory.getDrawnItem();

      // close modal window
      $uibModalInstance.close();

      /// run factory function that will remove drawnItems layer from map and reset it
  }


}]);

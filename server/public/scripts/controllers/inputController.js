myApp.controller("InputController", ['$scope', '$http', '$uibModal', '$uibModalInstance', function ($scope, $http, $uibModal, $uibModalInstance) {
  console.log("input controller working!");

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
      console.log(newComment);

      // close modal window
      $uibModalInstance.close();

      /// get geometry data from factory

      /// run factory function that will remove drawnItems layer from map and reset it


      $http({
          method: "POST",
          url: '/newcomment',
          data: newComment,
      }).then(function() {
          console.log("Comment saved");
      }, function() {
          console.log("Ugh, this sucks.");
      });

  }


}]);

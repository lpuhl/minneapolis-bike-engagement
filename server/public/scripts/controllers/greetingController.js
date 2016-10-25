myApp.controller('GreetingController', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'DataFactory', function ($scope, $http, $uibModal, $uibModalInstance, DataFactory) {
  console.log("greeting controller working!");

  $scope.dataFactory = DataFactory;

  $scope.cancelForm = function () {
    $uibModalInstance.dismiss();
  };




}]);

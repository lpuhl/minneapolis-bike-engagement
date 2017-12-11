myApp.controller('GreetingController', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'DataFactory', function ($scope, $http, $uibModal, $uibModalInstance, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.cancelForm = function () {
    $uibModalInstance.dismiss();
  };




}]);

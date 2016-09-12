var myApp = angular.module('myApp', ['ngRoute', 'nemLogging', 'ui-leaflet']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/partials/home-map.html',
      controller: "mapController"
    })
    .when('/admin-view', {
      templateUrl: '/views/partials/admin-view.html',
      controller: "adminController"
    })
    .otherwise({
      redirectTo: '/home'
    })
}]);

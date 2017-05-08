var myApp = angular.module('myApp', ['ui.bootstrap']);
var root = 'https://green-web-bookstore.herokuapp.com';
function CarouselDemoCtrl($scope){
  $scope.myInterval = 3000;
     $scope.getBanner = function() {
        $http.get(root + '/api/banners/').success(function(response) {
            $scope.banners = response;
        });
    }
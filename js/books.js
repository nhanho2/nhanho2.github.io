var app = angular.module('myApp', []);
app.controller('bookCtrl', function($scope, $http) {
    $http.get("https://green-web-bookstore.herokuapp.com/api/books")
        .then(function(response) {
            $scope.books = response.data;
        });
});
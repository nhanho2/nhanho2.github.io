var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'bookCtrl'
        })
        .when('/admin', {
            templateUrl: 'pages/admin.html',
            controller: 'bookCtrl'
        })
        .otherwise({
            templateUrl: 'pages/home.html'
        });
});
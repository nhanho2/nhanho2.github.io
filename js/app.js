var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'MainController'
        })
        .when('/admin', {
            templateUrl: 'pages/admin.html',
            controller: 'AdminController'
        })
        .otherwise({ redirectTo: '/' });
});
app.controller('MainController', function() {});
app.controller('AdminController', function() {});
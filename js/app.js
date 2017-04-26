var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.htm',
            controller: 'MainController'
        })
        .when('/admin', {
            templateUrl: 'pages/admin.htm',
            controller: 'AdminController'
        })
        .otherwise({ redirectTo: '/' });
});
app.controller('MainController', function() {});
app.controller('AdminController', function() {});
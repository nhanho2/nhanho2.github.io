var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html"
        })
        .when("/admin", {
            templateUrl: "admin.html"
        })
});
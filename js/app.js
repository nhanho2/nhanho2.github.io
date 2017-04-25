var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
            controller: "MainController"
        })
        .when("/admin", {
            templateUrl: "admin.html",
            controller: "AdminController"
        })
});
app.controller('MainController', function() {});
app.controller('AdminController', function() {});
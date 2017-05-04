var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'bookCtrl'
        })
        .when('/admin', {
            templateUrl: 'pages/admin.html',
            controller: 'bookCtrl'
        })
        .when('/books/category/:id', {
            controller: 'bookCtrl',
            templateUrl: 'pages/category.html'
        })
        .when('/books/detail/:id', {
            controller: 'bookCtrl',
            templateUrl: 'pages/detail.html'
        })
        .when('/books/author/:name', {
            controller: 'bookCtrl',
            templateUrl: 'pages/authorBook.html'
        })
        .when('/search/:keyword', {
            controller: 'bookCtrl',
            templateUrl: 'pages/search.html'
        })
        .otherwise({
            templateUrl: 'pages/home.html'
        });
});
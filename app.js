var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);
myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'bookCtrl'
        })
        .when('/admin', {
            templateUrl: 'pages/admin.html',
            controller: 'bookCtrl'
        })
        .when('/admin_add', {
            templateUrl: 'pages/admin_add.html',
            controller: 'bookCtrl'
        })
        .when('/admin_edit', {
            templateUrl: 'pages/admin_edit.html',
            controller: 'bookCtrl'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'bookCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'bookCtrl'
        })
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'bookCtrl'
        })
        .when('/profile', {
            templateUrl: 'pages/profile.html',
            controller: 'bookCtrl'
        })
        .when('/books/admin_edit/:id', {
            templateUrl: 'pages/admin_edit.html',
            controller: 'bookCtrl'
        })
        .when('/cart', {
            templateUrl: 'pages/cart.html',
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
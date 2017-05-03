myApp.controller('bookCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    console.log('bookCtrl loaded...');
    var root = 'https://green-web-bookstore.herokuapp.com';
    $scope.getBooks = function() {
        $http.get(root + '/api/books').success(function(response) {
            $scope.books = response;
        });
    }
    $scope.getGenres = function() {
        $http.get(root + '/api/genres').success(function(response) {
            $scope.genres = response;
        });
    }

    $scope.getBook = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/' + id).success(function(response) {
            $scope.book = response;
        });
    }
    $scope.getGenreBook = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/genre/' + id).success(function(response) {
            $scope.genreBook = response;
        });
    }
    $scope.addBook = function() {
        console.log($scope.book);
        $http.post(root + '/api/books/', $scope.book).success(function(response) {
            window.location.href = '#/books';
        });
    }

    $scope.updateBook = function() {
        var id = $routeParams.id;
        $http.put(root + '/api/books/' + id, $scope.book).success(function(response) {
            window.location.href = '#/books/' + $routeParams.id;
        });
    }

    $scope.removeBook = function(id) {
        $http.delete(root + '/api/books/' + id).success(function(response) {
            window.location.href = '#/books';
        });
    }
    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };
    $scope.ratingStates = [
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' }
    ];
    $scope.bookSearch = function() {
        $scope.text = $routeParams.text;
        $http.get(root + '/api/books/search/' + $scope.text).success(function(response) {
            $scope.search = response;
        });
    }
    $scope.authorSearch = function() {
        $scope.text = $routeParams.text;
        $http.get(root + '/api/books/author/' + $scope.text).success(function(response) {
            $scope.authors = response;
        });
    }

}]);
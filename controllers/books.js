myApp.controller('bookCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    console.log('bookCtrl loaded...');
    var root = 'https://green-web-bookstore.herokuapp.com';
    $scope.getBooks = function () {
        $http.get(root + '/api/books').success(function (response) {
            $scope.books = response;
        });
    }
    $scope.getGenres = function () {
        $http.get(root + '/api/genres').success(function (response) {
            $scope.genres = response;
        });
    }

    $scope.getBook = function () {
        var id = $routeParams.id;
        $http.get(root + '/api/books/' + id).success(function (response) {
            $scope.book = response;
        });
    }
    $scope.getGenreBook = function () {
        var id = $routeParams.id;
        $http.get(root + '/api/books/genre/' + id).success(function (response) {
            $scope.genreBook = response;
        });
    }
    $scope.addBook = function () {
        console.log($scope.book);
        $http.post(root + '/api/books/', $scope.book).success(function (response) {
            window.location.href = '#/books';
        });
    }

    $scope.updateBook = function () {
        var id = $routeParams.id;
        $http.put(root + '/api/books/' + id, $scope.book).success(function (response) {
            window.location.href = '#/books/' + $routeParams.id;
        });
    }

    $scope.removeBook = function (id) {
        $http.delete(root + '/api/books/' + id).success(function (response) {
            window.location.href = '#/books';
        });
    }
    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
    };
    $scope.ratingStates = [
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' }
    ];
    $scope.text = $routeParams.keyword;
    $scope.bookSearch = function () {
        $http.get(root + '/api/books/search/' + $scope.text).success(function (response) {
            $scope.books = response;
        });
    }
    $scope.submitSearch = function () {
        //window.location = window.location.href;
        window.location.replace('#/search/' + $scope.text);
        //window.location.href = '#/search/' + $scope.text;
        console.log('#/search/' + $scope.text)
    }
    $scope.getBooksByGenre = function () {
        $scope.text = $routeParams.id;
        $http.get(root + '/api/books/genre/' + $scope.text).success(function (response) {
            $scope.books = response;
        });
    }
    $scope.getBooksByAuthor = function () {
        $scope.text = $routeParams.name;
        $http.get(root + '/api/books/author/' + $scope.text).success(function (response) {
            $scope.books = response;
        });
    }
    $scope.getBanner = function () {
        $http.get(root + '/api/banners/').success(function (response) {
            $scope.banners = response;
        });
    }
    //Datepicker
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    //
    $scope.myInterval = 1000;
    $scope.user = {
        'userName': 'Nhan Fisher',
        'userAvatarUrl': 'https://s.gravatar.com/avatar/8dd03d84d5c81e53fcbf6c307b731094?s=500&r=r'
    }
    // $scope.comment = {};
    // $scope.addComment = function(post) {
    //     $scope.comment.date = Date.now();
    //     $scope.comment.userName = $scope.user.userName;
    //     $scope.comment.userAvatarUrl = $scope.user.userAvatarUrl;
    //     post.comments.push($scope.comment);
    //     var req = {
    //         method: 'PUT',
    //         url: bookservice.getBook + $routeParams.itemId,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: post
    //     }
}]);
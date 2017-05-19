myApp.controller('bookCtrl', ['$scope', '$http', '$location', '$routeParams', '$cookieStore', function($scope, $http, $location, $routeParams, $cookieStore) {
    console.log('bookCtrl loaded...');
    var root = 'https://green-web-bookstore.herokuapp.com';
    $scope.getBooks = function() {
        $http.get(root + '/api/books').success(function(response) {
            $scope.books = response;
            $scope.viewby = 4;
            $scope.totalItems = $scope.books.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 2;
            $scope.pageCount = function() {
                return Math.ceil($scope.books.length / $scope.itemsPerPage);
            };
            $scope.$watch('currentPage + itemsPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;

                $scope.filteredBooks = $scope.books.slice(begin, end);
            });
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
            $scope.books = response;
            $scope.genreName = '';
            for (var i = 0; i < $scope.genres.length; i++) {
                if ($scope.genres[i]._id === id) {
                    $scope.genreName = $scope.genres[i].name;
                }
            }
        });
    }

    $scope.addBook = function() {
        console.log($scope.book);
        $http.post(root + '/api/books/', $scope.book).success(function(response) {
            window.location.href = '#/admin/';
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
            window.location.href = '#/admin/';
        });
    }

    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    }
    $scope.ratingStates = [
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' }
    ];

    $scope.bookSearch = function() {
        $scope.text = $routeParams.keyword;
        $http.get(root + '/api/books/search/' + $scope.text).success(function(response) {
            $scope.books = response;
        });
    }

    $scope.myInterval = 3000;

    $scope.today = new Date();

    $scope.submitSearch = function() {
        //window.location = window.location.href;
        $location.url('search/' + $scope.text);
        //window.location.href = '#/search/' + $scope.text;
        console.log('search/' + $scope.text)
    }

    $scope.getBooksByGenre = function() {
        $scope.text = $routeParams.id;
        $http.get(root + '/api/books/genre/' + $scope.text).success(function(response) {
            $scope.books = response;
            var genreName = '';
            for (var i = 0; i < $scope.genres.length; i++) {
                if ($scope.genres[i]._id === $scope.text) {
                    $scope.genreName = $scope.genres[i].name;
                }
            }
        });
    }

    $scope.getBooksByAuthor = function() {
        $scope.text = $routeParams.name;
        $http.get(root + '/api/books/author/' + $scope.text).success(function(response) {
            $scope.books = response;
        });
    }

    $scope.getBanner = function() {
            $http.get(root + '/api/banners/').success(function(response) {
                $scope.banners = response;
            });
        }
        //Datepicker
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    //

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
    $scope.init = function() {
        $scope.user = $cookieStore.get('user');
        $scope.token = $cookieStore.get('token');
    }
    $scope.isLogged = function() {
        return $cookieStore.get('token') != undefined;
    }
    $scope.logOut = function() {
        $cookieStore.remove('token');
        $cookieStore.remove('user');
    }
    $scope.viewProfile = function() {
        var token = $cookieStore.get('token');
        if (token === undefined) {
            $location.url("/login")
        }
    }
    $scope.summitLogin = function() {
        $http.post(root + '/api/auth', $scope.loginUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                $location.url("/")
            } else {
                //Raise Error
                alert(response.message);
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });;
    }
    $scope.summitSignup = function() {
        $http.post(root + '/api/signup/', $scope.signUpUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                $location.url("/")
            } else {
                //Raise Error
                alert(response.message);
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }

}]);
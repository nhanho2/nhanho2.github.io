myApp.controller('bookCtrl', ['$scope', '$http', '$location', '$routeParams', 'cartOrder', '$cookieStore', function($scope, $http, $location, $routeParams, cartOrder, $cookieStore) {
    console.log('bookCtrl loaded...');
    var root = 'https://green-web-bookstore.herokuapp.com';
    $scope.loaded = false;
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
            $scope.loaded = true;
        });
    }

    $scope.getBook = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/' + id).success(function(response) {
            $scope.book = response;
            var rateTotal = 0;
            var rateLength = 0;
            for (var i = 0; i < $scope.book.comments.length; i++) {
                if ($scope.book.comments[i].hasOwnProperty('rate')) {
                    rateTotal += $scope.book.comments[i].rate
                    rateLength += 1
                }
            }
            if (rateTotal == 0) {
                $scope.rateAvr = 4
            } else {
                $scope.rateAvr = rateTotal / rateLength;
            }
            $scope.save = Math.round((($scope.book.previousPrice - $scope.book.sellingPrice) / $scope.book.previousPrice) * 100);
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
            $location.url('/admin');
        });
    }

    $scope.updateBook = function() {
        var id = $routeParams.id;
        $http.put(root + '/api/books/' + id, $scope.book).success(function(response) {
            $location.url('/admin');
        });
    }

    $scope.removeBook = function(id) {
        $http.delete(root + '/api/books/' + id).success(function(response) {
            $location.url('/admin');
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

    $scope.comment = {};
    $scope.addComment = function(post) {
        if ($scope.comment.commentBody.length > 0 && $scope.comment.rate > 0) {
            $scope.comment.createdDate = Date.now();
            $scope.comment.userId = $scope.user._id;
            $scope.comment.bookId = post._id;
            $http.post(root + '/api/books/comment', $scope.comment).success(function(response) {
                $scope.comment.commentBody = '';
                $scope.getBook();
                $scope.miss = '';
            });
        } else {
            $scope.miss = "Bạn chưa để lại ý kiến hoặc chưa đánh giá điểm.";
        }
    }

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
            $location.url("/login");
        }
    }

    $scope.summitLogin = function() {
        $http.post(root + '/api/users/auth', $scope.loginUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
            } else {
                //Raise Error

                $scope.error = "";
                if (response.message === "Authentication failed. User not found.") {
                    $scope.error = "Không tìm thấy người dùng";
                } else if (response.message === "Authentication failed. Wrong password.") {
                    $scope.error = "Sai mật khẩu vui lòng nhập lại";
                } else {
                    $scope.error = "";
                }
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }

    $scope.summitSignup = function() {
        $http.post(root + '/api/users/signup', $scope.signUpUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                $location.url('/');
            } else {
                //Raise Error
                alert(response.message);
                $scope.error = "";
                if (response.message === "That email is already taken.") {
                    $scope.error = "Email đã được dùng.";
                } else {
                    $scope.error = "";
                }
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }

    $scope.edit = $cookieStore.get('user');
    $scope.updateUser = function() {
        console.log($scope.edit);
        $http.put(root + '/api/users', $scope.edit).success(function(response) {
            console.log('update success');
            $scope.user = response;
            $cookieStore.put('user', response.user);
            $scope.user = $cookieStore.get('user');
            window.location.href = '/profile';
        });
    }


    $scope.qty = 1;
    $scope.all = cartOrder.total;
    $scope.sum = function() {
        cartOrder.total.totalQty = 0;
        cartOrder.total.totalPrice = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            cartOrder.total.totalPrice += $scope.cart[i].price * $scope.cart[i].quantity;
            cartOrder.total.totalQty += $scope.cart[i].quantity;
        }
    }
    $scope.addCart = function(item) {
        if ($scope.qty > 0) {
            if (cartOrder.cart.length > 0) {
                for (var i = 0; i < cartOrder.cart.length; i++) {
                    if (cartOrder.cart[i]._book === item._id) {
                        $scope.addedItem = true;
                        cartOrder.cart[i].quantity += $scope.qty;
                        cartOrder.item.quantity = cartOrder.cart.quantity;
                        $cookieStore.put('cart', cartOrder.cart);
                        $cookieStore.put('order', cartOrder.item);
                        $scope.cart = cartOrder.cart;
                    }
                }
                if ($scope.addedItem) {
                    $scope.addedItem = false;

                } else {
                    cartOrder.cart.push({ _book: item._id, title: item.title, price: item.sellingPrice, image: item.images.main, quantity: $scope.qty });
                    cartOrder.item.push({ _book: item._id, price: item.sellingPrice, quantity: $scope.qty });
                    console.log(item._id)
                    $cookieStore.put('order', cartOrder.item);
                    $cookieStore.put('cart', cartOrder.cart);
                    $scope.cart = cartOrder.cart;

                }
            } else {
                cartOrder.cart.push({ _book: item._id, title: item.title, price: item.sellingPrice, image: item.images.main, quantity: $scope.qty });
                cartOrder.item.push({ _book: item._id, price: item.sellingPrice, quantity: $scope.qty });
                $cookieStore.put('order', cartOrder.item);
                $cookieStore.put('cart', cartOrder.cart);
                $scope.cart = cartOrder.cart;

            }
        }
        $scope.sum();

    }


    $scope.removeCart = function(item) {
        $scope.cart.splice(item, 1);
        cartOrder.item.splice(item, 1);
        $scope.all.totalPrice = 0;
        $scope.sum();
        $cookieStore.put('order', cartOrder.item);
        $cookieStore.put('cart', cartOrder.cart);

    }
}]);
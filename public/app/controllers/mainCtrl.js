angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function (Auth, $timeout, $location, $rootScope) {
        var app = this;

        app.loadMe = false;


        $rootScope.$on('$routeChangeStart', function () {
            if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                Auth.getUser().then(function (data) {
                    app.userFirstName = data.data.firstName;
                    app.userLastName  = data.data.lastName;
                    app.username      = data.data.username;
                    app.userEmail     = data.data.email;
                    app.loadMe = true;

                });
            } else {
                app.isLoggedIn = false;
                app.userFirstName = '';
                app.loadMe = true;

            }

        });

        this.doLogin = function (loginData) {
            app.loading = true;
            app.errorMessage = false;

            Auth.login(app.loginData).then(function (data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMessage = data.data.message + '...redirecting';
                    $timeout(function () {
                        $location.path('/shop');
                        app.loginData      = '';
                        app.successMessage = false;
                    }, 2000)
                } else {
                    //create error message
                    app.loading = false;
                    app.errorMessage = data.data.message;
                }
            });
        };

        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/');
            }, 2000)
        };
    });
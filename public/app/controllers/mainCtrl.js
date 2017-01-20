angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function (Auth, $timeout, $location) {
        var app = this;

        this.doLogin = function (loginData) {
            app.loading = true;
            app.errorMessage = false;

            Auth.login(app.loginData).then(function (data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMessage = data.data.message + '...redirecting';
                    $timeout(function () {
                        $location.path('/shop');
                    }, 1500)
                } else {
                    //create error message
                    app.loading = false;
                    app.errorMessage = data.data.message;
                }
            })
        }
    });
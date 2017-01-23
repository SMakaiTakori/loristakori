angular.module('userController', ['userServices'])

    .controller('regCtrl', function ($http, $location, $timeout, User) {

        var app = this;

        this.regUser = function (regData) {
            app.loading = true;
            app.errorMessage = false;
            User.create(app.regData).then(function (data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMessage = data.data.message + '...redirecting';
                    $timeout(function () {
                        $location.path('/signin');
                    }, 2000)
                } else {
                    //create error message
                    app.loading = false;
                    app.errorMessage = data.data.message;
                }
            })
        }
    })

.controller('facebookCtrl', function ($routeParams) {
    // Auth.facebook(token);
    console.log('testing facebook controller');
});
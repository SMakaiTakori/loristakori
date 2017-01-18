angular.module('appRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/templates/home.html'
        })
        .when('/signin',  {
            templateUrl:  'app/views/templates/users/signin.html'
        })
        .when('/signup',  {
            templateUrl:  'app/views/templates/users/signup.html',
            controller:   'regCtrl',
            controllerAs: 'register'
        })
        .when('/shop', {
            templateUrl: 'app/views/templates/shop.html'
        })

        .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode({
        enabled:     true,
        requireBase: false
    });
});
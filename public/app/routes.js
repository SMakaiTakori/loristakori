var app = angular.module('appRoutes', ['ngRoute'])

    app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl:   'app/views/templates/home.html'
        })
        .when('/signin',  {
            templateUrl:   'app/views/templates/users/signin.html',
            authenticated: false
        })
        .when('/signup',  {
            templateUrl:   'app/views/templates/users/signup.html',
            controller:    'regCtrl',
            controllerAs:  'register',
            authenticated: false
        })
        .when('/shop', {
            templateUrl:   'app/views/templates/shop.html',
            authenticated: true
        })
        .when('/logout', {
            templateUrl:   'app/views/templates/users/logout.html',
            authenticated: true
        })
        .when('/profile', {
            templateUrl:   'app/views/templates/users/profile.html',
            authenticated: true
        })
        .when('/facebook/:token', {
            templateUrl:   'app/views/templates/users/social/social.html',
            controller:    'facebookCtrl',
            controllerAs:  'facebook',
            authenticated: false
        })
        .when('/art_gallery', {
            templateUrl:   'app/views/templates/art_gallery.html'
        })
        .when('/contact', {
            templateUrl:   'app/views/templates/contact.html'
        })

        .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode({
        enabled:     true,
        requireBase: false
    });
});

app.run(['$rootScope', 'Auth', '$location', function ($rootScope, Auth, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if (next.$$route.authenticated == true) {
            if (!Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path('/');
            }
        } else if (next.$$route.authenticated == false) {
            if (Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile');
            }
        }
    });
}]);


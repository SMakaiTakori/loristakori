angular.module('userController', [])

.controller('regCtrl', function () {
    this.regUser = function (regData) {
        console.log('Testing new button');
        console.log(regData);
    }
});
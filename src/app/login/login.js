angular.module('progradeApp')

    .config(LoginConfig)
    .controller('LoginCtrl', LoginController)
    ;

function LoginConfig($stateProvider) {
    $stateProvider
        .state('login', {
            templateUrl: 'login/templates/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'Login',
            url: '/login',
            data: { componentName: 'Login' }
        });
}

function LoginController($state, $http, toastr, $rootScope, $scope, $auth) {
    var vm = this;

    vm.authenticate = function (provider) {
        $auth.authenticate(provider)
            .then(function (response) {
                $state.go('home');
            })
            .catch(function (response) {
                toastr.error(response);
            });
    };
}
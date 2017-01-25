angular.module('progradeApp', [
    'ngSanitize',
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngTouch',
    'snap',
    'ui.tree',
    'ui.router',
    'ui.bootstrap',
    'LocalForageModule',
    'toastr',
    'cgBusy',
    'jcs-autoValidate'
])
    .controller('AppCtrl', AppCtrl)
    .config(Routing)
    .config( ErrorHandling );

function Routing( $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider ) {
    $urlMatcherFactoryProvider.strictMode(false);
    $urlRouterProvider.otherwise( '/home' );
    $locationProvider.html5Mode(true);
}

function ErrorHandling( $provide ) {
    $provide.decorator('$exceptionHandler', handler);

    function handler( $delegate, $injector ) {
        return function( ex, cause ) {
            $delegate(ex, cause);
            $injector.get('toastr').error(ex.data ? (ex.data.error || (ex.data.Errors ? ex.data.Errors[0].Message : ex.data)) : ex.message, 'Error');
        };
    }
}

function AppCtrl($rootScope, $state) {
    var vm = this;
}
angular.module('clayApp', [
    'ngSanitize',
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngTouch',
    'ngCookies',
    'snap',
    'ui.tree',
    'ui.router',
    'ui.bootstrap',
    'LocalForageModule',
    'toastr',
    'cgBusy',
    'jcs-autoValidate',
    'naif.base64',
    'ngClipboard',
    'ui.toggle',
    'clayfooter',
    'claynav',
    'jplayer',
    angularDragula(angular),
    'lz-string',
    'forms',
    'confetti',
    'updateMeta',
    'base64',
    'ng.deviceDetector',
    'customvalidation',
    'imgBorderPanel',
    'countdown',
    'ng.deviceDetector',
    'btn'
])
    .controller('AppCtrl', AppCtrl)
    .config(Routing)
    .config(ErrorHandling)
    ;

function Routing($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $urlMatcherFactoryProvider.strictMode(false);
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}

function ErrorHandling($provide) {
    $provide.decorator('$exceptionHandler', handler);

    function handler($delegate, $injector) {
        return function (ex, cause) {
            $delegate(ex, cause);
            $injector.get('toastr').error(ex.data ? (ex.data.error || (ex.data.Errors ? ex.data.Errors[0].Message : ex.data)) : ex.message, 'Error');
        };
    }
}

function AppCtrl($rootScope, $state, $q, toastr) {
    var vm = this;
    var appname = "Clay's Angular Base App"

    $rootScope.$on('loadStart', function () {
        vm.loading = true;
    });
    $rootScope.$on('loadStop', function () {
        vm.loading = false;
    });

    function cleanLoadingIndicators() {
        if (vm.contentLoading && vm.contentLoading.promise && !vm.contentLoading.promise.$cgBusyFulfilled) vm.contentLoading.resolve(); //resolve leftover loading promises
    }

    $rootScope.$on('$stateChangeStart', function (e, toState) {
        cleanLoadingIndicators();
        var defer = $q.defer();
        //defer.delay = 200;
        defer.wrapperClass = 'indicator-container';
        toState.data && toState.data.loadingMessage ? defer.message = toState.data.loadingMessage : defer.message = null;
        defer.templateUrl = 'base/templates/view.loading.tpl.html';
        vm.contentLoading = defer;
    });

    $rootScope.$on('$stateChangeSuccess', function (e, toState) {
        cleanLoadingIndicators();
        if (toState.data && toState.data.componentName) {
            vm.title = toState.data.componentName;
        } else {
            vm.title = appname;
        }
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        cleanLoadingIndicators();
        console.log(error);
    });
}
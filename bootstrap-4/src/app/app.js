angular.module('clayApp', [
    'ngSanitize',
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngTouch',
    'ngCookies',
    'ui.tree',
    'ui.router',
    'ui.bootstrap',
    'LocalForageModule',
    'toastr',
    'cgBusy',
    'jcs-autoValidate',
    'imgSpinner',
    'btn'
])
    .controller('AppCtrl', AppCtrl)
    .config(Routing)
    .config(ErrorHandling)
    ;

function Routing($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $urlRouterProvider.otherwise('/home');
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

angular.module('clayApp').run(function ($anchorScroll) {
    $anchorScroll.yOffset = -200;
})

function AppCtrl($rootScope, $state, $q, toastr, $location, $sce) {
    var vm = $rootScope.currentScope = this;
    var appname = "Clay Angular Base App";

    $rootScope.$on('loadStart', function (e, message) {
        cleanLoadingIndicators();
        var defer = $q.defer();
        defer.wrapperClass = 'indicator-container';
        defer.templateUrl = 'base/templates/view.loading.tpl.html';
        defer.message = message;
        vm.contentLoading = defer;
    });

    $rootScope.$on('loadStop', function () {
        cleanLoadingIndicators();
    });

    $rootScope.trustify = function (input) {
        return $sce.trustAsResourceUrl(input);
    };
    $rootScope.trustifyHTML = function (input) {
        return $sce.trustAsHtml(input);
    }

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
            vm.title = appname + " - " + toState.data.componentName;
        } else {
            vm.title = appname;
        }
    });

    $rootScope.$on('changeTitle', function (e, title) {
        vm.title = title;
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        cleanLoadingIndicators();
        console.log(error);
    });
}
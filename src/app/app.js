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
    'jcs-autoValidate',
    'naif.base64',
    'slick',
    'ngClipboard',
    'ui.toggle',
    'satellizer'
])
    .controller('AppCtrl', AppCtrl)
    .config(Routing)
    .config(ErrorHandling)
    .config(SatellizerConfig);

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

function SatellizerConfig($authProvider) {
    $authProvider.google({
        clientId: '364424079629-6mpmh6b0l46t4kduceq3f5p8f9s3cs79.apps.googleusercontent.com',
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin + "/home/",
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        oauthType: '2.0',
        responseType: 'token',
        popupOptions: { width: 452, height: 633 },
        state: function () {
            return (Date.now() + "" + Math.random()).replace(".", "");
        },
        nonce: function () {
            return (Date.now() + "" + Math.random()).replace(".", "");
        }
    });
}

function AppCtrl($rootScope, $state, $q, toastr, $auth) {
    var vm = this;
    var appname = "Prograde Internal Administration"

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
            vm.title = toState.data.componentName + ' | ' + appname;
        } else {
            vm.title = appname;
        }
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        cleanLoadingIndicators();
        console.log(error);
    });
}
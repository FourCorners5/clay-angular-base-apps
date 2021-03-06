angular.module('clayApp')

    .config(BaseConfig)
    .controller('BaseCtrl', BaseController)
    ;

function BaseConfig($stateProvider) {

    var panelConfig = {
        left: true,
        right: false,
        top: false,
        bottom: false
    }

    var baseViews = {
        '': {
            templateUrl: 'base/templates/base.tpl.html',
            controller: 'BaseCtrl',
            controllerAs: 'base'
        }
    };

    //conditional base left
    panelConfig.left ? baseViews['left@base'] = {
        'templateUrl': 'base/templates/base.left.tpl.html'
    } : angular.noop();

    //conditional base right
    panelConfig.right ? baseViews['right@base'] = {
        'templateUrl': 'base/templates/base.right.tpl.html'
    } : angular.noop();

    //conditional base top
    panelConfig.top ? baseViews['top@base'] = {
        'templateUrl': 'base/templates/base.top.tpl.html'
    } : angular.noop();

    //conditional base bottom
    panelConfig.bottom ? baseViews['bottom@base'] = {
        'templateUrl': 'base/templates/base.bottom.tpl.html'
    } : angular.noop();

    var baseState = {
        url: '',
        abstract: true,
        views: baseViews,
        resolve: {
            NavItems: function () {
                return [{ "Display": "Home", "StateRef": "home" }, { "Display": "Reviews", "StateRef": "reviews" }];
            },
            PanelConfig: function () {
                return panelConfig;
            }
        }
    };

    $stateProvider.state('base', baseState);
}

function BaseController(NavItems, PanelConfig, $media, snapRemote, $rootScope, $state, deviceDetector) {
    var vm = this;
    vm.navItems = NavItems;
    vm.left = PanelConfig.left;
    vm.right = PanelConfig.right;

    /*
        if(deviceDetector.browser == 'ie'){
            alert("This site does not support Internet Explorer and may not display correctly. Please upgrade to Chrome, Firefox, or Edge.");
        }
    */

    vm.logout = function () {

    };

    vm.snapOptions = {
        disable: (!vm.left && vm.right) ? 'left' : ((vm.left && !vm.right) ? 'right' : 'none')
    };

    function _isMobile() {
        return $media('max-width:991px');
    }

    function _initDrawers(isMobile) {
        snapRemote.close('MAIN');
        if (isMobile && (vm.left || vm.right)) {
            snapRemote.enable('MAIN');
        } else {
            snapRemote.disable('MAIN');
        }
    }

    _initDrawers(_isMobile());

    $rootScope.$watch(_isMobile, function (n, o) {
        if (n === o) return;
        _initDrawers(n);
    });

}
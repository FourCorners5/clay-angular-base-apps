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
                return [{ "Display": "Home", "StateRef": "home" }, { "Display": "Product Spotlight", "StateRef": "productspotlight" }, { "Display": "XL1 Reps", "StateRef": "xl1reps" }, { "Display": "Glatfelter Point Calculator", "StateRef": "cartoncounter" }, { "Display": "Product Reviews", "StateRef": "productreviews" }, { "Display": "Vote", "StateRef": "vote" }];
            },
            PanelConfig: function () {
                return panelConfig;
            },
            CurrentUser: function ($auth, $state, $resource) {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                } else {
                    var user = $resource("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + $auth.getToken(), {}, {}).get();
                    return user.$promise;
                }
            }

        }
    };

    $stateProvider.state('base', baseState);
}

function BaseController(NavItems, PanelConfig, $media, snapRemote, $rootScope, $auth, CurrentUser, $state) {
    var vm = this;
    vm.navItems = NavItems;
    vm.left = PanelConfig.left;
    vm.right = PanelConfig.right;
    vm.isAuthenticated = false;
    vm.currentUser = CurrentUser;

        vm.logout = function () {
        $auth.logout().then(function () {
            vm.currentUser = null;
            $state.go('login');
        });
    };

    if (!vm.currentUser || (vm.currentUser && vm.currentUser.hd != 'prograde.com')) {
        vm.logout();
    } else {
        vm.isAuthenticated = true;
    }

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
angular.module('progradeApp')

    .config(BaseConfig)
    .controller('BaseCtrl', BaseController)
    ;

function BaseConfig($stateProvider) {

    var panelConfig = {
        left: true,
        right: false,
        top: true,
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
                return [{ "Display": "Home", "StateRef": "home" }];
            },
            PanelConfig: function(){
                return panelConfig;
            }
        }
    };

    $stateProvider.state('base', baseState);
}

function BaseController(NavItems, PanelConfig) {
    var vm = this;
    vm.navItems = NavItems;
    vm.left = PanelConfig.left;
    vm.right = PanelConfig.right;
}
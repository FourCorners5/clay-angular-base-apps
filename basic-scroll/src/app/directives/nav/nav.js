angular.module('nav', []);
angular.module('nav')

    .directive('navigation', nav)
    .controller('navCtrl', navCtrl)
    ;

function nav() {
    return {
        restrict: 'E',
        templateUrl: 'directives/nav/templates/nav.tpl.html',
        controller: 'navCtrl',
        controllerAs: 'nav',
        replace: true
    }
}

function navCtrl($state) {
    var vm = this;

    vm.navItems = [
        {
            "StateRef": "home",
            "Anchor": "page-top",
            "Display": "Home",
            "Icon": "fa fa-home"
        },
        {
            "StateRef": "home",
            "Anchor": "about",
            "Display": "About",
            "Icon": "fa fa-info"
        },
        {
            "StateRef": "home",
            "Anchor": "derps",
            "Display": "Derps",
            "Icon": "fa fa-gamepad"
        },
        {
            "StateRef": "contact",
            "Display": "Contact Us",
            "Icon": "fa fa-envelope"
        }
    ];

    vm.goTo = function (target, anchor) {
        if ($state.current.name == target) {
            var duration = 1000;
            var offset = 50;
            var anchorElement = angular.element('#' + anchor);
            var containerElement = angular.element('#COMPONENT_Home')
           containerElement.scrollToElementAnimated(anchorElement, offset, duration);
        }
        else {
            $state.go(target, { 'scroll': anchor });
        }
    }
}
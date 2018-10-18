angular.module('footer', []);
angular.module('footer')

    .directive('sitefooter', footer)
    .controller('footerCtrl', footerCtrl)
    ;

function footer() {
    return {
        restrict: 'E',
        templateUrl: 'directives/footer/templates/footer.tpl.html',
        controller: 'footerCtrl',
        controllerAs: 'footer',
        replace: true
    }
}

function footerCtrl($anchorScroll, $location) {
    var vm = this;

    vm.copyright = "\u00A9" + new Date().getFullYear() + " Clayton!";

    vm.scrollTo = function(loc){
        $location.hash(loc);
        $anchorScroll();
    };
}
angular.module('claynav', []);
angular.module('claynav')

    .directive('claynav', claynav)
    .controller('claynavCtrl', claynavCtrl)
    ;

function claynav() {
    return {
        restrict: 'E',
        templateUrl: 'directives/nav/templates/nav.tpl.html',
        controller: 'claynavCtrl',
        controllerAs: 'claynav',
        replace: true
    }
}

function claynavCtrl($scope, $location, $state) {

    $scope.isActive = function (path) {
        return $state.current.name == path;
    };
    $scope.links = [
        {
            "URL": "home",
            "Name": "Home"
        },
        {
            "URL": "reviews",
            "Name": "Reviews"
        }
    ];
}
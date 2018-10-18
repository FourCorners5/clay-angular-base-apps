angular.module('clayfooter', []);
angular.module('clayfooter')

    .directive('clayfooter', clayfooter)
    .controller('clayfooterCtrl', clayfooterCtrl)
    ;

function clayfooter() {
    return {
        restrict: 'E',
        templateUrl: 'directives/footer/templates/footer.tpl.html',
        controller: 'clayfooterCtrl',
        controllerAs: 'clayfooter',
        replace: true
    }
}

function clayfooterCtrl($scope) {
	$scope.copyright = function () {
		var theDate = new Date()
		return "\u00A9" + theDate.getFullYear() + " Clayton Belcher";
	}();
}
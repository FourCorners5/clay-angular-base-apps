angular.module('forms', []);
angular.module('forms')

    .directive('mailchimp', mailchimp)
    .controller('mailchimpCtrl', mailchimpCtrl)

    .directive('jotform', jotform)
    .controller('jotformCtrl', jotformCtrl)
    ;

function mailchimp() {
    return {
        restrict: 'E',
        templateUrl: 'directives/forms/templates/mailchimp.tpl.html',
        controller: 'mailchimpCtrl',
        controllerAs: 'mailchimp',
        replace: true
    }
}

function mailchimpCtrl($scope) {

}

function jotform() {
    return {
        restrict: 'E',
        templateUrl: 'directives/forms/templates/jotform.tpl.html',
        controller: 'jotformCtrl',
        controllerAs: 'jotform',
        replace: true
    }
}

function jotformCtrl($scope) {
var vm = this;
	vm.submit = function () {
		document.getElementById("82827506651158").submit();
	}
}
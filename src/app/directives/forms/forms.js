angular.module('forms', []);
angular.module('forms')

    .directive('mailchimp', mailchimp)
    .controller('mailchimpCtrl', mailchimpCtrl)

    .directive('mailchimpextended', mailchimpextended)
    .controller('mailchimpextendedCtrl', mailchimpextendedCtrl)

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

function mailchimpextended() {
    return {
        restrict: 'E',
        templateUrl: 'directives/forms/templates/mailchimpextended.tpl.html',
        controller: 'mailchimpextendedCtrl',
        controllerAs: 'mailchimpextended',
        replace: true
    }
}

function mailchimpextendedCtrl($scope) {
    $scope.firstButton = true;
    $scope.secondButton = true;
    $scope.thirdButton = true;
    $scope.fourthButton = true;
    $scope.fifthButton = true;
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

}
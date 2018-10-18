angular.module('imgBorderPanel', []);
angular.module('imgBorderPanel')

    .directive('imgBorderPanel', imgBorderPanel)
    .controller('imgBorderPanelCtrl', imgBorderPanelCtrl)
    ;

function imgBorderPanel() {
    return {
        restrict: 'E',
        templateUrl: 'directives/img-border-panel/templates/img-border-panel.tpl.html',
        controller: 'imgBorderPanelCtrl',
        controllerAs: 'imgBorderPanel',
        scope: {
            imgGroup: '@'
        },
        transclude: true,
        link: function (scope, el, attrs, ctrl, transclude) {
        }
    }
}

function imgBorderPanelCtrl($scope) {

}
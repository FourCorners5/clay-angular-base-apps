angular.module('clayApp')

    .config(BaseConfig)
    .controller('BaseCtrl', BaseController)
    .controller('messageModalCtrl', messageModalController)
    ;

function BaseConfig($stateProvider) {
    $stateProvider.state('base', {
        url: '',
        abstract: true,
        templateUrl: 'base/templates/base.tpl.html',
        controller: 'BaseCtrl',
        controllerAs: 'base'
    });
}

function BaseController($media, $rootScope) {
    var vm = $rootScope.currentScope = this;

    vm.siteVersion = "0.0.1";

}

function messageModalController($scope, $sce, $uibModalInstance, header, body, closeDisplay, dismissDisplay) {
    var vm = this;

    vm.header = header;
    vm.body = body;
    vm.closeDisplay = closeDisplay;
    vm.dismissDisplay = dismissDisplay;

    vm.close = function () {
        $uibModalInstance.close();
    }

    vm.dismiss = function () {
        $uibModalInstance.dismiss();
    }

}
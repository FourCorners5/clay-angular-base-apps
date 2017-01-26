angular.module('progradeApp')

    .config(ProductSpotlightConfig)
    .controller('ProductSpotlightCtrl', ProductSpotlightController)
    .controller('ProductSpotlightBuyerCtrl', ProductSpotlightBuyerController)
    ;

function ProductSpotlightConfig($stateProvider) {
    $stateProvider
        .state('productspotlight', {
            parent: 'base',
            templateUrl: 'productspotlight/templates/productspotlight.tpl.html',
            controller: 'ProductSpotlightCtrl',
            controllerAs: 'productSpotlight',
            url: '/productspotlight',
            data: { componentName: 'ProductSpotlight' },
            resolve: {
                BuyerList: function () {
                    return [{Name: "Home Helpers", ID: "homehelpers"},{Name: "First Financial Bank", ID: "ffb"}];
                }
            }
        })
        .state('productspotlight.buyer', {
            url: '/:buyerid',
            templateUrl: 'productspotlight/templates/productspotlightBuyer.tpl.html',
            controller: 'ProductSpotlightBuyerCtrl',
            controllerAs: 'productSpotlightBuyer'
        });
}

function ProductSpotlightController($state, BuyerList) {
    var vm = this;
    vm.list = BuyerList;
}

function ProductSpotlightBuyerController($state) {
    var vm = this;
}
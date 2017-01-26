angular.module('clayApp')

    .config(ProductsConfig)
    .controller('ProductsCtrl', ProductsController)
    .controller('ProductCreateCtrl', ProductCreateController)
    ;

function ProductsConfig($stateProvider) {
    $stateProvider
        .state('products', {
            parent: 'base',
            templateUrl: 'products/templates/products.tpl.html',
            controller: 'ProductsCtrl',
            controllerAs: 'products',
            url: '/products?from&to&search&page&pageSize&searchOn&sortBy&filters',
            data: { componentName: 'Products' },
            resolve: {
                CategoryList: function () {
                    return ["cake", "cake"];
                }
            }
        })
        .state('products.create', {
            url: '/create',
            templateUrl: 'products/templates/productCreate.tpl.html',
            controller: 'ProductCreateCtrl',
            controllerAs: 'productCreate'
        });
}

function ProductsController($state) {
    var vm = this;
}

function ProductCreateController($state) {
    var vm = this;
}
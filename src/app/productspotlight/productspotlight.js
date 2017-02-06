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
                BuyerList: function ($http) {
                    return $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/getallbuyerconfigs", method: 'POST', data: { "key": "delighted" } }).then(function (response) {
                        if (function () {
                            try {
                                JSON.parse(JSON.stringify(response.data));
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }()) {
                            return response.data;
                        }
                        else {
                            console.log(response.data);
                        }
                    });
                },
            }
        })
        .state('productspotlight.buyer', {
            url: '/:buyerid',
            templateUrl: 'productspotlight/templates/productspotlightBuyer.tpl.html',
            controller: 'ProductSpotlightBuyerCtrl',
            controllerAs: 'productSpotlightBuyer',
            resolve: {
                SelectedBuyer: function ($http, $stateParams) {
                    return $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/getbuyerconfig", method: 'POST', data: { "key": "delighted", "ID": parseInt($stateParams.buyerid) } }).then(function (response) {
                        if (function () {
                            try {
                                JSON.parse(JSON.stringify(response.data));
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }()) {
                            return response.data;
                        }
                        else {
                            console.log(response.data);
                        }
                    });
                },
                Products: function ($http, $stateParams) {
                    return $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/getallspotlightproducts", method: 'POST', data: { "key": "delighted", "ID": parseInt($stateParams.buyerid) } }).then(function (response) {
                        if (function () {
                            try {
                                JSON.parse(JSON.stringify(response.data));
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }()) {
                            return response.data;
                        }
                        else {
                            console.log(response.data);
                        }
                    });
                }
            }
        });
}

function ProductSpotlightController($state, BuyerList, $http, toastr, $rootScope) {
    var vm = this;
    vm.list = BuyerList;

    vm.createBuyer = function () {
        vm.newBuyer = {};
        vm.creatingBuyer = true;
    };

    vm.cancelCreate = function () {
        vm.creatingBuyer = false;
        delete vm.newBuyer;
    };

    vm.saveBuyer = function () {
        $rootScope.$broadcast('loadStart');
        $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/getallbuyerconfigs", method: 'PUT', data: { "key": "delighted", "Name": vm.newBuyer.Name } }).then(function (response) {
            if (function () {
                try {
                    JSON.parse(JSON.stringify(response.data));
                } catch (e) {
                    return false;
                }
                return true;
            }() && response.status == 200) {
                $rootScope.$broadcast('loadStop');
                $state.go('productspotlight', {}, { reload: true });
                toastr.success('Buyer Created', 'Success');
            }
            else {
                console.log(response.data);
            }
        });
    };

    vm.deleteBuyer = function (id) {
        if (confirm("Are you sure you want to delete this buyer? Please notify the developers before doing so.")) {

            $rootScope.$broadcast('loadStart');
            $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/deletebuyer", method: 'PUT', data: { "key": "delighted", "ID": id } }).then(function (response) {
                if (response.status == 200) {

                    $rootScope.$broadcast('loadStop');
                    $state.go('productspotlight', {}, { reload: true });
                    toastr.success('Buyer Deleted', 'Success');
                }
                else {
                    console.log(response.data);
                }
            });
        }
    };
}

function ProductSpotlightBuyerController($state, SelectedBuyer, Products, $http, $rootScope, toastr, $scope, ngClipboard, $document, $compile) {
    var vm = this;
    vm.data = {}
    vm.data.Buyer = SelectedBuyer[0];
    vm.data.Products = Products;
    vm.separatorStyle = !vm.data.Buyer.DisplaySeparators ? '' : ".slick-active {border-right: solid 1px " + vm.data.Buyer.SeparatorColor + ";margin-right: -1px;}.slick-prev:before,.slick-next:before{color: " + vm.data.Buyer.SeparatorColor + ";} .img-center {margin-right:auto; margin-left:auto;}";
    vm.featuredCount = 0;
    angular.forEach(vm.data.Products, function (product) {
        product.modelMimic = product.Featured;
        if (product.Featured) {
            vm.featuredCount++;
        }
    });

    vm.changed = false;

    vm.refreshSlider = function () {
        $('#sliderHolder').empty();
        var newSlider = '<productspotlight buyerid=' + vm.data.Buyer.ID + '></productspotlight>';
        var sliderHolder = $('#sliderHolder').eq(0);
        sliderHolder.append($compile(newSlider)($scope));
    };

    var colorPicker = $('#colorpicker').colorpicker();
    colorPicker.colorpicker('setValue', vm.data.Buyer.SeparatorColor);
    colorPicker.on('changeColor',
        function (ev) {
            vm.data.Buyer.SeparatorColor = $('#colorpicker').colorpicker('getValue');
            vm.changed = true;
            $scope.$apply();
        });

    $scope.$watch('productSpotlightBuyer.data.Buyer', function (n, o) {
        if (n !== o) {
            vm.changed = true;
        }
    }, true);

    vm.updateBuyerConfig = function () {
        if (confirm("Save changes?")) {
            $rootScope.$broadcast('loadStart');
            vm.changed = false;
            $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/updatebuyerconfig", method: 'PUT', data: { "key": "delighted", "ID": vm.data.Buyer.ID, "DisplaySeparators": vm.data.Buyer.DisplaySeparators, "DisplayArrows": vm.data.Buyer.DisplayArrows, "DisplayRatings": vm.data.Buyer.DisplayRatings, "MaximumDisplayTime": vm.data.Buyer.MaximumDisplayTime, "SeparatorColor": vm.data.Buyer.SeparatorColor } }).then(function (response) {
                if (response.status == 200) {
                    $state.go('.', {}, { reload: true });
                    toastr.success('Buyer Updated', 'Success');
                }
                else {
                    console.log(response.data);
                }
                $rootScope.$broadcast('loadStop'); vm.refreshSlider();
            });
        }
    };

    vm.moveUp = function (product) {
        $('#sliderHolder').empty();
        var theChosenOne;
        angular.forEach(vm.data.Products, function (item) {
            if (item.Order == product.Order - 1) {
                item.Order++;
                theChosenOne = item;
            }
        });
        product.Order--;

        $rootScope.$broadcast('loadStart');
        $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/updatespotlightproduct", method: 'PUT', data: { "key": "delighted", "ID": product.ID, "BuyerID": product.BuyerID, "Order": product.Order } }).then(function (response) {
            if (response.status == 200) {
                $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/updatespotlightproduct", method: 'PUT', data: { "key": "delighted", "ID": theChosenOne.ID, "BuyerID": product.BuyerID, "Order": theChosenOne.Order } }).then(function (response) {
                    if (response.status == 200) {
                        toastr.success('Products Updated', 'Success');
                    }
                    else {
                        console.log(response.data);
                    }
                    $rootScope.$broadcast('loadStop'); vm.refreshSlider();
                });
            }
            else {
                console.log(response.data);
            }
        });
    };

    vm.moveDown = function (product) {
        $('#sliderHolder').empty();
        var theChosenOne;
        angular.forEach(vm.data.Products, function (item) {
            if (item.Order == product.Order + 1) {
                item.Order--;
                theChosenOne = item;
            }
        });
        product.Order++;

        $rootScope.$broadcast('loadStart');
        $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/updatespotlightproduct", method: 'PUT', data: { "key": "delighted", "ID": product.ID, "BuyerID": product.BuyerID, "Order": product.Order } }).then(function (response) {
            if (response.status == 200) {
                $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/updatespotlightproduct", method: 'PUT', data: { "key": "delighted", "ID": theChosenOne.ID, "BuyerID": product.BuyerID, "Order": theChosenOne.Order } }).then(function (response) {
                    if (response.status == 200) {
                        toastr.success('Products Updated', 'Success');
                    }
                    else {
                        console.log(response.data);
                    }
                    $rootScope.$broadcast('loadStop'); vm.refreshSlider();
                });
            }
            else {
                console.log(response.data);
            }
        });
    };

    vm.createProduct = function () {
        vm.newProduct = {};
        vm.creatingProduct = true;
    };

    vm.cancelCreate = function () {
        vm.creatingProduct = false;
        delete vm.newProduct;
    };

    vm.saveProduct = function () {
        vm.processing = true;
        $rootScope.$broadcast('loadStart');
        $http({
            url: "https://rateproduct.prowebservicehost.com/productspotlight/createproduct", method: 'PUT', data: {
                "BuyerID": vm.data.Buyer.ID,
                "ProductID": vm.newProduct.ProductID,
                "ProductName": vm.newProduct.ProductName,
                "ProductURL": vm.newProduct.ProductURL,
                "key": "delighted",
                "ProductImage": vm.newProduct.ProductImage.base64,
                "Order": vm.data.Products.Length
            }
        }).then(function (response) {
            if (response.status == 200) {
                $state.go('.', {}, { reload: true });
                toastr.success('Product Created', 'Success');
            }
            else {
                toaster.warning('Error', 'Warning');
                console.log(response.data);
            }
            vm.processing = false;
            $rootScope.$broadcast('loadStop'); vm.refreshSlider();
        });
    };

    vm.deleteProduct = function (product) {
        if (confirm("Are you sure you want to delete this product?")) {
            $rootScope.$broadcast('loadStart');
            $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/deleteproduct", method: 'PUT', data: { "key": "delighted", "ID": product.ID, "BuyerID": product.BuyerID } }).then(function (response) {
                if (response.status == 200) {
                    $state.go('.', {}, { reload: true });
                    toastr.success('Product Deleted', 'Success');
                }
                else {
                    console.log(response.data);
                }
                $rootScope.$broadcast('loadStop'); vm.refreshSlider();
            });
        }
    };

    vm.downloadTemplate = function () {
        window.open('assets/images/product_spotlight_template.psd', '_blank');
    };

    vm.add = function () {
        vm.data.Buyer.MaximumDisplayTime++;
    };

    vm.subtract = function () {
        vm.data.Buyer.MaximumDisplayTime--;
    };

    vm.dateify = function (string) {
        return new Date(string);
    };

    vm.today = function () {
        var currentDate = new Date();
        return currentDate.toString();
    };

    vm.toggleFeature = function (product, toaster) {
        if (product.Featured && confirm("Are you sure you want to remove " + product.ProductName + " from the spotlight?")) {
            product.Featured = false;
            vm.featuredCount--;
            $rootScope.$broadcast('loadStart');
            $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/updatespotlightproduct", method: 'PUT', data: { "key": "delighted", "ID": product.ID, "BuyerID": product.BuyerID, "Featured": product.Featured, "FeaturedSince": vm.today() } }).then(function (response) {
                if (response.status == 200) {
                    //$state.go('.', {}, { reload: true });
                    product.FeaturedSince = vm.today();
                    toastr.success('Product Updated', 'Success');
                }
                else {
                    console.log(response.data);
                }
                $rootScope.$broadcast('loadStop'); vm.refreshSlider();
            });

        }
        else if (!product.Featured && confirm("Are you sure you want to feature " + product.ProductName + "?") && vm.featuredCount < 20) {
            product.Featured = true;
            vm.featuredCount++;
            $rootScope.$broadcast('loadStart');
            $http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/updatespotlightproduct", method: 'PUT', data: { "key": "delighted", "ID": product.ID, "BuyerID": product.BuyerID, "Featured": product.Featured, "FeaturedSince": vm.today() } }).then(function (response) {
                if (response.status == 200) {
                    //$state.go('.', {}, { reload: true });
                    toastr.success('Product Updated', 'Success');
                }
                else {
                    console.log(response.data);
                }
                $rootScope.$broadcast('loadStop'); vm.refreshSlider();
            });
        }
        else if (!product.Featured && vm.featuredCount == 20) {
            alert('There are already 20 products featured!');
        }
        product.modelMimic = product.Featured;
    };

    vm.daysFeatured = function (product) {
        var startDate = new Date(product.FeaturedSince);
        var currentDate = new Date();
        var timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    vm.copyHTML = function () {
        ngClipboard.toClipboard('&lt;productspotlight buyerid=' + vm.data.Buyer.ID + '&gt;&lt;/productspotlight&gt;');
    };

    vm.copyJavascript = function () {
        ngClipboard.toClipboard('&lt;script src="http://rateproduct.prowebservicehost.com/assets/productspotlight.js"&gt;&lt;/script&gt;');
    };
}
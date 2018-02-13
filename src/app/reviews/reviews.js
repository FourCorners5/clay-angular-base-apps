angular.module('clayApp')

    .config(ReviewsConfig)
    .controller('ReviewsCtrl', ReviewsController)
    ;

function ReviewsConfig($stateProvider) {
    $stateProvider
        .state('reviews', {
            parent: 'base',
            templateUrl: 'reviews/templates/reviews.tpl.html',
            controller: 'ReviewsCtrl',
            controllerAs: 'reviews',
            url: '/reviews',
            data: { componentName: 'Reviews' },
            resolve: {
            }
        })
}

function ReviewsController($state, toastr) {
    var vm = this;
}

angular.module('clayApp')

    .config(GamesConfig)
    .controller('GamesCtrl', GamesController)
    .filter('reviewstatusfilter', reviewStatusFilter)
    ;

function GamesConfig($stateProvider) {
    $stateProvider
        .state('games', {
            parent: 'base',
            templateUrl: 'games/templates/games.tpl.html',
            controller: 'GamesCtrl',
            controllerAs: 'games',
            url: '/games',
            data: { componentName: 'Games' },
            resolve: {
                ReviewList: function ($http) {
                    return $http({ url: "https://[[URL]]/getallreviews", method: 'POST', data: { "key": "delighted" } }).then(function (response) {
                        if (function () {
                            try {
                                JSON.parse(JSON.stringify(response.data));
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }()) {
                            angular.forEach(response.data, function (review) {
                                review.Review = decodeURIComponent(review.Review);
                            });
                            return response.data;
                        }
                        else {
                            console.log(response.data);
                        }
                    });
                }
            }
        })
}

function GamesController($state, ReviewList, $http, toastr, $rootScope) {
    var vm = this;
    vm.list = ReviewList;
    vm.statusFilter = {
        "false": true,
        "null": false,
        "true": false
    }
    vm.statusDisplay = {
        "false": "Unreviewed",
        "null": "Disapproved",
        "true": "Approved"
    }

    vm.deleteReview = function (id) {
        if (confirm("Are you sure you want to delete this review? This is irreversible.")) {

            $rootScope.$broadcast('loadStart');
            $http({ url: "https://[[URL]]/deletereview", method: 'PUT', data: { "key": "delighted", "ID": id } }).then(function (response) {
                if (response.status == 200) {

                    $rootScope.$broadcast('loadStop');
                    vm.refreshList();
                    toastr.success('Review Deleted', 'Success');
                }
                else {
                    console.log(response.data);
                }
            });
        }
    };

    vm.refreshList = function () {
        $rootScope.$broadcast('loadStart');
        $http({ url: "https://[[URL]]/getallreviews", method: 'POST', data: { "key": "delighted" } }).then(function (response) {
            if (function () {
                try {
                    JSON.parse(JSON.stringify(response.data));
                } catch (e) {
                    return false;
                }
                return true;
            }()) {
                angular.forEach(response.data, function (review) {
                    review.Review = decodeURIComponent(review.Review);
                });
                vm.list = response.data;
                $rootScope.$broadcast('loadStop');
            }
            else {
                console.log(response.data);
                $rootScope.$broadcast('loadStop');
            }
        });
    };

    vm.updateReview = function (id, status) {
        var newValue = status || null;
        if (confirm("Are you sure you want to " + (newValue ? "approve" : "disapprove") + " this review?")) {

            $rootScope.$broadcast('loadStart');
            $http({ url: "https://[[URL]]/updatereview", method: 'PUT', data: { "key": "delighted", "ID": id, "ReviewApproved": newValue } }).then(function (response) {
                if (response.status == 200) {

                    $rootScope.$broadcast('loadStop');
                    vm.refreshList();
                    toastr.success('Review Updated', 'Success');
                }
                else {
                    console.log(response.data);
                }
            });
        }
    };
}

function reviewStatusFilter() {
    return function (value, statusFilter) {
        var output = [];
        angular.forEach(value, function (v) {
            if (statusFilter[v.ReviewApproved]) {
                output.push(v);
            }
        });
        return output;
    }
}


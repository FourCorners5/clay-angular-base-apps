angular.module('clayApp')

    .config(VoteConfig)
    .controller('VoteCtrl', VoteController)
    .controller('VotePollCtrl', VotePollController)
    ;

function VoteConfig($stateProvider) {
    $stateProvider
        .state('vote', {
            parent: 'base',
            templateUrl: 'vote/templates/vote.tpl.html',
            controller: 'VoteCtrl',
            controllerAs: 'vote',
            url: '/vote',
            data: { componentName: 'Vote' },
            resolve: {
                PollList: function ($http) {
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
        .state('vote.buyer', {
            url: '/:buyerid',
            templateUrl: 'vote/templates/votePoll.tpl.html',
            controller: 'VotePollCtrl',
            controllerAs: 'votePollCtrl'
        });
}

function VoteController($state, $http, toastr, $rootScope) {
    var vm = this;

}

function VotePollController($state, SelectedBuyer, Products, $http, $rootScope, toastr, $scope, ngClipboard, $document, $compile) {
    var vm = this;
}
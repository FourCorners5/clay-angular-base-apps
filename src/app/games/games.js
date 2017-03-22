angular.module('clayApp')

    .config(GamesConfig)
    .controller('GamesCtrl', GamesController)
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
            }
        })
}

function GamesController($state, toastr) {
    var vm = this;
}

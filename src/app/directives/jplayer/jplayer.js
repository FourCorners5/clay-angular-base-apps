angular.module('jplayer', []);
angular.module('jplayer')

    .directive('jplayer', jplayer)
    ;

function jplayer($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'directives/jplayer/templates/jplayer.tpl.html',
        scope: {
            'track': '@'
        },
        link: function (scope, el, attr) {
            scope.randomID = Math.floor(Math.random() * 1000000000);
            $timeout(function () {
                var jPlayer = angular.element('#jquery_jplayer_' + scope.randomID).jPlayer({
                    ready: function () {
                        $(this).jPlayer("setMedia", {
                            mp3: scope.track
                        });
                    },
                    play: function () { // To avoid multiple jPlayers playing together.
                        $(this).jPlayer("pauseOthers");
                    },
                    swfPath: "player",
                    supplied: "mp3",
                    wmode: "window",
                    cssSelectorAncestor: "#jp_container_" + scope.randomID,
                    smoothPlayBar: true,
                    keyEnabled: true
                });
            });
        },
        replace: true
    }
}
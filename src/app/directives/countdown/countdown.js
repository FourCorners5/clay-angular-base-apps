angular.module('countdown', []);
angular.module('countdown')

    .directive('countdown', countdown)
    .controller('countdownCtrl', countdownCtrl)
    ;

function countdown() {
    return {
        restrict: 'E',
        templateUrl: 'directives/countdown/templates/countdown.tpl.html',
        controller: 'countdownCtrl',
        controllerAs: 'countdown',
        replace: true,
        scope: {
            targetdate: '=',
            finishmessage: '='
        }
    }
}

function countdownCtrl($scope, $interval) {

    $scope.displayStr = "";
    //$scope.backcolor = "#0d0d0d";
    //$scope.forecolor = "white";
    $scope.displayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
    $scope.countActive = true;
    $scope.countStepper = -1;
    $scope.leadingZero = false;

    function calcage(secs, num1, num2) {
        var s = ((Math.floor(secs / num1)) % num2).toString();
        if ($scope.leadingZero && s.length < 2) {
            s = "0" + s;
        }
        return s;
    }

    $scope.countBack = function (secs) {
        if (secs < 0) {
            $scope.displayStr = $scope.finishmessage;
            return;
        }
        $scope.displayStr = $scope.displayFormat.replace(/%%D%%/g, calcage(secs, 86400, 100000));
        $scope.displayStr = $scope.displayStr.replace(/%%H%%/g, calcage(secs, 3600, 24));
        $scope.displayStr = $scope.displayStr.replace(/%%M%%/g, calcage(secs, 60, 60));
        $scope.displayStr = $scope.displayStr.replace(/%%S%%/g, calcage(secs, 1, 60));
        $scope.gsecs = secs;
    }

    $scope.countStepper = Math.ceil($scope.countStepper);
    if ($scope.countStepper == 0) {
        $scope.countActive = false;
    }
    var SetTimeOutPeriod = (Math.abs($scope.countStepper) - 1) * 1000 + 990;
    var dthen = new Date($scope.targetdate);
    var dnow = new Date();
    var ddiff;
    if ($scope.countStepper > 0)
        ddiff = new Date(dnow - dthen);
    else
        ddiff = new Date(dthen - dnow);
    $scope.gsecs = Math.floor(ddiff.valueOf() / 1000) - $scope.countStepper;
    if ($scope.countActive) {
        $interval(function () { $scope.countBack($scope.gsecs + $scope.countStepper); }, SetTimeOutPeriod);
    }
}
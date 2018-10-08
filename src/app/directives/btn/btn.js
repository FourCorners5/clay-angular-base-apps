angular.module('btn', []);
angular.module('btn')

    .directive('icon', icon)
    .directive('btn', btn)
    .directive('btnSuccess', btnSuccess)
    .directive('btnPrimary', btnPrimary)
    .directive('btnDefault', btnDefault)
    .directive('btnWarning', btnWarning)
    .directive('btnInfo', btnInfo)
    .directive('btnSecondary', btnSecondary)
    .directive('btnDanger', btnDanger)
    .directive('btnLink', btnLink) // This is distinct from btnLinkFn, which is a weird naming coincidence.
    ;

function btnLinkFn(scope, el, attrs, ctrl, transclude) {
    var types = ['btnSuccess', 'btnPrimary', 'btnDefault', 'btnWarning', 'btnInfo', 'btnSecondary', 'btnDanger', 'btnLink', 'btnBlock'];
    if (attrs.ngModel) {// if (!attrs.ngClick && attrs.ngModel) { // Swap this comment out with the current line if you want ng-click to override ng-model toggling.
        el.bind("click", function (e) {
            scope.$apply(function () {
                scope.ngModel = !scope.ngModel;
            });
        })
    }
    angular.forEach(types, function (t) {
        if (attrs.hasOwnProperty(t) && attrs[t] === '') { //  || el[0].tagName == t // Check if button type attribute is present or the tag name, and manually set it to true (before replace was set to true, now just former)
            scope[t] = true;
        }
    });
}

function icon() {
    return {
        restrict: 'E',
        template: '<i class="fa fa-{{icon}}" />',
        scope: {
            fa: '@',
            ngModel: '='
        },
        replace: true,
        link: function (scope, el, attrs) {
            if (attrs.fa) {
                scope.icon = attrs.fa;
            }
            if ('true' in attrs && 'false' in attrs && 'ngModel' in attrs) {
                scope.$watch('ngModel', function (n, o) {
                    scope.icon = n ? attrs.true : attrs.false;
                });
            }
        }
    }
}

function btn() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnSuccess: '=?',
            btnPrimary: '=?',
            btnDefault: '=?',
            btnWarning: '=?',
            btnInfo: '=?',
            btnSecondary: '=?',
            btnDanger: '=?',
            btnLink: '=?',
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn
    }
}

//The additional declarations below let you use these directives without the <btn> tag; e.g., <btn-success />

function btnSuccess() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnSuccess: true,
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn
    }
}

function btnPrimary() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn,
        controller: function ($scope) {
            $scope.btnPrimary = true;
        }
    }
}

function btnDefault() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn,
        controller: function ($scope) {
            $scope.btnDefault = true;
        }
    }
}

function btnWarning() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn,
        controller: function ($scope) {
            $scope.btnWarning = true;
        }
    }
}

function btnInfo() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn,
        controller: function ($scope) {
            $scope.btnInfo = true;
        }
    }
}

function btnSecondary() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn,
        controller: function ($scope) {
            $scope.btnSecondary = true;
        }
    }
}

function btnDanger() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn,
        controller: function ($scope) {
            $scope.btnDanger = true;
        }
    }
}

function btnLink() {
    return {
        restrict: 'E',
        templateUrl: 'directives/btn/templates/btn.tpl.html',
        replace: true,
        scope: {
            btnBlock: '=?',
            ngModel: '=?',
            icon: '@?'
        },
        transclude: true,
        link: btnLinkFn,
        controller: function ($scope) {
            $scope.btnLink = true;
        }
    }
}
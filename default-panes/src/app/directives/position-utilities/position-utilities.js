angular.module('position-utilities', []);
angular.module('position-utilities')

    .directive('mt', mt)
    .directive('mb', mb)
    .directive('ml', ml)
    .directive('mr', mr)
    .directive('mx', mx)
    .directive('my', my)
    .directive('m', m)
    .directive('pt', pt)
    .directive('pb', pb)
    .directive('pl', pl)
    .directive('pr', pr)
    .directive('px', px)
    .directive('py', py)
    .directive('p', p)
    .directive('mw', mw)
    .directive('mh', mh)
    .directive('w', w)
    .directive('h', h)
    ;

function mt() {
    return {
        restrict: 'A',
        scope: {
            mt: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'margin-top': scope.mt });
        }
    }
}

function mb() {
    return {
        restrict: 'A',
        scope: {
            mb: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'margin-bottom': scope.mb });
        }
    }
}

function ml() {
    return {
        restrict: 'A',
        scope: {
            ml: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'margin-left': scope.ml });
        }
    }
}

function mr() {
    return {
        restrict: 'A',
        scope: {
            mr: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'margin-right': scope.mr });
        }
    }
}

function mx() {
    return {
        restrict: 'A',
        scope: {
            mx: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'margin-left': scope.mx, 'margin-right': scope.mx });
        }
    }
}

function my() {
    return {
        restrict: 'A',
        scope: {
            my: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'margin-top': scope.my, 'margin-bottom': scope.my });
        }
    }
}

function m() {
    return {
        restrict: 'A',
        scope: {
            m: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'margin': scope.m });
        }
    }
}

function pt() {
    return {
        restrict: 'A',
        scope: {
            pt: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'padding-top': scope.pt });
        }
    }
}

function pb() {
    return {
        restrict: 'A',
        scope: {
            pb: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'padding-bottom': scope.pb });
        }
    }
}

function pl() {
    return {
        restrict: 'A',
        scope: {
            pl: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'padding-left': scope.pl });
        }
    }
}

function pr() {
    return {
        restrict: 'A',
        scope: {
            pr: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'padding-right': scope.pr });
        }
    }
}

function px() {
    return {
        restrict: 'A',
        scope: {
            px: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'padding-left': scope.px, 'padding-right': scope.px });
        }
    }
}

function py() {
    return {
        restrict: 'A',
        scope: {
            py: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'padding-top': scope.py, 'padding-bottom': scope.py });
        }
    }
}

function p() {
    return {
        restrict: 'A',
        scope: {
            p: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'padding': scope.p });
        }
    }
}

function mw() {
    return {
        restrict: 'A',
        scope: {
            mw: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'max-width': scope.mw });
        }
    }
}

function mh() {
    return {
        restrict: 'A',
        scope: {
            mh: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'max-height': scope.mh });
        }
    }
}

function w() {
    return {
        restrict: 'A',
        scope: {
            w: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'width': scope.w });
        }
    }
}

function h() {
    return {
        restrict: 'A',
        scope: {
            h: '@'
        },
        replace: true,
        link: function (scope, el, attrs) {

            el.css({ 'height': scope.h });
        }
    }
}
angular.module('imgSpinner', []);
angular.module('imgSpinner')

  .directive('imgSpinner', imgSpinner)
  ;

function imgSpinner() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var spinnerElement = angular.element('<i class="fa fa-spinner fa-spin" style="position: absolute; top: 50%; left: 50%;" />');
      element.before(spinnerElement);
      element.bind('load', function () {
        scope.$apply(function () {
          spinnerElement.remove();
        });
      });
    }
  }
}

function imgSpinnerWrap() {
  return {
    restrict: 'A',
    transclude: true,
    template: '<span><i class="fa fa-spinner fa-spin" style="position: absolute; top: 50%; left: 50%;" /><ng-transclude /></span>',
    link: function (scope, element, attrs) {
      element.bind('load', function () {
        scope.$apply(function () {
          element.children()[0].remove();
        });
      });
    }
  }
}
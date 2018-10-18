angular.module('clayApp')
	.config(HomeConfig)
	.controller('HomeCtrl', HomeController)
	;

function HomeConfig($stateProvider) {
	$stateProvider
		.state('home', {
			parent: 'base',
			url: '/home/:scroll',
			templateUrl: 'home/templates/home.tpl.html',
			controller: 'HomeCtrl',
			controllerAs: 'home',
			data: {
				componentName: 'Home'
			},
			params: {
				scroll: {
					value: null,
					squash: true
				}
			}
		})
		;
}

function HomeController($rootScope, $stateParams, $location, $anchorScroll, $timeout) {
	var vm = $rootScope.currentScope = this;


	$timeout(function () {
		if ($stateParams.scroll) {
			console.log($stateParams.scroll)
			var duration = 1000;
			var offset = 50;
			var anchorElement = angular.element('#' + $stateParams.scroll);
			var containerElement = angular.element('#COMPONENT_Home')
			containerElement.scrollToElementAnimated(anchorElement, offset, duration);
		}
	});


	vm.screenshots = [
		"https://placehold.it/800x800?v=1",
		"https://placehold.it/800x800?v=2",
		"https://placehold.it/800x800?v=3",
		"https://placehold.it/800x800?v=4",
		"https://placehold.it/800x800?v=5",
		"https://placehold.it/800x800?v=6",
		"https://placehold.it/800x800?v=7"
	]
}
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

	// This code below is just to run the datepicker

	vm.options = {
		customClass: getDayClass,
		minDate: new Date(),
		showWeeks: true
	};

	function getDayClass(data) {
		var date = data.date,
			mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

			for (var i = 0; i < vm.events.length; i++) {
				var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

				if (dayToCheck === currentDay) {
					return vm.events[i].status;
				}
			}
		}
	}

	vm.events = [
		{
			date: tomorrow,
			status: 'full'
		},
		{
			date: afterTomorrow,
			status: 'partially'
		}
	];

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date(tomorrow);
	afterTomorrow.setDate(tomorrow.getDate() + 1);
}
angular.module('clayApp')
	.config(ContactConfig)
	.controller('ContactCtrl', ContactController)
	.controller('ThanksCtrl', ThanksController)
	;

function ContactConfig($stateProvider) {
	$stateProvider
		.state('contact', {
			parent: 'base',
			url: '/contact',
			templateUrl: 'contact/templates/contact.tpl.html',
			controller: 'ContactCtrl',
			controllerAs: 'contact',
			data: {
				componentName: 'Contact Us'
			}
		})
		.state('thanks', {
			parent: 'base',
			url: '/thanks',
			templateUrl: 'contact/templates/thanks.tpl.html',
			controller: 'ThanksCtrl',
			controllerAs: 'thanks',
			data: {
				componentName: 'Thanks'
			}
		})
		;
}

function ContactController($rootScope) {
	var vm = $rootScope.currentScope = this;
}

function ThanksController($rootScope) {
	var vm = $rootScope.currentScope = this;
}

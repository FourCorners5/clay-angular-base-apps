angular.module('clayApp')
	.config(HomeConfig)
	.controller('HomeCtrl', HomeController)
	;

function HomeConfig($stateProvider) {
	$stateProvider
		.state('home', {
			parent: 'base',
			url: '/',
			templateUrl: 'home/templates/home.tpl.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})
		;
}

function HomeController($sce) {
	var vm = this;
	vm.trustify = function (input) {
		return $sce.trustAsResourceUrl(input);
	};
	vm.content = [
		{
			"Headline": "Design",
			"MediaType": "image",
			"MediaURL": vm.trustify("assets/images/design.jpg"),
			"Body": "I've worked with a variety of clients to craft messages through visual branding and marketing materials.",
			"Link": "design",
			"LinkText": "Design Portfolio",
			"LinkEnabled": true,
			"LinkExternal": false
		},
		{
			"Headline": "Video Games",
			"MediaType": "image",
			"MediaURL": vm.trustify("assets/images/jcm.jpg"),
			"Body": "I started a company to share my particular sense of creative fun through entertainment media.",
			"Link": "http://jollycrouton.com",
			"LinkText": "Jolly Crouton Media Ltd.",
			"LinkEnabled": true,
			"LinkExternal": true
		},
		{
			"Headline": "Voice Acting",
			"MediaType": "image",
			"MediaURL": vm.trustify("assets/images/voice.jpg"),
			"Body": "One of my favorite things to do is speak in character voices and accents, including those fit for narration.",
			"Link": "voice",
			"LinkText": "Voice Acting",
			"LinkEnabled": true,
			"LinkExternal": false
		},
		{
			"Headline": "Video",
			"MediaType": "image",
			"MediaURL": vm.trustify("assets/images/video.jpg"),
			"Body": "A good way to tell both fanciful and informational stories is to get behind cameras and editing suites.",
			"Link": "video",
			"LinkText": "Videography",
			"LinkEnabled": true,
			"LinkExternal": false
		},
		{
			"Headline": "Music",
			"MediaType": "image",
			"MediaURL": vm.trustify("assets/images/music.jpg"),
			"Body": "I rather enjoy writing a spot of mood-setting music in the morning, particularly for video game projects.",
			"Link": "music",
			"LinkText": "Music",
			"LinkEnabled": true,
			"LinkExternal": false
		},
		{
			"Headline": "Writing",
			"MediaType": "image",
			"MediaURL": vm.trustify("assets/images/writing.jpg"),
			"Body": "My skills range from editing dissertations to squeezing golden nuggets into tweets.",
			"Link": "mailto:contact@claytonbelcher.com",
			"LinkText": "Contact Me",
			"LinkEnabled": true,
			"LinkExternal": false
		}
	];
}

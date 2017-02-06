four51.app.directive('productspotlight', ['$http', function ($http) {
	var obj = {
		restrict: 'E',
		scope: {
			buyerid: '@'
		},
		template: '<style>@charset "UTF-8";/* Slider */.slick-slider{ position: relative; display: block; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; -khtml-user-select: none; -ms-touch-action: pan-y; touch-action: pan-y; -webkit-tap-highlight-color: transparent;}.slick-list{ position: relative; display: block; overflow: hidden; margin: 0; padding: 0;}.slick-list:focus{ outline: none;}.slick-list.dragging{ cursor: pointer; cursor: hand;}.slick-slider .slick-track,.slick-slider .slick-list{ -webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0); -ms-transform: translate3d(0, 0, 0); -o-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0);}.slick-track{ position: relative; top: 0; left: 0; display: block;}.slick-track:before,.slick-track:after{ display: table; content: "";}.slick-track:after{ clear: both;}.slick-loading .slick-track{ visibility: hidden;}.slick-slide{ display: none; float: left; height: 100%; min-height: 1px;}[dir="rtl"] .slick-slide{ float: right;}.slick-slide img{ display: block; height:150px;}.slick-slide.slick-loading img{ display: none;}.slick-slide.dragging img{ pointer-events: none;}.slick-initialized .slick-slide{ display: block;}.slick-loading .slick-slide{ visibility: hidden;}.slick-vertical .slick-slide{ display: block; height: auto; border: 1px solid transparent;}.slick-arrow.slick-hidden { display: none;}//Theme/* Slider */.slick-loading .slick-list{ background: #fff url("./ajax-loader.gif") center center no-repeat;}/* Icons */@font-face{ font-family: "slick"; font-weight: normal; font-style: normal; src: url("http://rateproduct.prowebservicehost.com/assets/slick.eot"); src: url("http://rateproduct.prowebservicehost.com/assets/slick.eot?#iefix") format("embedded-opentype"), url("http://rateproduct.prowebservicehost.com/assets/slick.woff") format("woff"), url("http://rateproduct.prowebservicehost.com/assets/slick.ttf") format("truetype"), url("http://rateproduct.prowebservicehost.com/assets/slick.svg#slick") format("svg");}/* Arrows */.slick-prev,.slick-next{ font-size: 0; line-height: 0; position: absolute; top: 50%; display: block; width: 20px; height: 20px; margin-top: -10px; padding: 0; cursor: pointer; color: transparent; border: none; outline: none; background: transparent;}.slick-prev:hover,.slick-prev:focus,.slick-next:hover,.slick-next:focus{ color: transparent; outline: none; background: transparent;}.slick-prev:hover:before,.slick-prev:focus:before,.slick-next:hover:before,.slick-next:focus:before{ opacity: 1;}.slick-prev.slick-disabled:before,.slick-next.slick-disabled:before{ opacity: .25;}.slick-prev:before,.slick-next:before{ font-family: "slick"; font-size: 20px; line-height: 1; opacity: .75; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}.slick-prev{ left: -35px;}[dir="rtl"] .slick-prev{ right: -35px; left: auto;}.slick-prev:before{ content: "?";}[dir="rtl"] .slick-prev:before{ content: "?";}.slick-next{ right: -35px;}[dir="rtl"] .slick-next{ right: auto; left: -35px;}.slick-next:before{ content: "?";}[dir="rtl"] .slick-next:before{ content: "?";}/* Dots */.slick-slider{ margin-bottom: 30px;}.slick-dots{ position: absolute; bottom: -45px; display: block; width: 100%; padding: 0; list-style: none; text-align: center;}.slick-dots li{ position: relative; display: inline-block; width: 20px; height: 20px; margin: 0 5px; padding: 0; cursor: pointer;}.slick-dots li button{ font-size: 0; line-height: 0; display: block; width: 20px; height: 20px; padding: 5px; cursor: pointer; color: transparent; border: 0; outline: none; background: transparent;}.slick-dots li button:hover,.slick-dots li button:focus{ outline: none;}.slick-dots li button:hover:before,.slick-dots li button:focus:before{ opacity: 1;}.slick-dots li button:before{ font-family: "slick"; font-size: 6px; line-height: 20px; position: absolute; top: 0; left: 0; width: 20px; height: 20px; content: "•"; text-align: center; opacity: .25; color: black; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}.slick-dots li.slick-active button:before{ opacity: .75; color: black;}</style>' + '<style ng-bind-html="separatorStyle"></style>' + '<loadingindicator ng-show="loading" title="Loading Featured Products..."></loadingindicator><slick ng-style="separatorStyle" ng-if="!loading"  class="hidden-sm hidden-xs" infinite=true slides-to-show=5 slides-to-scroll=1 init-onload=true data= "slides" autoplay=true arrows="{{settings.DisplayArrows}}" ><div ng-repeat="slide in slides | orderBy: \'OrderBy\'"><a style="width:100%;" ng-href="{{\'product/\' + slide.ProductURL.split(\'product/\')[1]}}"><img ng-class="dropShadow" style="cursor:pointer;" class="img-responsive img-center" ng-src="{{\'data:image/png;base64,\'+ slide.ProductImage}}" /></a><img ng-if="settings.DisplayRatings" ng-src="{{\'http://rateproduct.prowebservicehost.com/assets/\' + slide.Rating + \'.png\'}}" style="width:auto;height:auto;margin-left:auto;margin-right:auto;" /></div></slick ><slick ng-style="separatorStyle" ng-if="!loading"  class="visible-sm" infinite=true slides-to-show=4 slides-to-scroll=1 init-onload=true data="slides" autoplay=true arrows="{{settings.DisplayArrows}}" ><div ng-repeat="slide in slides | orderBy: \'OrderBy\'"><a style="width:100%;" ng-href="{{\'product/\' + slide.ProductURL.split(\'product/\')[1]}}"><img ng-class="dropShadow" style="cursor:pointer;" class="img-responsive img-center" ng-src="{{\'data:image/png;base64,\'+ slide.ProductImage}}" /></a><img ng-if="settings.DisplayRatings" ng-src="{{\'http://rateproduct.prowebservicehost.com/assets/\' + slide.Rating + \'.png\'}}" style="width:auto;height:auto;margin-left:auto;margin-right:auto;" /></div></slick><slick ng-style="separatorStyle" ng-if="!loading"  class="visible-xs" infinite=true slides-to-show=2 slides-to-scroll=2 init-onload=true data="slides" autoplay=true arrows="{{settings.DisplayArrows}}" ><div ng-repeat="slide in slides | orderBy: \'OrderBy\'"><a style="width:100%;" ng-href="{{\'product/\' + slide.ProductURL.split(\'product/\')[1]}}"><img ng-class="dropShadow" style="cursor:pointer;" class="img-responsive img-center" ng-src="{{\'data:image/png;base64,\'+ slide.ProductImage}}" /></a><img ng-if="settings.DisplayRatings" ng-src="{{\'http://rateproduct.prowebservicehost.com/assets/\' + slide.Rating + \'.png\'}}" style="width:auto;height:auto;margin-left:auto;margin-right:auto;" /></div></slick>',
		link: function (scope) {

			scope.separatorStyle = "";

			scope.scroll = 0;

			scope.getSlides = function () {
				scope.loading = true;
				$http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/getbuyerconfig", method: 'POST', data: { "ID": scope.buyerid, "key": "delighted" } }).then(function (response) {
					console.log(response);
					if (function () {
						try {
							JSON.parse(JSON.stringify(response.data));
						} catch (e) {
							return false;
						}
						return true;
					}()) {
						scope.settings = response.data[0];
						if (scope.settings.DisplaySeparators) {
							scope.separatorStyle = ".slick-active {border-right: solid 1px " + scope.settings.SeparatorColor + ";margin-right: -1px;}.slick-prev:before,.slick-next:before{color: " + scope.settings.SeparatorColor + ";} .img-center {margin-right:auto; margin-left:auto;}";
						}
					}
					else {
						scope.settings = [];
					}
					$http({ url: "https://rateproduct.prowebservicehost.com/productspotlight/getallspotlightproducts", method: 'POST', data: { "ID": scope.buyerid, "key": "delighted" } }).then(function (response) {
						if (function () {
							try {
								JSON.parse(JSON.stringify(response.data));
							} catch (e) {
								return false;
							}
							return true;
						}()) {
							scope.slides = [];
							angular.forEach(response.data, function(product){
								if(product.Featured){
									scope.slides.push(product);
								}
							});
						}
						else {
							scope.slides = [];
						}
						scope.loading = false;
					});
				});
			};
			scope.getSlides();
		}
	}
	return obj;
}]);
angular.module('progradeApp')

	.config(CartonCounterConfig)
	.controller('CartonCounterCtrl', CartonCounterController)
	;

function CartonCounterConfig($stateProvider) {
	$stateProvider
		.state('cartoncounter', {
			parent: 'base',
			templateUrl: 'cartoncounter/templates/cartoncounter.tpl.html',
			controller: 'CartonCounterCtrl',
			controllerAs: 'CartonCounter',
			url: '/cartoncounter',
			data: { componentName: 'Carton Counter' }
		});
}

function CartonCounterController($state, $http, toastr, $rootScope, ngClipboard, $scope) {
	var vm = this;

	vm.divisor = { 'true': 100, 'false': 2500 };

	vm.toggleValue = true;

	vm.loaded = true;

	vm.copy = function () {
		ngClipboard.toClipboard(vm.grandTotal.toString());
	};

	vm.clear = function () {
		vm.model = [];
		vm.model.push(angular.copy(vm.lineTemplate));
		vm.updateTotal();
	};

	vm.grandTotal = 0;

	vm.lineTemplate = {
		Material: "",
		Sheets: 0,
		Quantity: "",
		CodeValue: 0,
		Valid: false
	};

	vm.addLine = function () {
		vm.model.push(angular.copy(vm.lineTemplate));
		vm.updateTotal();
	};

	vm.deleteLine = function (i) {
		vm.model.splice(i, 1);
		vm.updateTotal();
	}

	vm.updateTotal = function () {
		var tempTotal = 0;
		var borker = false;
		angular.forEach(vm.model, function (line) {
			if (vm.materials[line.Material] && !isNaN(line.Quantity) && parseInt(line.Quantity) > 0) {
				line.Sheets = vm.materials[line.Material];
				line.CodeValue = line.Sheets / vm.divisor[vm.toggleValue] * line.Quantity;
				line.Valid = true;
			}
			else {
				line.Sheets = 0;
				line.CodeValue = 0;
				line.Valid = false;
				borker = true;
			}
			tempTotal += line.CodeValue;
		});
		if (borker) {
			tempTotal = 0;
		}
		vm.grandTotal = tempTotal;
	};

	vm.materials = {
		"16532": 5000,
		"16533": 2500,
		"16534": 5000,
		"16531": 1000,
		"16535": 1000,
		"16536": 1000,
		"16502": 5000,
		"16503": 2500,
		"16506": 5000,
		"16501": 1000,
		"16504": 1000,
		"16505": 1000,
		"16518": 5000,
		"16520": 2500,
		"16523": 5000,
		"16517": 1000,
		"16521": 1000,
		"16522": 1000,
		"16515": 5000,
		"16516": 5000,
		"21893": 1000,
		"21894": 1000,
		"33648": 1000,
		"16498": 5000,
		"16499": 5000,
		"16497": 1000,
		"32368": 1000,
		"32824": 1000,
		"16508": 5000,
		"16510": 5000,
		"16512": 2500,
		"16509": 1000,
		"16492": 5000,
		"16493": 5000,
		"16495": 2500,
		"16550": 5000,
		"16551": 5000,
		"16552": 2500,
		"16491": 1000,
		"16494": 1000,
		"16496": 1000,
		"16549": 1000,
		"26914": 1000,
		"33604": 1000,
		"16482": 5000,
		"16483": 5000,
		"16538": 5000,
		"16539": 5000,
		"16540": 2500,
		"16537": 1000,
		"16541": 1000,
		"16542": 1000,
		"21888": 1000,
		"16488": 5000,
		"16543": 5000,
		"16544": 5000,
		"16545": 2500,
		"16486": 1000,
		"16546": 1000,
		"16547": 1000,
		"60470": 1000,
		"16485": 5000,
		"60476": 5000,
		"60477": 5000,
		"21889": 1000,
		"60478": 1000,
		"60479": 1000,
		"60480": 1000,
		"16481": 5000,
		"60481": 5000,
		"60482": 5000,
		"21887": 1000,
		"60484": 1000,
		"60466": 5000,
		"60471": 5000,
		"16507": 5000,
		"16554": 5000,
		"90862": 1000,
		"16596": 5000,
		"16553": 5000,
		"21903": 5000,
		"26659": 1000,
		"16602": 5000,
		"16604": 5000,
		"16610": 2500,
		"16575": 1000,
		"16598": 1000,
		"16600": 1000,
		"16603": 5000,
		"16605": 5000,
		"16611": 2500,
		"16599": 1000,
		"16601": 1000,
		"16606": 5000,
		"16608": 5000,
		"16612": 2500,
		"16581": 1000,
		"16583": 1000,
		"16607": 5000,
		"16609": 5000,
		"16613": 2500,
		"16590": 1000,
		"16592": 1000,
		"16557": 5000,
		"16558": 5000,
		"16559": 2500,
		"16555": 1000,
		"16556": 1000,
		"16569": 1000,
		"60371": 5000,
		"60452": 5000,
		"60454": 2500,
		"60455": 1000,
		"60458": 5000,
		"60459": 5000,
		"60460": 2500,
		"60461": 5000,
		"60462": 5000,
		"60463": 2500,
		"60464": 1000,
		"16672": 1000,
		"16678": 1000,
		"16635": 5000,
		"16638": 5000,
		"16641": 5000,
		"16644": 2500,
		"176395": 5000,
		"16636": 5000,
		"16639": 5000,
		"16642": 5000,
		"16645": 2500,
		"176397": 5000,
		"16646": 5000,
		"16647": 5000,
		"16648": 5000,
		"157034": 5000,
		"157035": 5000,
		"16634": 5000,
		"16637": 5000,
		"16640": 5000,
		"16643": 2500,
		"176396": 5000,
		"150881": 5000,
		"151288": 5000,
	};

	vm.clear();

}
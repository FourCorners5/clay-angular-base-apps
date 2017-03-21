angular.module('clayApp')

	.config(XL1RepsConfig)
	.controller('XL1RepsCtrl', XL1RepsController)
	.controller('XL1RepsModalCtrl', XL1RepsModalController)
	;

function XL1RepsConfig($stateProvider) {
	$stateProvider
		.state('xl1reps', {
			parent: 'base',
			templateUrl: 'xl1reps/templates/xl1reps.tpl.html',
			controller: 'XL1RepsCtrl',
			controllerAs: 'XL1Reps',
			url: '/xl1reps',
			data: { componentName: 'XL1 Reps' },
			resolve: {
				RepList: function ($http) {
					return $http.get('https://rateproduct.prowebservicehost.com/xl1reps').then(function (response) {
						var jsonModel = response.data;
						angular.forEach(jsonModel, function (company) {
							angular.forEach(company.Locations, function (location) {
								if (!location.Members) {
									location.Members = [{ "Name": "My Rep Is Not Listed", "Username": "NOREP_XL1Merchant" }];
								}
							});
						});
						return jsonModel;
					});
				}
			}
		});
}

function XL1RepsController($state, $http, toastr, $rootScope, ngClipboard, $filter, $uibModal, $scope, RepList) {
	var vm = this;
	vm.jsonModel = RepList;
	vm.outputText = $filter('json')(vm.jsonModel);
	vm.copyJSON = function () {
		ngClipboard.toClipboard(vm.outputText);
	};

	vm.saveJSON = function () {
		if (confirm('Are you sure you want to overwrite the file on the server?')) {

			var req = {
				method: 'PUT',
				url: 'https://rateproduct.prowebservicehost.com/xl1reps',
				headers: {
					'Content-Type': 'application/json'
				},
				data: vm.jsonModel
			};
		};

		$http(req).then(function () {
			alert("Changes have been saved to the server. Please copy out the text as well, just to be safe.");
		}, function () {
			alert("There was a problem saving to the server. Please be sure to copy out the text manually.");
		});

	};

	$scope.$watch(function () { return vm.outputText; }, function (n, o) {
		if (vm.outputText) {
			vm.jsonModel = JSON.parse(vm.outputText);
		}
	}, true);

	vm.deleteMember = function (var1, var2, var3) {
		if (confirm("Are you sure you want to remove this rep?")) {
			vm.jsonModel[var1].Locations[var2].Members.splice(var3, 1);
			vm.outputText = $filter('json')(vm.jsonModel);
		}
	};

	vm.addMember = function (var1, var2, var3) {
		var newMember = { "Name": "", "Username": "" };
		if (!vm.jsonModel[var1].Locations[var2].Members) {
			vm.jsonModel[var1].Locations[var2].Members = [];
		}
		vm.jsonModel[var1].Locations[var2].Members.push(newMember);
		vm.outputText = $filter('json')(vm.jsonModel);
	};

	vm.pasteReps = function (var1, var2, var3) {
		var newMember = { "Name": "", "Username": "" };
		if (!vm.jsonModel[var1].Locations[var2].Members) {
			vm.jsonModel[var1].Locations[var2].Members = [];
		}
		vm.jsonModel[var1].Locations[var2].Members.push(newMember);
		vm.outputText = $filter('json')(vm.jsonModel);
	};

	vm.updateText = function () {
		vm.outputText = $filter('json')(vm.jsonModel);
		vm.changesMade = false;
	};

	vm.openTeam = null;

	vm.toggleOpenTeam = function (index) {
		if (vm.openTeam == index) {
			vm.openTeam = null;
		}
		else {
			vm.openTeam = index;
		}
	};

	vm.openModal = function (i, ii) {

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'XL1RepsModal.html',
			controller: 'XL1RepsModalCtrl as XL1RepsModal',
			resolve: {
				scope: function () {
					return $scope;
				}
			}
		});

		modalInstance.result.then(function (result) {
			console.log(i + " " + ii);
			if (!vm.jsonModel[i].Locations[ii].Members) {
				vm.jsonModel[i].Locations[ii].Members = [];
			}
			angular.forEach(result, function (item) {
				vm.jsonModel[i].Locations[ii].Members.push(item);
			});
		});
	};

	function dynamicSort(property) {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}

	vm.sortModel = function () {
		vm.jsonModel.sort(dynamicSort("Company"));

		angular.forEach(vm.jsonModel, function (company) {
			company.Locations.sort(dynamicSort("Name"));
			angular.forEach(company.Locations, function (location) {
				if (location.Members) {
					location.Members.sort(dynamicSort("Name"));
				}
			});
		});
	};

}

function XL1RepsModalController($uibModalInstance, scope) {
	var vm = this;

	vm.parseText = function () {
		vm.list = [];
		var tempList = vm.modalSource.split(/[\r\n]+/g);
		angular.forEach(tempList, function (rep) {
			var tempArray = rep.split(/[\t]+/g);
			var newObj = {};
			newObj.Name = tempArray[0];
			newObj.Username = tempArray[1];
			vm.list.push(newObj);
		});
	};

	vm.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	vm.close = function () {
		if (vm.list) {
			$uibModalInstance.close(vm.list);
		}
		else {
			$uibModalInstance.close();
		}
	};
}
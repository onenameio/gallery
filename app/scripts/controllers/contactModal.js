'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:ContactModalCtrl
 * @description
 * # ContactModalCtrl
 * Controller of the profileviewerApp
 */

/*global sjcl: true */
angular.module('profileviewerApp')
.controller('ContactModalCtrl', function ($scope, $modal, $modalInstance, contactMethods, index, $location) {

	$scope.contactMethods = contactMethods;

	$scope.codes = {};

	$scope.selectMethod = function(index) {
		$scope.index = index;
		$scope.copyButtonText = 'Click to Copy';
		if ($scope.contactMethods[$scope.index].identifier) {
			$scope.identifier = $scope.contactMethods[$scope.index].identifier;
		}
	};

	var urlParams = $location.search();
	if ('code' in urlParams) {
		var code = urlParams.code.split('-').join(' ');
		$scope.attemptDecryption(code);
		$scope.selectMethod(index);
	} else {
		$scope.selectMethod(index);
	}

	$scope.attemptDecryption = function(code) {
		for (var i in contactMethods) {
			var contactMethod = contactMethods[i];
			if (contactMethod.encryptedIdentifier) {
				try {
					var identifier = sjcl.decrypt(code, contactMethod.encryptedIdentifier);
					contactMethod.identifier = identifier;
					$scope.identifier = identifier;
				} catch(e) {
					$scope.decryptionAttempted = true;
				}
			}
		}
	};

	$scope.resetIdentifier = function() {
		$scope.identifier = contactMethods[$scope.index].identifier;
	};

	$scope.getTextToCopy = function() {
		return $scope.identifier;
	};

	$scope.notifyUserOfCopy = function() {
		$scope.copyButtonText = 'Copied!';
	};

 	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};

	$scope.decryptIdentifier = function() {
		$scope.attemptDecryption($scope.codes.passphrase);
	};

});

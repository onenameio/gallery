'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:FollowModalCtrl
 * @description
 * # FollowModalCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('FollowModalCtrl', function ($scope, $modal, $modalInstance) {

	$scope.openSignupModal = function () {
		$modalInstance.dismiss('cancel');
    	var modalInstance = $modal.open({
    		templateUrl: '/views/_signupModal.html',
			controller: 'SignupModalCtrl'
   		});
    	return modalInstance;
 	};

});

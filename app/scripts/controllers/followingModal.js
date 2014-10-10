'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:FollowingModalCtrl
 * @description
 * # FollowingModalCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('FollowingModalCtrl', function ($scope, $modalInstance, followees) {

	$scope.followees = followees;

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};

});

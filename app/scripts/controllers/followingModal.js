'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:FollowingModalCtrl
 * @description
 * # FollowingModalCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('FollowingModalCtrl', function ($scope, $modalInstance, followees, Utils) {

	$scope.followees = followees;

	for (var i = 0; i < followees.length; i++) {
     	Utils.loadAvatar(followees[i].avatarUrl, 'followees-avatar-' + i, 100);
    }

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};

});

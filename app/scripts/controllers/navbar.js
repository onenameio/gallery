'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
  .controller('NavbarCtrl', function ($scope, Person, Utils, $modal) {

	var hasProp = Utils.hasProp;

    $scope.search = function(query) {
		Person.search(query, function(resp) {
			var people = [];
			if (resp.results) {
				var tripleVerifiedProfiles = [];
				var doubleVerifiedProfiles = [];
				var verifiedProfiles = [];
				var unverifiedProfiles = [];
				var unfilledProfiles = [];

				resp.results.map(function(item) {
					var hasIdentifier = false,
						hasName = false,
						numVerifications = 0;
					if (hasProp(item, 'profile', 'twitter', 'username') ||
						hasProp(item, 'profile', 'github', 'username') ||
						hasProp(item, 'profile', 'facebook', 'username')) {
						hasIdentifier = true;
					}
					if ($scope.website) {
						hasIdentifier = true;
					}
					if (hasProp(item, 'profile', 'twitter', 'proof', 'url')) {
						numVerifications += 1;
					}
					if (hasProp(item, 'profile', 'github', 'proof', 'url')) {
						numVerifications += 1;
					}
					if (hasProp(item, 'profile', 'facebook', 'proof', 'url')) {
						numVerifications += 1;
					}
					if (hasProp(item, 'profile', 'name', 'formatted')) {
						hasName = true;
					}

					if (item.username) {
						if (numVerifications > 2) {
							tripleVerifiedProfiles.push(item);
						} else if (numVerifications === 2) {
							doubleVerifiedProfiles.push(item);
						} else if (numVerifications === 1) {
							verifiedProfiles.push(item);
						} else if (hasIdentifier && hasName) {
							unverifiedProfiles.push(item);
						} else {
							unfilledProfiles.push(item);
						}
					}
				});
				people = tripleVerifiedProfiles.concat(doubleVerifiedProfiles, verifiedProfiles, unverifiedProfiles, unfilledProfiles);
			}
			$scope.people = people;
		}, function(error) {
			console.log(error);
		});
	};

	$scope.openSignupModal = function () {
    	var modalInstance = $modal.open({
    		templateUrl: '/views/_signupModal.html',
			controller: 'SignupModalCtrl'
   		});
    	return modalInstance;
 	};

  });

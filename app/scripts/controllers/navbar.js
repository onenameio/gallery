'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
  .controller('NavbarCtrl', function ($scope, Person, Utils) {

	var hasProp = Utils.hasProp;

    $scope.search = function(query) {
		Person.search(query, function(resp) {
			var people = [];
			if (resp.results) {
				resp.results.map(function(item) {
					var hasIdentifier = false,
						hasName = false,
						hasVerification = false;
					if (hasProp(item, 'profile', 'twitter', 'username') ||
						hasProp(item, 'profile', 'github', 'username') ||
						hasProp(item, 'profile', 'facebook', 'username')) {
						hasIdentifier = true;
					}
					if ($scope.website) {
						hasIdentifier = true;
					}
					if (hasProp(item, 'profile', 'twitter', 'proof', 'url') ||
						hasProp(item, 'profile', 'github', 'proof', 'url') ||
						hasProp(item, 'profile', 'facebook', 'proof', 'url')) {
						hasVerification = true;
					}
					if (hasProp(item, 'profile', 'name', 'formatted')) {
						hasName = true;
					}
					if (item.username && hasName && hasIdentifier) {
						people.push(item);
					}
				});
			}
			$scope.people = people;
		}, function(error) {
			console.log(error);
		});
	};

  });

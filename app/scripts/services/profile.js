'use strict';

/* Services */

angular.module('profileviewerApp')
.factory('Person', ['$http', function($http) {
	var Person = {};

	Person.findByUsername = function(username, onSuccess, onError) {
		var url = 'http://onenameapi.herokuapp.com/users/' + username;
		$http({method: 'GET', url: url})
			.success(function(data) { onSuccess(data); })
			.error(function(data) { onError(data); })
		;
	};

	
	return Person;
}])
;
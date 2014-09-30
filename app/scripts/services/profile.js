'use strict';

/* Services */

angular.module('profileviewerApp')
.factory('Person', ['$http', 'Utils', function($http, Utils) {
	var Person = {};
	var hasProp = Utils.hasProp;

	Person.findByUsername = function(username, onSuccess, onError) {
		var url = 'http://onenameapi.herokuapp.com/users/' + username;
		$http({method: 'GET', url: url})
			.success(function(data) {
				if (hasProp(data, 'graph', 'url')) {
		  			$http({method: 'GET', url: data.graph.url})
						.success(function(graphData) {
							data.graph = graphData;
							onSuccess(data);
						})
						.error(function(data) { console.log(data); })
					;
		  		} else {
		  			data.graph = {};
		  			onSuccess(data);
		  		}
			})
			.error(function(data) { onError(data); })
		;
	};

	return Person;
}])
;
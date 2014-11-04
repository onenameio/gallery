'use strict';

/* Services */

angular.module('profileviewerApp')
.factory('Person', ['$http', 'Utils', function($http, Utils) {
	var Person = {};
	var hasProp = Utils.hasProp;
	var baseUrl = ''; // var baseUrl = 'http://localhost:3000';

	Person.findByUsername = function(username, onSuccess, onError) {
		var url = baseUrl + '/api/users/' + username;
		$http({method: 'GET', url: url})
			.success(function(data) {
				data = data.profile;

				var graphUrl = null;
				if (hasProp(data, 'graph', 'url')) {
					graphUrl = data.graph.url;
				} else if (hasProp(data, 'network', 'url')) {
					graphUrl = data.network.url;
				}
				if (graphUrl) {
		  			$http({method: 'GET', url: graphUrl})
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

	Person.search = function(query, onSuccess, onError) {
		/* Cover the empty query case */
		if (!query) {
			onSuccess({'results': []});
			return;
		}
		/* Perform the search */
		var url = baseUrl + '/api/search/' + query;
		$http({method: 'GET', url: url})
			.success(function(data) { onSuccess(data); })
			.error(function(data) { onError(data); });
	};

	return Person;
}])
;
'use strict';

/* Services */

/*global escape: true */

angular.module('profileviewerApp')
.factory('PGPKey', ['$http', function($http) {
	var PGPKey = {};
	PGPKey.get = function(url, onSuccess, onError) {
	  $http({method: 'GET', url: 'https://onename.io/api/pgpkey?url=' + escape(url) })
	    .success(onSuccess)
	    .error(onError);
	};
	return PGPKey;
}])
;

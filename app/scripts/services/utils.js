'use strict';

/* Services */

angular.module('profileviewerApp')
.factory('Utils', [function() {
	var Utils = {};
	Utils.hasProp = function(o/*, propertyName1 ... propertyNameN */) {
		var names = [].slice.call(arguments, 1);
		while (o && names.length) {
			o = o[names.shift()];
		}
		return names.length ? null : o;
	};
	Utils.getProp = function(o/*, propertyName1 ... propertyNameN */) {
	    var names = [].slice.call(arguments, 1);
	    while (o && names.length) {
	      o = o[names.shift()];
	    }
	    if (!names.length) {
	      return o;
	    }
	    return null;
	};
	return Utils;
}])
;
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
	Utils.loadAvatar = function(avatarUrl, elementId, diameter) {
		var img = new Image();
		img.onload = function() {
			document.getElementById(elementId).appendChild(img);
			if (img.height < img.width) {
				img.style.height = '100%';
				img.style.width = 'auto';
				var marginLeft = -((diameter/img.height)*img.width - diameter)/2;
				img.style.marginLeft = marginLeft.toString() + 'px';
			}
		};
		img.src = avatarUrl;
	};
	return Utils;
}])
;
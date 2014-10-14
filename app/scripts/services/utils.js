'use strict';

/* Services */

/*global sjcl: true */
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
			var container = document.getElementById(elementId);
			container.appendChild(img);
			if (img.height < img.width) {
				img.style.height = '100%';
				img.style.width = 'auto';
				var marginLeft = -((diameter/img.height)*img.width - diameter)/2;
				img.style.marginLeft = marginLeft.toString() + 'px';
			}
		};
		img.src = avatarUrl;
	};
	Utils.loadBackground = function(coverImageURL, elementId) {
		var img = new Image();
		img.onload = function() {
			var profileBottom = document.getElementById(elementId);
			profileBottom.style.backgroundImage = 'url(' + img.src + ')';
			profileBottom.style.backgroundSize = 'cover';
			profileBottom.style.webkitBackgroundSize = 'cover';
			profileBottom.style.mozBackgroundSize = 'cover';
		};
		img.src = coverImageURL;
	};
	Utils.sjclEncrypt = function(passphrase, plaintext) {
		var keySize = 256,
			params = {mode: 'ccm', ks: keySize, iter: 10000},
			returnedParams = {};

		var ciphertextData = sjcl.encrypt(
			passphrase, plaintext, params, returnedParams);
		
		return ciphertextData;		
	};

	return Utils;
}])
;
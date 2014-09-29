'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, Person) {
  	$scope.user = {};

	$scope.hasProp = function(o/*, propertyName1 ... propertyNameN */) {
	    var names = [].slice.call(arguments, 1);
	    while (o && names.length) {
	        o = o[names.shift()];
	    }
	    return names.length ? null : o;
	};

	$scope.loadAvatar = function(avatarUrl) {
		var img = new Image();
        img.onload = function() {
        	document.getElementById('user-avatar-container').appendChild(img);
	    };
        img.src = avatarUrl;
	};

	$scope.loadBackground = function(coverImageURL) {
		var img = new Image();
		img.onload = function() {
			var profileBottom = document.getElementById('profile-bottom');
			profileBottom.style.backgroundImage = 'url(' + img.src + ')';
		};
		img.src = coverImageURL;
	};

  	Person.findByUsername($routeParams.username, function(data) {
  		var profiles = [], payments = [],
  			profile = null, payment = null;

  		if ($scope.hasProp(data, 'twitter', 'username') && $scope.hasProp(data, 'twitter', 'proof', 'url')) {
  			profile = { type: 'twitter', iconClass:'fa-twitter',
  				username: data.twitter.username, url: 'https://twitter.com/' + data.twitter.username,
  				proofUrl: data.twitter.proof.url };
  			profiles.push(profile);
  		}

  		if ($scope.hasProp(data, 'facebook', 'username') && $scope.hasProp(data, 'facebook', 'proof', 'url')) {
  			profile = { type: 'facebook', iconClass:'fa-facebook',
  				username: data.facebook.username, url: 'https://facebook.com/' + data.facebook.username,
  				proofUrl: data.facebook.proof.url };
  			profiles.push(profile);
  		}

  		if ($scope.hasProp(data, 'github', 'username') && $scope.hasProp(data, 'github', 'proof', 'url')) {
  			profile = { type: 'github', iconClass:'fa-github',
  				username: data.github.username, url: 'https://github.com/' + data.github.username,
  				proofUrl: data.github.proof.url };
  			profiles.push(profile);
  		}

  		if ($scope.hasProp(data, 'bitcoin', 'address')) {
  			payment = { type: 'bitcoin', identifier: data.bitcoin.address };
  			payments.push(payment);
  		}

  		$scope.user = {
  			username: $routeParams.username,
  			name: data.name.formatted,
  			location: data.location.formatted,
  			avatarUrl: data.avatar.url,
  			backgroundUrl: data.cover.url,
  			profiles: profiles,
  			payments: payments,
  		};

  		$scope.loadAvatar(data.avatar.url);
  		$scope.loadBackground(data.cover.url);
  	});

    $scope.sampleUser = {
    	name: 'Ryan Shea',
    	username: 'ryanshea',
    	contactMethods: [
    		{ type: 'email', identifier: 'ryan@shea.io', iconClass: 'fa-envelope-o',
    			url: '#' },
    		{ type: 'phone', identifier: '5515563914', iconClass: 'fa-mobile-phone',
    			url: '#' },
    		{ type: 'skype', identifier: 'ryaneshea', iconClass: 'fa-skype',
    			url: 'skype:ryaneshea' },
    		{ type: 'bitmessage', identifier: 'BM-2cSqtKVx27J8FZunKqjcsbfKQAhbgWnLdg',
    			url: 'bitmsg:BM-2cSqtKVx27J8FZunKqjcsbfKQAhbgWnLdg' }
    	],
    	avatarUrl: 'https://s3.amazonaws.com/97p/tux.jpg',
    	backgroundUrl: 'https://s3.amazonaws.com/dx3/ryanshea',
    	location: 'New York, NY',
    	bio: 'Co-founder of OneName with @Muneeb. Bitcoin, identity, the blockchain, and decentralization.',
    	featuredFriends: [
    		{ username: 'muneeb', avatarUrl: 'https://s3.amazonaws.com/kd4/muneeb' },
    		{ username: 'albertwenger', avatarUrl: 'https://pbs.twimg.com/profile_images/1773890030/aew_artistic_bigger.gif' },
    		{ username: 'naval', avatarUrl: 'https://pbs.twimg.com/profile_images/3696617328/667874c5936764d93d56ccc76a2bcc13.jpeg' },
    		{ username: 'arianna', avatarUrl: 'https://s3.amazonaws.com/97p/ariannas-profile.jpg' },
    	],
    	unfeaturedFriendCount: 24,
    	shortPgpFingerprint: 'A93E A312',
    	shortOtrFingerprint: '756C E84F',
    	profiles: [
    		{ type: 'twitter', iconClass: 'fa-twitter', username: 'ryaneshea',
    		  url: 'https://twitter.com/ryaneshea',
    		  proofUrl: 'https://twitter.com/ryaneshea/status/486057647808868352'
    		},
    		{ type: 'facebook', iconClass: 'fa-facebook', username: 'ryaneshea',
    		  url: 'https://facebook.com/ryaneshea',
    		  proofUrl: 'https://facebook.com/ryaneshea/posts/10152385985597713'
    		},
    		{ type: 'github', iconClass: 'fa-github', username: 'rxl',
    		  url: 'https://github.com/rxl',
    		  proofUrl: 'https://gist.github.com/rxl/9799732'
    		},
    		{ type: 'linkedin', iconClass: 'fa-linkedin', username: 'ryaneshea',
    		  url: 'https://www.linkedin.com/in/ryaneshea',
    		  proofUrl: 'https://www.linkedin.com'
    		},
    		{ type: 'instagram', iconClass: 'fa-instagram', username: 'ryaneshea',
    		  url: 'http://instagram.com/ryaneshea',
    		  proofUrl: 'http://instagram.com/ryaneshea'
    		},
    		{ type: 'reddit', iconClass: 'fa-reddit', username: 'ryaneshea',
    		  url: 'http://www.reddit.com/user/ryaneshea/',
    		  proofUrl: 'http://www.reddit.com/user/ryaneshea/'
    		},
    		{ type: 'hackernews', iconClass: 'fa-hacker-news', username: 'rxl',
    		  url: 'https://news.ycombinator.com/user?id=rxl',
    		  proofUrl: 'https://news.ycombinator.com/user?id=rxl'
    		},
    		{ type: 'stackoverflow', iconClass: 'fa-stack-overflow', username: '/users/1530754/ryan',
    		  url: 'http://stackoverflow.com/users/1530754/ryan',
    		  proofUrl: 'http://stackoverflow.com/users/1530754/ryan'
    		},
    		{ type: 'angellist', iconClass: 'fa-angellist', username: 'ryanshea',
    		  url: 'https://angel.co/ryanshea',
    		  proofUrl: 'https://angel.co/ryanshea'
    		},
    		{ type: 'googleplus', iconClass: 'fa-google-plus', username: 'Ryan Shea',
    		  url: 'https://plus.google.com/110166845166458482181/posts',
    		  proofUrl: 'https://plus.google.com/110166845166458482181/posts'
    		},
    	],
    	websites: [
    		{ type: 'website dark-gradient', iconClass: 'fa-link', username: 'shea.io',
    		  url: 'http://shea.io',
    		  proofUrl: 'http://shea.io/.well-known/openname.txt'
    		},
    		{ type: 'website dark-gradient', iconClass: 'fa-link', username: 'onename.io',
    		  url: 'https://onename.io',
    		  proofUrl: 'https://onename.io/.well-known/openname.txt'
    		},
    	]
    };
    //$scope.user = $scope.sampleUser;

  });

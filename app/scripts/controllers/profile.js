'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the profileviewerApp
 */

angular.module('profileviewerApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, Utils, Person) {
  	$scope.user = {};

  	var hasProp = Utils.hasProp;
  	var getProp = Utils.getProp;

	$scope.loadAvatar = function(avatarUrl, elementId) {
		var img = new Image();
        img.onload = function() {
        	document.getElementById(elementId).appendChild(img);
        	if (img.height < img.width) {
        		img.style.height = '100%';
        		img.style.width = 'auto';
        		var diameter = 200;
        		var marginLeft = -((diameter/img.height)*img.width - diameter)/2;
        		img.style.marginLeft = marginLeft.toString() + 'px';
        	}
	    };
        img.src = avatarUrl;
	};

	$scope.loadBackground = function(coverImageURL, elementId) {
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

  	Person.findByUsername($routeParams.username, function(data) {
  		var profiles = [], payments = [], featuredFriends = [], websites = [],
  			profile = null, avatarUrl = null, backgroundUrl = null,
  			pgpPrint = null, otrPrint = null, unfeaturedFriendCount = 0, name = null, location = null;

  		if (hasProp(data, 'twitter', 'username') && hasProp(data, 'twitter', 'proof', 'url')) {
  			profile = { type: 'twitter', iconClass:'fa-twitter',
  				username: data.twitter.username, url: 'https://twitter.com/' + data.twitter.username,
  				proofUrl: data.twitter.proof.url };
  			profiles.push(profile);
  		}

  		if (hasProp(data, 'facebook', 'username') && hasProp(data, 'facebook', 'proof', 'url')) {
  			profile = { type: 'facebook', iconClass:'fa-facebook',
  				username: data.facebook.username, url: 'https://facebook.com/' + data.facebook.username,
  				proofUrl: data.facebook.proof.url };
  			profiles.push(profile);
  		}

		if (hasProp(data, 'github', 'username') && hasProp(data, 'github', 'proof', 'url')) {
			profile = { type: 'github', iconClass:'fa-github',
				username: data.github.username, url: 'https://github.com/' + data.github.username,
				proofUrl: data.github.proof.url };
			profiles.push(profile);
		}

		if (hasProp(data, 'bitcoin', 'address')) {
			payments.push({ type: 'bitcoin', identifier: data.bitcoin.address });
		} else if (hasProp(data, 'bitcoin')) {
			payments.push({ type: 'bitcoin', identifier: data.bitcoin });
		}

  		if (hasProp(data, 'graph', 'followees')) {
	  		var followees = data.graph.followees;
	  		var i = 0, numFeatured = 4;
	  		unfeaturedFriendCount = Object.keys(followees).length;
			for (var key in followees) {
				var user = followees[key],
					friendAvatarUrl = null;
				if (hasProp(user, 'avatar_url')) {
					friendAvatarUrl = getProp(user, 'avatar_url');
				}

				if (friendAvatarUrl) {
					var featuredFriend = { username: key, avatarUrl: friendAvatarUrl };
					featuredFriends.push(featuredFriend);
					$scope.loadAvatar(featuredFriend.avatarUrl, 'friend-avatar-' + i);
					i = i + 1;
					unfeaturedFriendCount = unfeaturedFriendCount - 1;
					if (i >= numFeatured) {
						break;
					}
				}
			}
		}
  		
		if (hasProp(data, 'pgp', 'fingerprint')) {
  			pgpPrint = data.pgp.fingerprint;
			pgpPrint = pgpPrint.slice(pgpPrint.length-16,pgpPrint.length).match(/.{1,4}/g).join(' ');
		}

		if (hasProp(data, 'avatar', 'url')) {
			avatarUrl = data.avatar.url;
		} else if (hasProp(data, 'avatar')) {
			avatarUrl = data.avatar;
		}
		if (hasProp(data, 'cover', 'url')) {
			backgroundUrl = data.cover.url;
		} else if (hasProp(data, 'cover')) {
			backgroundUrl = data.cover;
		}
		if (hasProp(data, 'name', 'formatted')) {
			name = data.name.formatted;
		} else if (hasProp(data, 'name')) {
			name = data.name;
		}
		if (hasProp(data, 'location', 'formatted')) {
			location = data.location.formatted;
		} else if (hasProp(data, 'location')) {
			location = data.location;
		}

		$scope.user = {
			username: $routeParams.username,
			name: name,
			avatarUrl: avatarUrl,
			backgroundUrl: backgroundUrl,
			location: location,
			bio: data.bio,
			featuredFriends: featuredFriends,
			unfeaturedFriendCount: unfeaturedFriendCount,
			shortPgpFingerprint: pgpPrint,
			shortOtrFingerprint: otrPrint,
			profiles: profiles,
			websites: websites,
			payments: payments,
		};

  		$scope.loadAvatar($scope.user.avatarUrl, 'user-avatar-container');
  		$scope.loadBackground($scope.user.backgroundUrl, 'profile-bottom');
  	});

    $scope.sampleUser = {
    	username: 'ryanshea',
    	name: 'Ryan Shea',
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

'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the profileviewerApp
 */

angular.module('profileviewerApp')
.controller('ProfileCtrl', function ($scope, $routeParams, Utils, Person, Samples) {
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

    for (var j = 0; j < $scope.user.featuredFriends.length; j++) {
      $scope.loadAvatar($scope.user.featuredFriends[j].avatarUrl, 'friend-avatar-' + j);
    }
  }, function() {
    if ($routeParams.username === 'ryansheasample') {

      $scope.user = Samples.user();
      $scope.loadAvatar($scope.user.avatarUrl, 'user-avatar-container');
      $scope.loadBackground($scope.user.backgroundUrl, 'profile-bottom');
      
      for (var i = 0; i < $scope.user.featuredFriends.length; i++) {
        $scope.loadAvatar($scope.user.featuredFriends[i].avatarUrl, 'friend-avatar-' + i);
      }
    }
  });
});

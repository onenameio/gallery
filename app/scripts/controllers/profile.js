'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the profileviewerApp
 */

angular.module('profileviewerApp')
.controller('ProfileCtrl', function ($scope, $routeParams, Utils, Person, Samples, $modal) {
  $scope.user = {};

  $scope.avatarSize = 200;
  $scope.friendAvatarSize = 100;

  var hasProp = Utils.hasProp;
  var getProp = Utils.getProp;

  Person.findByUsername($routeParams.username, function(data) {
    var profiles = [], payments = [], featuredFriends = [], websites = [], keychain = [],
      profile = null, avatarUrl = null, backgroundUrl = null, followees = [],
      unfeaturedFriendCount = 0, name = null, location = null;

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
      var graphfileFollowees = data.graph.followees;
      var i = 0, numFeatured = 4;
      unfeaturedFriendCount = Object.keys(graphfileFollowees).length;
      for (var key in graphfileFollowees) {
        var user = graphfileFollowees[key],
          friendAvatarUrl = null;
        if (hasProp(user, 'avatar_url')) {
          friendAvatarUrl = getProp(user, 'avatar_url');
        }

        if (friendAvatarUrl) {
          var followee = { username: key, avatarUrl: friendAvatarUrl };
          followees.push(followee);
          if (i < numFeatured) {
            featuredFriends.push(followee);
            unfeaturedFriendCount = unfeaturedFriendCount - 1;
          }
          i = i + 1;
        }
      }
    }
    
    if (hasProp(data, 'pgp', 'fingerprint')) {
      var publicKey = { type: 'pgp', fingerprint: data.pgp.fingerprint };
      if (hasProp(data, 'pgp', 'url')) {
        publicKey.url = data.pgp.url;
      }
      keychain.push(publicKey);
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
      if (data.location.toString().indexOf('{') !== -1) {
        location = data.location;
      }
    }

    $scope.user = {
      username: $routeParams.username,
      name: name,
      avatarUrl: avatarUrl,
      backgroundUrl: backgroundUrl,
      location: location,
      bio: data.bio,
      followees: followees,
      featuredFriends: featuredFriends,
      unfeaturedFriendCount: unfeaturedFriendCount,
      profiles: profiles,
      websites: websites,
      payments: payments,
      keychain: keychain
    };

    Utils.loadAvatar($scope.user.avatarUrl, 'user-avatar-container', $scope.avatarSize);
    Utils.loadBackground($scope.user.backgroundUrl, 'profile-bottom');

    for (var j = 0; j < $scope.user.featuredFriends.length; j++) {
      Utils.loadAvatar($scope.user.featuredFriends[j].avatarUrl, 'friend-avatar-' + j, $scope.friendAvatarSize);
    }
  }, function() {
    if ($routeParams.username === 'ryansheasample') {

      $scope.user = Samples.user();
      Utils.loadAvatar($scope.user.avatarUrl, 'user-avatar-container', $scope.avatarSize);
      Utils.loadBackground($scope.user.backgroundUrl, 'profile-bottom');
      
      for (var i = 0; i < $scope.user.featuredFriends.length; i++) {
        Utils.loadAvatar($scope.user.featuredFriends[i].avatarUrl, 'friend-avatar-' + i, $scope.friendAvatarSize);
      }
    }
  });

  $scope.openPaymentModal = function (size) {
    var modalInstance = $modal.open({
      templateUrl: '/views/_sendMoneyModal.html',
      controller: 'SendMoneyCtrl',
      size: size,
      resolve: {
        payments: function() {
          var payments = [];
          var validPaymentTypes = ['bitcoin', 'dogecoin', 'litecoin', 'namecoin'];
          for (var i in $scope.user.payments) {
            var payment = $scope.user.payments[i];
            if (payment.type && payment.identifier) {
              if (validPaymentTypes.indexOf(payment.type) !== -1) {
                payments.push(payment);
              }
            }
          }
          return payments;
        }
      }
    });
    return modalInstance;
  };

  $scope.openPublicKeyModal = function ($index) {
    var modalInstance = $modal.open({
      templateUrl: '/views/_publicKeyModal.html',
      controller: 'PublicKeyCtrl',
      resolve: {
        publicKey: function () {
          var validPublicKeyTypes = ['pgp', 'otr', 'ssh'];
          var publicKey = $scope.user.keychain[$index];
          if (validPublicKeyTypes.indexOf(publicKey.type) === -1) {
            return null;
          }
          return publicKey;
        }
      }
    });
    return modalInstance;
  };

  $scope.openFollowModal = function () {
    var modalInstance = $modal.open({
      templateUrl: '/views/_followModal.html',
      controller: 'FollowModalCtrl'
    });
    return modalInstance;
  };

  $scope.openFollowingModal = function (size) {
    var modalInstance = $modal.open({
      templateUrl: '/views/_followingModal.html',
      controller: 'FollowingModalCtrl',
      size: size,
      resolve: {
        followees: function() {
          return $scope.user.followees;
        }
      }
    });
    return modalInstance;
  };

});

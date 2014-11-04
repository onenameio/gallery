'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the profileviewerApp
 */

angular.module('profileviewerApp')
.controller('ProfileCtrl', function ($scope, $routeParams, Utils, Person, $modal) {
  $scope.user = {};

  $scope.avatarSize = 200;
  $scope.friendAvatarSize = 100;

  $scope.validContactTypes = ['email', 'phone', 'skype', 'bitmessage', 'xmpp'];

  var hasProp = Utils.hasProp;
  var getProp = Utils.getProp;

  $scope.urlDomain = function(url) {
      var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      var domain = matches && matches[1];
      return domain;
  };

  $scope.processV01Profile = function(data) {
    var profiles = [], payments = [], websites = [];

    if (data.website) {
      var website = { url: data.website, iconClass: 'fa-link', type: 'website dark-gradient', domain: $scope.urlDomain(data.website) };
      websites.push(website);
    }
    if (data.bitcoin) {
      var payment = { type: 'bitcoin', identifier: data.bitcoin };
      payments.push(payment);
    }

    return {
      username: $routeParams.username,
      name: data.name,
      avatarUrl: data.avatar,
      backgroundUrl: data.cover,
      location: data.location,
      bio: data.bio,
      profiles: profiles,
      websites: websites,
      payments: payments,
    };
  };

  $scope.processGraphfile = function(graph) {
    var followees = [], featuredFollowees = [];
    var numFeatured = 4, numUnfeatured = null;
    if (graph.followees) {
      var followeeObject = graph.followees;
      numUnfeatured = Object.keys(followeeObject).length;
      for (var i in Object.keys(followeeObject)) {
        var key = Object.keys(followeeObject)[i];
        var followee = followeeObject[key];
        if (hasProp(followee, 'avatar_url')) {
          followee.avatarUrl = getProp(followee, 'avatar_url');
        }
        followees.push(followee);
        if (i < numFeatured) {
          featuredFollowees.push(followee);
          numUnfeatured = numUnfeatured - 1;
        }
      }
    }

    return {
      followees: followees,
      featuredFollowees: featuredFollowees,
      numUnfeatured: numUnfeatured
    };

  };

  $scope.processV02Profile = function(data) {

    var profiles = [], payments = [], featuredFriends = [], websites = [], keychain = [],
      profile = null, avatarUrl = null, backgroundUrl = null, followees = [], contactMethods = [],
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

    if (data.graph) {
      var processedGraph = $scope.processGraphfile(data.graph);
      followees = processedGraph.followees;
      featuredFriends = processedGraph.featuredFollowees;
      unfeaturedFriendCount = processedGraph.numUnfeatured;
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
    } else if (data.avatar) {
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
    if (hasProp(data, 'contactMethods')) {
      contactMethods = data.contactMethods;
    }
    if (hasProp(data, 'email')) {
      var contactMethod = { type: 'email', identifier: data.email };
      contactMethods.append(contactMethod);
    }

    return {
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
      keychain: keychain,
      contactMethods: contactMethods
    };

  };

  $scope.iconClasses = {
    twitter: 'fa-twitter',
    facebook: 'fa-facebook',
    github: 'fa-github',
    linkedin: 'fa-linkedin',
    instagram: 'fa-instagram',
    reddit: 'fa-reddit',
    hackernews: 'fa-hacker-news',
    stackoverflow: 'fa-stack-overflow',
    angellist: 'fa-angellist',
    googleplus: 'fa-google-plus'
  };

  $scope.processV03Profile = function(data) {
    var featuredFriends = [], i = 0,
      avatarUrl = null, backgroundUrl = null, followees = [],
      unfeaturedFriendCount = 0, fullName = null, location = null;

    if (hasProp(data, 'name', 'formatted')) {
      fullName = data.name.formatted;
    }
    if (hasProp(data, 'location', 'formatted')) {
      location = data.location.formatted;
    }
    for (i in data.photos) {
      var photo = data.photos[i];
      if (photo.type === 'avatar' && photo.url) {
        avatarUrl = photo.url;
      }
      if (photo.type === 'background' && photo.url) {
        backgroundUrl = photo.url;
      }
    }
    for (i in data.profiles) {
      var profile = data.profiles[i];
      if ($scope.iconClasses[profile.type]) {
        profile.iconClass = $scope.iconClasses[profile.type];
      }
    }

    if (hasProp(data, 'network', 'followees')) {
      featuredFriends = data.network.followees.slice(0, 4);
    }

    if (data.graph) {
      var processedGraph = $scope.processGraphfile(data.graph);
      followees = processedGraph.followees;
      featuredFriends = processedGraph.featuredFollowees;
      unfeaturedFriendCount = processedGraph.numUnfeatured;
    }

    for (i in data.websites) {
      var website = data.websites[i];
      website.domain = $scope.urlDomain(website.url);
    }

    return {
      username: $routeParams.username,
      name: fullName,
      avatarUrl: avatarUrl,
      backgroundUrl: backgroundUrl,
      location: location,
      bio: data.bio,
      followees: followees,
      featuredFriends: featuredFriends,
      unfeaturedFriendCount: unfeaturedFriendCount,
      profiles: data.profiles,
      websites: data.websites,
      payments: data.payments,
      keychain: data.keychain,
      contactMethods: data.contact
    };
  };

  $scope.processProfile = function(data) {
    var user = null;
    if (data.v) {
      if (data.v === '0.3') {
        user = $scope.processV03Profile(data);
      } else if (data.v === '0.2') {
        user = $scope.processV02Profile(data);
      } else if (data.v === '0.1') {
        user = $scope.processV01Profile(data);
      }
    } else {
      user = $scope.processV02Profile(data);
    }
    return user;
  };

  Person.findByUsername($routeParams.username, function(data) {
    $scope.user = $scope.processProfile(data);

    Utils.loadAvatar($scope.user.avatarUrl, 'user-avatar-container', $scope.avatarSize);
    Utils.loadBackground($scope.user.backgroundUrl, 'profile-bottom');

    for (var j = 0; j < $scope.user.featuredFriends.length; j++) {
      Utils.loadAvatar($scope.user.featuredFriends[j].avatarUrl, 'friend-avatar-' + j, $scope.friendAvatarSize);
    }
  }, function(data) {
    console.log(data);
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

  $scope.openContactModal = function ($index) {
    var modalInstance = $modal.open({
      templateUrl: '/views/_contactModal.html',
      controller: 'ContactModalCtrl',
      resolve: {
        contactMethods: function() {
          return $scope.user.contactMethods;
        },
        index: function() {
          return $index;
        }
      }
    });
    return modalInstance;
  };

});

'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
  .controller('MainCtrl', function ($scope, Person, Utils, $modal) {

    function shuffle(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    $scope.featuredUsers = shuffle([
      { username: 'fredwilson', avatarUrl: 'https://s3.amazonaws.com/65m/fredwilson-avatar.jpg' },
      { username: 'peter', avatarUrl: 'https://s3.amazonaws.com/kd4/peter' },
      { username: 'jespow', avatarUrl: 'https://s3.amazonaws.com/kd4/jespow' },
      { username: 'albertwenger', avatarUrl: 'https://s3.amazonaws.com/kd4/albertwenger.gif' },
      { username: 'arianna', avatarUrl: 'https://s3.amazonaws.com/97p/ariannas-profile.jpg' },
      { username: 'will', avatarUrl: 'https://s3.amazonaws.com/kd4/will' },
      { username: 'vitalik', avatarUrl: 'https://s3.amazonaws.com/kd4/vitalik' },
      { username: 'mattcutts', avatarUrl: 'https://s3.amazonaws.com/kd4/mattcutts' },
      { username: 'davidlee', avatarUrl: 'https://s3.amazonaws.com/kd4/davidlee.jpeg' },
      { username: 'naval', avatarUrl: 'https://s3.amazonaws.com/kd4/naval.jpeg' },
      { username: 'barrysilbert', avatarUrl: 'https://s3.amazonaws.com/kd4/barrysilbert.jpeg' },
      { username: 'justin', avatarUrl: 'https://s3.amazonaws.com/kd4/justin.jpg' },
      { username: 'jhuber', avatarUrl: 'https://s3.amazonaws.com/kd4/jhuber' },
      { username: 'imtillman', avatarUrl: 'https://s3.amazonaws.com/kd4/imtillman' },
      { username: 'cameron', avatarUrl: 'https://s3.amazonaws.com/kd4/cwinklevoss' },
      { username: 'tyler', avatarUrl: 'https://s3.amazonaws.com/kd4/tyler' },
      { username: 'gavin', avatarUrl: 'https://s3.amazonaws.com/kd4/gavin' },
      { username: 'jgarzik', avatarUrl: 'https://s3.amazonaws.com/kd4/jgarzik' },
      { username: 'anthony', avatarUrl: 'https://s3.amazonaws.com/kd4/anthony' },
      { username: 'mike', avatarUrl: 'https://s3.amazonaws.com/kd4/mike.jpeg'},
      { username: 'sarah', avatarUrl: 'https://s3.amazonaws.com/kd4/sarah.jpeg' },
      { username: 'haydentiff', avatarUrl: 'https://s3.amazonaws.com/kd4/haydentiff' },
      { username: 'starkness', avatarUrl: 'https://s3.amazonaws.com/kd4/starkness' },
      { username: 'annaknone', avatarUrl: 'https://s3.amazonaws.com/kd4/annaknone' },
      { username: 'rhian', avatarUrl: 'https://s3.amazonaws.com/kd4/rhian' },
    ]).splice(0,18);

    for (var j = 0; j < $scope.featuredUsers.length; j++) {
      Utils.loadAvatar($scope.featuredUsers[j].avatarUrl, 'friend-avatar-' + j, 100);
    }

    $scope.openSignupModal = function () {
      var modalInstance = $modal.open({
        templateUrl: '/views/_signupModal.html',
      controller: 'SignupModalCtrl'
      });
      return modalInstance;
    };

  })
;

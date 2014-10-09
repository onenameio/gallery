'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
  .controller('MainCtrl', function ($scope, Person, Utils) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.featuredFriends = [
      { username: 'gavin', avatarUrl: 'https://s3.amazonaws.com/kd4/gavin' },
      { username: 'albertwenger', avatarUrl: 'https://pbs.twimg.com/profile_images/1773890030/aew_artistic_bigger.gif' },
      { username: 'fredwilson', avatarUrl: 'https://s3.amazonaws.com/65m/fredwilson-avatar.jpg' },
      { username: 'muneeb', avatarUrl: 'https://s3.amazonaws.com/kd4/muneeb' },
      { username: 'naval', avatarUrl: 'https://pbs.twimg.com/profile_images/3696617328/667874c5936764d93d56ccc76a2bcc13.jpeg' },
      { username: 'arianna', avatarUrl: 'https://s3.amazonaws.com/97p/ariannas-profile.jpg' },
      { username: 'ryanshea', avatarUrl: 'https://s3.amazonaws.com/97p/tux.jpg' },      
    ];

    for (var j = 0; j < $scope.featuredFriends.length; j++) {
      Utils.loadAvatar($scope.featuredFriends[j].avatarUrl, 'friend-avatar-' + j, 100);
    }

  });

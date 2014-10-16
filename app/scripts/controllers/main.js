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

    $scope.featuredUsers = [
      { username: 'gavin', avatarUrl: 'https://s3.amazonaws.com/kd4/gavin' },
      { username: 'peter', avatarUrl: 'https://s3.amazonaws.com/kd4/peter' },
      { username: 'andreacastillo', avatarUrl: 'https://pbs.twimg.com/profile_images/415589178836262913/1eHaxr0j.jpeg' },
      { username: 'jespow', avatarUrl: 'https://s3.amazonaws.com/kd4/jespow' },
      { username: 'albertwenger', avatarUrl: 'https://pbs.twimg.com/profile_images/1773890030/aew_artistic_bigger.gif' },
      { username: 'arianna', avatarUrl: 'https://s3.amazonaws.com/97p/ariannas-profile.jpg' },
      { username: 'will', avatarUrl: 'https://s3.amazonaws.com/kd4/will' },
      { username: 'fredwilson', avatarUrl: 'https://s3.amazonaws.com/65m/fredwilson-avatar.jpg' },
      { username: 'vitalik', avatarUrl: 'https://s3.amazonaws.com/kd4/vitalik' },
      { username: 'mattcutts', avatarUrl: 'https://s3.amazonaws.com/kd4/mattcutts' },
      { username: 'davidlee', avatarUrl: 'https://pbs.twimg.com/profile_images/424215824052658176/eAyEH66A.png' },
      { username: 'naval', avatarUrl: 'https://pbs.twimg.com/profile_images/3696617328/667874c5936764d93d56ccc76a2bcc13.jpeg' },
      { username: 'barrysilbert', avatarUrl: 'https://pbs.twimg.com/profile_images/2597394462/32b6p3stu0g09zwy8rq5.jpeg' },
      { username: 'justin', avatarUrl: 'https://pbs.twimg.com/profile_images/1776226133/image1327350134.png' },
      { username: 'jhuber', avatarUrl: 'https://s3.amazonaws.com/kd4/jhuber' },
      { username: 'inesmilans', avatarUrl: 'https://pbs.twimg.com/profile_images/442405100938485760/5Pt5F2WA.jpeg' },
      { username: 'cameron', avatarUrl: 'https://s3.amazonaws.com/kd4/cwinklevoss' },
      { username: 'tyler', avatarUrl: 'https://s3.amazonaws.com/kd4/tyler' },
    ];

    for (var j = 0; j < $scope.featuredUsers.length; j++) {
      Utils.loadAvatar($scope.featuredUsers[j].avatarUrl, 'friend-avatar-' + j, 100);
    }

  });

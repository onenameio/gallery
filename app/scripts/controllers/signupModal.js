'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:SignupModalCtrl
 * @description
 * # SignupModalCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('SignupModalCtrl', function ($scope) {

  $scope.sites = [
    { name: 'onename', url: 'https://onename.io' },
    { name: 'namecoin', url: 'http://namecoin.info/?p=download' }
  ];

});

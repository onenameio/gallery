'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

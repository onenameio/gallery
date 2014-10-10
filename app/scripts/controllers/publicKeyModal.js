'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:PublicKeyCtrl
 * @description
 * # PublicKeyCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('PublicKeyCtrl', function ($scope, $modalInstance, publicKey, PGPKey) {

  $scope.publicKey = publicKey;

  if ($scope.publicKey.url) {
    PGPKey.get(publicKey.url, function(data) {
      $scope.publicKey.value = data;
    });
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

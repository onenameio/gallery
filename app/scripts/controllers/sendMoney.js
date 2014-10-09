'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:ModalInstanceCtrl
 * @description
 * # ModalInstanceCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('SendMoneyCtrl', function ($scope, $modalInstance, bitcoinAddress) {

  $scope.bitcoinAddress = bitcoinAddress;

  $scope.copyButtonText = 'Copy Address';

  $scope.toggleQrcode = function() {
    if ($scope.qrcodeShown) {
      $scope.qrcodeShown = false;
    } else {
      $scope.qrcodeShown = true;
    }
  };

  $scope.resetAddress = function() {
    $scope.bitcoinAddress = bitcoinAddress;
  };

  $scope.getTextToCopy = function() {
    return $scope.bitcoinAddress;
  };

  $scope.notifyUserOfCopy = function() {
    $scope.copyButtonText = 'Copied!';
  };

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

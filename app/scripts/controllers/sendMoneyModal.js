'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:SendMoneyCtrl
 * @description
 * # SendMoneyCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('SendMoneyCtrl', function ($scope, $modalInstance, payments) {

  $scope.payments = payments;

  $scope.selectMethod = function(index) {
    $scope.index = index;
    $scope.address = payments[index].identifier;
    $scope.paymentType = payments[index].type;
    $scope.copyButtonText = 'Click to Copy';
  };

  $scope.selectMethod(0);

  $scope.toggleQrcode = function() {
    if ($scope.qrcodeShown) {
      $scope.qrcodeShown = false;
    } else {
      $scope.qrcodeShown = true;
    }
  };

  $scope.resetAddress = function() {
    $scope.address = payments[$scope.index].identifier;
  };

  $scope.getTextToCopy = function() {
    return $scope.address;
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

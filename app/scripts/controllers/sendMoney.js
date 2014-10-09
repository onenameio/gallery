'use strict';

/**
 * @ngdoc function
 * @name profileviewerApp.controller:SendMoneyCtrl
 * @description
 * # SendMoneyCtrl
 * Controller of the profileviewerApp
 */
angular.module('profileviewerApp')
.controller('SendMoneyCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/views/_sendMoney.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});

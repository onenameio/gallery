'use strict';

angular.module('profileviewerApp')
.directive('typeahead', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: 'views/_searchbar.html',
        scope: {
            search: '&',
            select: '&',
            items: '=',
            term: '=',
            timeout: '@',
            placeholder: '@'
        },
        controller: ['$scope', function($scope) {
            $scope.items = [];
            $scope.hide = false;

            this.activate = function(item) {
                $scope.active = item;
            };

            this.activateNextItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[(index + 1) % $scope.items.length]);
            };

            this.activatePreviousItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[index === 0 ? $scope.items.length - 1 : index - 1]);
            };

            this.isActive = function(item) {
                return $scope.active === item;
            };

            this.selectActive = function() {
                this.select($scope.active);
            };

            this.select = function() { // parameters: item
                //$scope.hide = true;
                //$scope.focused = true;
                //$scope.select({item:item});
            };

            $scope.isVisible = function() {
                return !$scope.hide && ($scope.focused || $scope.mousedOver);
            };
        }],
        link: function(scope, element, attrs, controller) {
        	var $form = element.find('form');
            var $input = $form.find('input');
            var $list = element.find('> div');

            $input.bind('focus', function() {
                scope.$apply(function() {
                    scope.focused = true;
                    scope.query();
                });
            });

            $input.bind('blur', function() {
                scope.$apply(function() { scope.focused = false; });
            });

            $list.bind('mouseover', function() {
                scope.$apply(function() { scope.mousedOver = true; });
            });

            $list.bind('mouseleave', function() {
                scope.$apply(function() { scope.mousedOver = false; });
            });

            $input.bind('keyup', function(e) {
                if (e.keyCode === 9 /* tab */ || e.keyCode === 13 /* enter */) {
                    console.log('tab/enter!');
                    scope.$apply(function() { controller.selectActive(); });
                }

                if (e.keyCode === 27 /* escape */) {
                    scope.$apply(function() { scope.hide = true; });
                }
            });

            $input.bind('keydown', function(e) {
                if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
                    e.preventDefault();
                }

                if (e.keyCode === 40 /* down arrow */) {
                    console.log('down arrow!');
                    e.preventDefault();
                    scope.$apply(function() { controller.activateNextItem(); });
                }

                if (e.keyCode === 38 /* up arrow */) {
                    console.log('up arrow!');
                    e.preventDefault();
                    scope.$apply(function() { controller.activatePreviousItem(); });
                }
            });

            scope.$watch('items', function(items) {
                controller.activate(items.length ? items[0] : null);
            });

            scope.$watch('isVisible()', function(visible) {
                if (visible) {
                    if ($input && $input.length > 0) {
                        $list.css({
                            top: $input.position().top + $input[0].offsetHeight,
                            left: $input.position().left,
                            position: 'absolute',
                            display: 'block',
                            width: $input[0].offsetWidth
                        });
                    }
                } else {
                    $list.css('display', 'none');
                }
            });

            scope.timeout = parseInt(scope.timeout);

            scope.query = function() {
                if (scope.pendingPromise) {
                    $timeout.cancel(scope.pendingPromise);
                }
                scope.pendingPromise = $timeout(function() {
                    scope.hide = false;
                    scope.search({term:scope.term});
                }, scope.timeout);
            };
        }
    };
}])
.directive('typeaheadItem', function() {
    return {
        require: '^typeahead',
        link: function(scope, element, attrs, controller) {

            var item = scope.$eval(attrs.typeaheadItem);

            scope.$watch(function() { return controller.isActive(item); }, function(active) {
                if (active) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });

            element.bind('mouseenter', function() { // parameters: e
                scope.$apply(function() { controller.activate(item); });
            });

            element.bind('click', function() { // parameters: e
                scope.$apply(function() { controller.select(item); });
            });
        }
    };
})
;
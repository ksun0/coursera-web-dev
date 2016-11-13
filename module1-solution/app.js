(function () {
  'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.menuItems = "";
    $scope.message = "";

    $scope.checkTooMuch = function() {
      var numItems = $scope.menuItems.split(',').length;
      if ($scope.menuItems.length == 0) { // Already trimmed
        $scope.message = "Please enter items you usually eat for lunch first"
      }
      else if (numItems > 3) {
        $scope.message = "Too much!";
      }
      else {
        $scope.message = "Enjoy!";
      }

    };

  }

})();

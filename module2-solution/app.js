
(function () {
  'use strict';

  angular.module('ShoppingListApp', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // LIST #1 - controller
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;


    toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.itemName = "";
    toBuyList.itemQuantity = "";

    toBuyList.addToBuyItem = function () {
      try {
        ShoppingListCheckOffService.addToBuyItem(toBuyList.itemName, toBuyList.itemQuantity);
      } catch (error) {
        toBuyList.errorMessage = error.message;
      }
    }

    toBuyList.removeToBuyItem = function (itemIndex) {
      ShoppingListCheckOffService.removeToBuyItem(itemIndex);
    };

		toBuyList.hasItems = function(){
			return toBuyList.toBuyItems.length;
		}

    toBuyList.bought = function (itemIndex) {
      ShoppingListCheckOffService.bought(itemIndex);
    };
  }


  // LIST #2 - controller
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtList = this;


    alreadyBoughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();

    alreadyBoughtList.itemName = "";
    alreadyBoughtList.itemQuantity = "";


    		alreadyBoughtList.hasItems = function(){
    			return alreadyBoughtList.boughtItems.length;
    		}

    alreadyBoughtList.removeBoughtItem = function (itemIndex) {
      ShoppingListCheckOffService.removeBoughtItem(itemIndex);
    };
  }


  // If not specified, maxItems assumed unlimited
  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var toBuyItems = [
      { name: 'cookies', quantity: 5},
      { name: 'apples', quantity: 10},
      { name: 'bananas', quantity: 8},
      { name: 'milks', quantity: 3},
      { name: 'eggs', quantity: 24},
    ];

    var boughtItems = [
    ];

    service.addToBuyItem = function (itemName, quantity) {

      var item = {
        name: itemName,
        quantity: quantity
      };
      toBuyItems.push(item);


    };

    service.addBoughtItem = function (itemName, quantity) {

      var item = {
        name: itemName,
        quantity: quantity
      };
      boughtItems.push(item);


    };

    service.removeToBuyItem = function (itemIndex) {
      toBuyItems.splice(itemIndex, 1);
    };

    service.removeBoughtItem = function (itemIndex) {
      boughtItems.splice(itemIndex, 1);
    };


    service.getToBuyItems = function () {
      return toBuyItems;
    };
    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.bought = function(itemIndex) {
      var item = {
        name: toBuyItems[itemIndex].name,
        quantity: toBuyItems[itemIndex].quantity
      };
      toBuyItems.splice(itemIndex, 1);
      boughtItems.push(item);
    }
  }


  // function ShoppingListCheckOffFactory() {
  //   var factory = function (maxItems) {
  //     return new ShoppingListCheckOffService(maxItems);
  //   };
  //
  //   return factory;
  // }

})();

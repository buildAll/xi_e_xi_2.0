'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.orderFactory
 * @description
 * # orderFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('orderFactory', function () {


    var orderList = [];

    function addNewOrder(newOrder){
      newOrder.id = orderList.length+1;
      orderList.push(newOrder);
      console.log(newOrder);
    }

    function getOrderList(){
      return orderList;
    }
   

    // Public API here
    return {
      add: addNewOrder,
      get: getOrderList
    };
  });

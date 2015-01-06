'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:MyorderCtrl
 * @description
 * # MyorderCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('MyorderCtrl', ['orderFactory','MessageFactory','$scope','$location','$http',function (orderFactory,MessageFactory,$scope,$location,$http) {
      $scope.goBack = function(){
      	$location.path('/');
      }
    //  MessageFactory.get(parseInt("1"));  
     // $scope.myOrders = orderFactory.get();
     var userOrder;
     $http.get('http://192.168.1.104:3000/GetUserOrder?id='+4).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                
                 userOrder = data;


              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              }).then(function(){
                   $scope.myOrders = userOrder;
                   console.log("my order is :" + $scope.myOrders);
              });

      //$scope.myOrders = MessageFactory.userOrder();
      //console.log("my order is :" + $scope.myOrders);
    }]);

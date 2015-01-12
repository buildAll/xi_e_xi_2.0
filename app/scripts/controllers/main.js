'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('MainCtrl', ['isSignUpFactory','addressFactory','$scope','$rootScope','$http','$location',function (isSignUpFactory,addressFactory,$scope,$rootScope,$http,$location) {
       $scope.newOrder = function() {
       	//$rootScope.$emit('newOrder');
       	 var isSignUp = isSignUpFactory.checkStatus();
           if (isSignUp) {
            console.log("go to order");
          	$location.path('/order');
          } else{
            console.log("go to signUp");
          	$location.path('/signUp')
          };
       }
  }]);

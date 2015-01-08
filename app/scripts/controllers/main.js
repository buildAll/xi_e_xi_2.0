'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('MainCtrl', function ($scope,$rootScope,$http) {
       $scope.newOrder = function() {
       	//$rootScope.$emit('newOrder');
       	// var isSignUp = userStatus.isSignUp();
        //   if (isSignUp) {
        //   	$location.path('/order');
        //   } else{
        //   	$location.path('/signUp')
        //   };
       }
  });

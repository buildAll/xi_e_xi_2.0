'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:TabCtrl
 * @description
 * # TabCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('TabCtrl', ['Tabs','$scope','$rootScope', function (Tabs,$scope,$rootScope) {


    $scope.tabs = Tabs.getPageTabs();

   
    $scope.selected = $scope.tabs[0].name;

    $scope.setTab = function() {
    	
    	$scope.selected = $scope.tabs[1].name;
    }
   

    $rootScope.$on('newOrder', function() {
        $scope.selected = $scope.tabs[1].name;
    });


    $scope.activeTab= function (name) {
       return $scope.selected = name;
    }
    $scope.isSelected = function (name) {
    	return $scope.selected === name;
    }
  }]);

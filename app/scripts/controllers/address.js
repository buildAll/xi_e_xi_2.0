'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:AddressCtrl
 * @description
 * # AddressCtrl is designed for 
 * # 1. show the valid citys for user to select
 * # 2. get the name and number from the user
 * # 3. save the user select address
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('AddressCtrl',[ '$scope','$location','$rootScope','addressFactory','MessageFactory', function ($scope,$location,$rootScope,addressFactory,MessageFactory) {
      //go back to previous view
      $scope.goBack = function (){
      	 $location.path('/order');
      }

      //init city list for select
      $scope.cityForSelect = addressFactory.getCity();
      $scope.selectedCity = $scope.cityForSelect[0];

      //init zone list for select
      $scope.zoneForSelect = addressFactory.getZone($scope.cityForSelect[0]);
      $scope.selectedZone = $scope.zoneForSelect[0];
      
      //update zone list when change city
      $scope.updateZoneForSelect =function() {
      	var index = $scope.selectedCity.id - 1;
      	$scope.zoneForSelect = addressFactory.getZone($scope.cityForSelect[index]);
        $scope.selectedZone = $scope.zoneForSelect[0];
      }

      //get the new address
      $scope.saveAddress = function() {
      	var newAddress = {};
      	newAddress.userName = $scope.userName;
      	newAddress.userTel = $scope.userTel;
      	newAddress.cityName = $scope.selectedCity.name;
      	newAddress.zone = $scope.selectedZone;
      	newAddress.detail = $scope.detail;
            newAddress.userID = parseInt("0004"); 
      	
      	addressFactory.add(newAddress);
      	console.log(addressFactory.getUserAddress());
            MessageFactory.create(newAddress,"NewAddress");
            // $scope.goBack();
      }

      $rootScope.$on('addressOK',function(){
            $scope.goBack();
      })

    }]);

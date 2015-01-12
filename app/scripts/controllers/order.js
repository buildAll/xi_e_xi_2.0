'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('OrderCtrl', ['MessageFactory','timeFactory','addressFactory','orderFactory','$scope','$location','$rootScope','$http', function (MessageFactory,timeFactory,addressFactory,orderFactory,$scope,$location,$rootScope,$http) {
    
   



// $scope.userAddress = addressFactory.getUserAddress();
  var remote_host = "123.56.92.81";
  var local_host = "localhost";
  var host = local_host;
  var userAddress = [];
  $http.get('http://'+host+':3000/GetUserAddress?id='+4).
  success(function(data, status, headers, config) {
    
     userAddress = data;
     console.log(data);
     

  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  }).then(function(){
       $scope.userAddress = userAddress;
  });

   var todayDate = new Date;
   var today = todayDate.getDate();
   
   $scope.dayList = timeFactory.getDuration().dayDuration;
   $scope.timeList = timeFactory.getValidTimeDuration();
  


   //if the first valid day is today, get the valid time durations for select
   //else, use the full time durations for select 
   function getTimeDuration (index) {
      if ($scope.dayList[index].day.day === today) {
	      $scope.timeList = timeFactory.getValidTimeDuration();
	   }else{
	   	  $scope.timeList = timeFactory.getDuration().timeDuration;
	   }
   }

   
   

      
    $scope.updateTimeDuration = function () {
    	var selectIndex = $scope.selectedDay.id-1;
    	getTimeDuration(selectIndex);
      $scope.selectedTime = $scope.timeList[0]; 
    }
   
     //init day and time select 
      $scope.selectedDay = $scope.dayList[0];
      $scope.selectedTime = $scope.timeList[0];
   

    $scope.addAddress = function () {
      $location.path('/address');
    }

    $scope.goBack = function () {
      $location.path('/');
    }
    
  
   $scope.selectedAddress="";

   $scope.confirmOrder = function(){
      console.log('confirmOrder')
      $location.path('/mine');
    } 


   
  $scope.createOrder = function(){
      var order = {};
      var addressIndex =$scope.selectedAddress;
      order.customer_id = parseInt("0004"); 
      order.contacter_name = $scope.userAddress[addressIndex].contacter_name;
      order.contacter_phone = $scope.userAddress[addressIndex].contacter_phone;
      order.day = $scope.selectedDay;
      order.time = $scope.selectedTime;
      order.city_name = $scope.userAddress[addressIndex].city_name;
      order.region_name = $scope.userAddress[addressIndex].region_name;
      order.city_id = $scope.userAddress[addressIndex].city_id;
      order.region_id = $scope.userAddress[addressIndex].region_id;
      order.street = $scope.userAddress[addressIndex].street;
      order.express_status_id = 0;
      order.is_canceled = 0;
      order.create_time = today;
      order.id = order.customer_id + order.region_id + order.city_id + new Date().getHours();
      orderFactory.add(order);
      MessageFactory.create(order,'NewOrder');
      
     // $rootScope.on('orderOK',function(){
     //  $location.path('/mine');
     // });


      // $location.path('/mine');
      // BootstrapDialog.show({
      //       title: 'Default Title',
      //       message: 'Click buttons below.',
      //       buttons: [{
      //           label: '确认',
      //           cssClass: 'btn-success  close-dialog',
      //           action: function(dialogItself){
      //               dialogItself.close();
      //               return $location.path('/mine');
      //               $scope.$emit('modal-closed');
      //              // $location.path('/mine');
      //              // confirmOrder();
      //           }
      //       }, {
      //           label: '修改',
      //           cssClass: 'btn-default',
      //           action: function(dialogItself){
      //               dialogItself.close();
      //           }
               
      //       }]
      //   });  
   
   }


       $rootScope.$on('orderOK',function(){
          // $location.path('/mine');
         
              $location.path('/mine');
         });
   
   // $scope.$on('modal-closed',function(){
   //      $scope.$emit('leave');
   //       console.log("aaaa");
   // })
   // $scope.$on('leave',function(){
   //      console.log("aaaa");
   //      $location.path('/mine');
   // })
    
  }]);

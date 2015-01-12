'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('SignupCtrl', ['wechatFactory','$scope',"$http","$location",function (wechatFactory,$scope,$http,$location) {

    $scope.addNewUser = function () {
    	var tel = $scope.userTel;
    	if (tel) {

        //172.13.1.62
         var wid = wechatFactory.getWeChatID();
         $http.get('http://'+"localhost"+':3000/addNewUser?tel='+tel+'&wechat_id='+wid).
    	  // $http.get('http://'+'172.13.1.62'+'/index.php/user/reg/'+tel).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            
             if (data.result = 1) {
                  
                  $location.path("/order");

             } else{
                  console.log("sign up failed");
             };

          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          }).then(function(){
              
          });

    	} 
    	
    }

   // $scope.userTel = 1234444;

  }]);

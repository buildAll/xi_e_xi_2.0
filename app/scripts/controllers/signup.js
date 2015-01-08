'use strict';

/**
 * @ngdoc function
 * @name cloudLaundryApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the cloudLaundryApp
 */
angular.module('cloudLaundryApp')
  .controller('SignupCtrl', ['$scope',"$http",function ($scope,$http) {

    $scope.addNewUser = function () {
    	var tel = $scope.userTel;
    	if (tel) {
    	  $http.get('http://'+"localhost"+':3000/addNewUser?tel='+tel+'&wechat_id=2312121').
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            
             console.log(data);
            

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

'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.MessageFactory
 * @description
 * # MessageFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('MessageFactory', ['$http','$rootScope',function ($http, $rootScope) {
         var addData = function(params,backendMethod) {
              var method = 'POST';
              var url = "http://192.168.1.104:3000/"+backendMethod;
               console.log($.param(params));
              return $http({
                  method: method,
                  url : url,
                  data: $.param(params),
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  transformResponse:function(data){
                    // console.log("The response is "+data);
                    if (data==="Order Added") {
                      // console.log("ready to emit\n");
                      $rootScope.$emit("orderOK");
                    }

                    if (data==="Address Added") {
                       // console.log("addressOK\n");
                      $rootScope.$emit("addressOK");
                    }
                  }
              });
          }   

 

          return {
              create: addData
          };
      
  }]);

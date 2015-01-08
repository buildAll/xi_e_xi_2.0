'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.addressFactory
 * @description
 * # addressFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('addressFactory', ["$http",function ($http) {


   var city;
   var index;
 // 123.56.92.81

 var remote_host = "123.56.92.81";
 var local_host = "localhost";

 var host = local_host;

   $http.get('http://'+host+':3000/GetCity').
    success(function(data, status, headers, config) {
       city = data;
    }).
    error(function(data, status, headers, config) {
    }).
    then(function(){
      getZoneFromServer(0,city.length,city);
    });
   


   var getZoneFromServer = function(k,length,area){
     if(k<length){
        index = k;
        area[index].zone = [];
        console.log("index is : " + index);
        $http.get('http://'+host+':3000/GetZone?id='+area[index].id).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          // console.log(data);

            for (var i = 0; i < data.length; i++) {
              console.log("index is : " + index);
              console.log("i is : " + i);

               area[index].zone.push(data[i].name);
            };
           //console.log(data);
            k++;
            getZoneFromServer(k,length,area);
        }).
        error(function(data, status, headers, config) {
        })
      };
   }

     


   var userAddress = [];

   function addNewAddress(addr){
     addr.id = userAddress.length + 1;
     userAddress.push(addr);
     console.log(userAddress);
   }

   

   function getCityZone(city){
    console.log(city);
    var cityZone = [];
    // city.zone.foreach(function(val){
    //      cityZone.push(val);
    // })
     for (var i = 0; i < city.zone.length; i++) {
       cityZone.push(city.zone[i]);
     };
     return cityZone;
   }

    

    // Public API here
    return {
      getCity: function () {
        return city;
      },
      getUserAddress: function () {
        return userAddress;
      },
      getZone: getCityZone,
      add:addNewAddress
    };
  }]);

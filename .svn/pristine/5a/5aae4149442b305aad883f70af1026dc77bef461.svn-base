'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.addressFactory
 * @description
 * # addressFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('addressFactory', function () {
   var city = [
     {id:1,name:"南京市",zone:["玄武区","江宁区","仙林区"]},
     {id:2,name:"上海市",zone:["徐汇区","静安区"]},
     {id:3,name:"北京市",zone:["朝阳区","东城区"]}
   ];

   var userAddress = [];

   function addNewAddress(addr){
     addr.id = userAddress.length + 1;
     userAddress.push(addr);
     console.log(userAddress);
   }

   

   function getCityZone(city){
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
  });

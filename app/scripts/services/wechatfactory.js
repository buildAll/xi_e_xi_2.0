'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.wechatFactory
 * @description
 * # wechatFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('wechatFactory', function () {
    

    function getWeChatID () {
      var wid;
      wid = 2312121;
      console.log("wechatID is: "+wid);
      return wid;
    }


    // Public API here
    return {
      getWeChatID: getWeChatID
    };
  });

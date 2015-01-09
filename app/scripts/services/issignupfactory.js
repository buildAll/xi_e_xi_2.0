'use strict';

/**
 * @ngdoc service
 * @name cloudLaundryApp.isSignUpFactory
 * @description
 * # isSignUpFactory
 * Factory in the cloudLaundryApp.
 */
angular.module('cloudLaundryApp')
  .factory('isSignUpFactory',['wechatFactory', '$http',function (wechatFactory,$http) {
    // Service logic
    // ...


    var wechatID = wechatFactory.getWeChatID(); 
    var signUpStatus = false;

    console.log(wechatID);

    function checkSignUp (wechatID) {
      $http.get('http://'+"localhost"+':3000/isSignUp?wechat_id='+wechatID).
      success(function (data, status, headers, config) {
        console.log(data);
        if (data==="Yes") {
          signUpStatus = true;
        } else{
          signUpStatus = false;
        };
      }).
      error(function (data, status, headers, config) {
        console.log("ERROR!");
      })
    }

    if (wechatID) {
        checkSignUp(wechatID);
    } else{
        console.log("Can not get wechat ID!!!");
    };

    // Public API here
    return {
      checkStatus: function () {
        return signUpStatus;
      }
    };
  }]);

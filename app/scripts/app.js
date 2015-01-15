'use strict';

/**
 * @ngdoc overview
 * @name cloudLaundryApp
 * @description
 * # cloudLaundryApp
 *
 * Main module of the application.
 */
angular
  .module('cloudLaundryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
    // 'angular-datepicker',
    // 'ui.date',
    // 'ngInputDate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/order', {
        templateUrl: 'views/order.html',
        controller: 'OrderCtrl'
      })
      .when('/address', {
        templateUrl: 'views/address.html',
        controller: 'AddressCtrl'
      })
      .when('/mine', {
        templateUrl: 'views/myOrder.html',
        controller: 'MyorderCtrl'
      })
      .when('/userCenter', {
// <<<<<<< HEAD
       templateUrl: 'views/userCenter.html',
        controller: 'UsercenterCtrl'
      })
      .when('/signUp', {
        templateUrl: 'views/signUp.html',
        controller: 'SignupCtrl'
      })
// =======
//         templateUrl: 'views/userCenter.html',
//         controller: 'UsercenterCtrl'
//       })
// >>>>>>> 6a1420e6abf13fa95186cb265bb0b7c983628dbc
      .otherwise({
        redirectTo: '/'
      });
  });

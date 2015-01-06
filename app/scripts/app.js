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
        templateUrl: 'views/userCenter.html',
        controller: 'UsercenterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

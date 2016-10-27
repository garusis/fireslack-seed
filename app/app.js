'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController',
        controllerAs: 'authCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController',
        controllerAs: 'authCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://fireslack-76c06.firebaseio.com/')
  .service('Firebase', Firebase);

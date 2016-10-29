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
        controllerAs: 'authCtrl',
        data: {
          requireNoAuth: true
        },
        params: {
          allowByAuth: false
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController',
        controllerAs: 'authCtrl',
        data: {
          requireNoAuth: true
        },
        params: {
          allowByAuth: false
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .run(['$rootScope', 'Auth', '$state', function ($rootScope, Auth, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var data = toState.data || {};
      if (toParams.allowByAuth || (_.isNil(data.requireNoAuth) && _.isNil(data.requireAuth))) return;

      event.preventDefault();
      Auth.$requireAuth()
        .then(function (auth) {
          if (data.requireAuth) {
            toParams.allowByAuth = true;
            return $state.go(toState.name, toParams)
          }
          $state.go('home');
        })
        .catch(function (error) {
          if (data.requireNoAuth) {
            toParams.allowByAuth = true;
            return $state.go(toState.name, toParams)
          }
          $state.go('login');
        });
    });
  }])
  .constant('FirebaseUrl', 'https://fireslack-76c06.firebaseio.com/')
  .constant('Firebase', Firebase);

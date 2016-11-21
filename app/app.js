'use strict';

firebase.initializeApp({
  apiKey: "AIzaSyClW5U3n7wYTF17IAjozmi1p-ohq1lP8rw",
  authDomain: " fireslack-76c06.firebaseapp.com",
  databaseURL: "https://fireslack-76c06.firebaseio.com/",
  storageBucket: "fireslack-76c06.appspot.com",
  messagingSenderId: "644332075779"
});

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
      }).state('profile', {
      url: '/profile',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      templateUrl: 'users/profile.html',
      data: {
        requireAuth: true
      },
      params: {
        allowByAuth: false
      },
      resolve: {
        profile: function (Users, Auth) {
          return Auth.$requireAuth()
            .then(function (auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  })
  .run([
    '$rootScope', 'Auth', '$state', 'FirebaseConfig',
    function ($rootScope, Auth, $state, FirebaseConfig) {


      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var data = toState.data || {};
        if (toParams.allowByAuth || (_.isNil(data.requireNoAuth) && _.isNil(data.requireAuth))) return;

        event.preventDefault();
        Auth.$requireSignIn()
          .then(function () {
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
  .constant('FirebaseConfig', {});

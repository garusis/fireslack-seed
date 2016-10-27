/**
 * Created by garusis on 26/10/16.
 */
;!(function (module) {

  AuthController.$inject = ['Auth', '$state'];
  function AuthController(Auth, $state) {
    var authCtrl = this;

    authCtrl.vm = {
      user: {
        email: '',
        password: ''
      }
    };

    authCtrl.login = function (user) {
      Auth
        .$authWithPassword(user)
        .then(function (auth) {
          $state.go('home');
        }, function (error) {
          authCtrl.error = error;
        });
    };

    authCtrl.register = function (user) {
      Auth
        .$createUser(user)
        .then(function (newUser) {
          console.log(newUser);
          authCtrl.login(user);
        }, function (error) {
          authCtrl.error = error;
        });
    };

  }

  module
    .controller('AuthController', AuthController);
})(angular.module('angularfireSlackApp'));

/**
 * Created by garusis on 26/10/16.
 */
;!(function (module) {

  AuthFactory.$inject = ['$firebaseAuth'];
  function AuthFactory($firebaseAuth) {
    var Auth = $firebaseAuth();

    return Auth;
  }

  module
    .factory('Auth', AuthFactory);
})(angular.module('angularfireSlackApp'));

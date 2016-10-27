/**
 * Created by garusis on 26/10/16.
 */
;!(function (module) {

  AuthFactory.$inject = ['$firebaseAuth', 'FirebaseUrl', 'Firebase'];
  function AuthFactory($firebaseAuth, FirebaseUrl, Firebase) {
    var fireBaseReference = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(fireBaseReference);

    return auth;
  }

  module
    .factory('Auth', AuthFactory);
})(angular.module('angularfireSlackApp'));

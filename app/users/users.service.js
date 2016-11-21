/**
 * Created by garusis on 28/10/16.
 */
;!(function (module) {

  UsersFactory.$inject = ['$firebaseArray', '$firebaseObject'];
  function UsersFactory($firebaseArray, $firebaseObject) {
    var usersRef = firebase.database().ref().child('users');

    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: function (uid) {
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function (uid) {
        return users.$getRecord(uid).displayName;
      },
      all: users,
      getGravatar: function (uid) {
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      }
    };

    return Users;
  }

  module
    .factory('Users', UsersFactory);
})(angular.module('angularfireSlackApp'));

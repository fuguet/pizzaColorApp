angular.module("logout", [])
 // Logout controller
 .controller("LogoutCtrl", function ($scope, $state, auth) {
    // get all posts from services
    auth.logout();
    $state.go("login", {}, { location: "replace" });
  });

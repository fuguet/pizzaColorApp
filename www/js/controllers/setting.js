angular.module("setting", [])
  // Setting Controller
  .controller("SettingCtrl", function (
    $scope,
    $ionicPopup,
    $ionicModal,
    $state,
    auth,
    usuario
  ) {
    //$scope.usuario = {};
    $scope.addresses = [];
    $scope.passwordValidator = "";
    $scope.usuario = {};
 
    isLogged = function () {
      if (auth.hasToken()) {
        $scope.usuario = auth.datosUsuario();
        
      } else {
        $state.go("login", {}, { location: "replace" });
      }
    };
    //inicilizacion
    isLogged();
    
    $scope.guardar = function () {
      var data = {};
      var id = $scope.usuario.id;
      data.per_celular = $scope.usuario.celular;
      if (typeof $scope.usuario.password === "undefined") {
      } else {
        if ($scope.usuario.password == $scope.usuario.passwordValidator) {
          data.per_password = $scope.usuario.password;
          usuario.save(id, data).success(function (res) {
            if (res.response) {
              var alertPopup = $ionicPopup.alert({
                title: "Informacion",
                template: "Los cambio se Guardaron Correctamente",
              });
            }
          });
        } else {
          sharedUtils.showAlert(
            "Atencion",
            "Los Password no coinciden ingrese nuevamente"
          );
        }
      }
    };
  });
  
angular
    .module("lastOrders", [])
    .controller("LastoCtrl", function($scope, $state, $interval, usuario, auth) {
        $scope.usuario = {};
        $scope.pedidos = {};
        $scope.refresh = function() {
            $state.reload(true);
        };
        $scope.estadoInicial = {};

        $scope.formatDate = function(fechao) {

            var fecha = fechao.split(" ");
            var hora = fecha[1];
            var fechaFinal = fecha[0].split("-");
            var fechaAmigable = fechaFinal[2] + "/" + fechaFinal[1] + "/" + fechaFinal[0];

            return fechaAmigable + " " + hora;

        };
        // formatDate();
        var notification = function() {

            // usuario.getPedidos($scope.usuario.id).success(function (response) {
            //   $scope.pedidos = response;
            // });
            // if ($scope.pedidos) {
            //   if ($scope.pedidos[0].pe_idEstado != $scope.estadoInicial) {
            //     if (
            //       $scope.pedidos[0].pe_idEstado == 2 ||
            //       $scope.pedidos[0].pe_idEstado == 3
            //     ) {
            //       cordova.plugins.notification.local.schedule({
            //         title: "Su pedido se esta " + $scope.pedidos[0].descripcion,
            //         text: "Muchas Gracias por esperar",
            //         icon: "file://img/marker.jpg",
            //         smallIcon: "file://img/marker.jpg",
            //         foreground: true,
            //       });
            //     }
            //     $scope.estadoInicial = $scope.pedidos[0].pe_idEstado;
            //   }
            // }
        };
        isLogged = function() {
            if (auth.hasToken()) {
                $scope.usuario = auth.datosUsuario();
            } else {
                $state.go("login", {}, { location: "replace" });
            }
        };
        //inicilizacion
        isLogged();
        usuario.getPedidos($scope.usuario.id).success(function(response) {
            $scope.pedidos = response;
            $scope.estadoInicial = $scope.pedidos[0].pe_idEstado;
            $interval(notification, 10000);
        });

        // get all favorite items
    });
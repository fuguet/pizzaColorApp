angular.module("cart", [])
    .controller("CartCtrl", function(
        $scope,
        $rootScope,
        $ionicPopup,
        $ionicHistory,
        $ionicSideMenuDelegate,
        $state,
        sharedCartService,
        openHours,
        empresa
    ) {
        $scope.cart = sharedCartService.cart;
        $scope.promos = sharedCartService.cartPromo;
        $scope.total = sharedCartService.total_amount;
        $scope.vacio = !(sharedCartService.total_qty > 0);
        $scope.llevaAderezo = sharedCartService.qtyAderezo > 0;
        $scope.parametros = {};
        $scope.aderezos = {};
        $scope.item = {
            aclaracion: sharedCartService.aclaraciones,
            aderezos: sharedCartService.aderezos,
        };
        $scope.descuento = sharedCartService.calcularDescuento();

        empresa.getParametros().success(function(response) {
            $scope.parametros = response.data;
        });
        empresa.getHorarios().success(function(response) {
            $scope.days = response.data;
            var respuesta = openHours.isOpen($scope.days);
            $rootScope.open = respuesta.valor;
            $scope.message = respuesta.message;
        });
        empresa.getAderezos().success(function(response) {
            $scope.aderezos = response.data;
        });
        // plus quantity
        $scope.addAclaracion = function(item) {
            var myPopup2 = $ionicPopup.show({
                templateUrl: "templates/popup-aclaracion.html",
                title: "Aclaracion",
                scope: $scope,
                buttons: [
                    { text: "Cancelar" },
                    {
                        text: "<b>Aceptar</b>",
                        type: "button-assertive",
                        onTap: function(e) {
                            return item.aclaracion;
                        },
                    },
                ],
            });
            myPopup2.then(function(res) {
                item.aclaracion = res;
                sharedCartService.aclaraciones = item.aclaracion;
            });
        };
        $scope.selAderezos = function(item) {
            if ($scope.aderezos.length > 0) {
                var myPopup = $ionicPopup.show({
                    templateUrl: "templates/popup-aderezos.html",
                    title: "Elija sus Aderezos",
                    scope: $scope,
                    buttons: [
                        { text: "Cancelar" },
                        {
                            text: "<b>Guardar</b>",
                            type: "button-assertive",
                            onTap: function(e) {
                                var texAde = "";
                                angular.forEach($scope.aderezos, function(aderezo) {
                                    if (aderezo.selected) {
                                        texAde += aderezo.ade_nombre + " ";
                                    }
                                });

                                return texAde;
                            },
                        },
                    ],
                });
                myPopup.then(function(res) {
                    if (res) {
                        item.aderezos = res;
                        sharedCartService.aderezos = item.aderezos;
                    } else {
                        item.aderezos = "Sin Aderezos";
                        sharedCartService.aderezos = item.aderezos;
                    }
                });
            }

            // An elaborate, custom popup
        };
        // remove item from cart
        $scope.removeProd = function(index) {
            sharedCartService.cart.drop(index);
            $scope.total = sharedCartService.total_amount;
            $scope.cart = sharedCartService.cart;
        };
        $scope.removePro = function(index) {
            sharedCartService.cartPromo.drop(index);
            $scope.total = sharedCartService.total_amount;
            $scope.promos = sharedCartService.cartPromo;
        };

        $scope.checkOut = function() {
            $scope.total = sharedCartService.total_amount;
            if (!($rootScope.open && $scope.parametros.par_habilitado == 1)) {
                var alertPopup = $ionicPopup.alert({
                    title: "Atencion",
                    template: "Por el momento no podemos recibir Pedidos por este Medio",
                });
                alertPopup.then(function(res) {
                    $state.go("home", {}, {});
                });
            } else {
                if ($scope.total >= $scope.parametros.par_pedidoMinimo) {
                    if (sharedCartService.cartMitad.isEmpty()) {
                        if ($scope.parametros.par_pagoHabilitado < 1) {
                            $state.go("checkout", { 'DisablePago': true }, {});

                        } else
                            $state.go("checkout", { 'DisablePago': false }, {});

                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: "Atencion",
                            template: "Falta Pedir Otra Media Pizza " +
                                sharedCartService.cartMitad[0].variedad,
                        });
                    }
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: "Atencion",
                        template: "Debe completar el Pedido Minimo",
                    });
                }
            }
        };

        $scope.pedirComida = function() {
            $ionicHistory.nextViewOptions({
                historyRoot: true,
            });
            $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
            $state.go("home", {}, { location: "replace" });
        };
    });
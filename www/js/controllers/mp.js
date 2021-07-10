angular
    .module("mp", [])
    .controller("MpCtrl", function(
        $scope,
        mp,
        pedido,
        sharedUtils,
        externalAppsService,
        $state,
        $ionicPopup,
        $ionicPlatform,
        $ionicHistory,
        $ionicSideMenuDelegate,
        $stateParams,
        $interval
    ) {
        $scope.url = "";
        $scope.idPedido = $stateParams.idPedido;
        $scope.isIOS = ionic.Platform.isIOS();
        $scope.pedido = {};
        $scope.btnPagoOnline = false;
        $scope.btnPagoEfec = false;
        $scope.btnCancel = false;
        //show del spiner
        $scope.showing = false;
        $scope.showEstadoPago = true;
        $scope.countMP = 0;
        $scope.estadoPago = "Pendiente";
        $scope.colorEstadoPago = "energized";
        $scope.ultimoPedido = false;

        // The timeout is here to be sure that the DOM is fully loaded.
        // This is a dirty-as-hell example, please use a directive in a real application.
        var checkPago = function() {
            pedido
                .getEncabezado($scope.idPedido)
                .success(function(response) {
                    $scope.pedido = response;
                    if ($scope.countMP > 0) {
                        switch (response.pe_idEstadoPago) {
                            case "5":
                                {
                                    $scope.ultimoPedido = true;
                                    $scope.showing = false;
                                    $scope.estadoPago = "Pago Aprobado";
                                    $scope.colorEstadoPago = "balanced";
                                    break;
                                }

                            case "7":
                                $scope.ultimoPedido = false;
                                $scope.showing = false;
                                $scope.estadoPago = "Pago rechazado, intente pagar nuevamente.";
                                $scope.colorEstadoPago = "assertive";
                                break;
                            default:
                                {
                                    $scope.ultimoPedido = false;
                                    $scope.showing = true;
                                    $scope.estadoPago = "Procesando pago aguarde";
                                    $scope.colorEstadoPago = "positive";
                                }
                        }
                    }
                    return response;
                })
                .error(function(err) {
                    // ver que retornar
                });
        };

        var initialice = function() {
            sharedUtils.showLoading();
            mp.getUrl($scope.idPedido)
                .success(function(response) {
                    $scope.prefId = response;
                    $scope.url = response;
                    sharedUtils.hideLoading();
                })
                .error(function(err) {
                    sharedUtils.hideLoading();
                });

            pedido
                .getEncabezado($scope.idPedido)
                .success(function(response) {
                    $pedido = response;
                    $interval(checkPago, 10000);
                })
                .error(function(err) {});
        };

        initialice();

        var cambiarPendiente = function() {
            var pedidoEncabezado = {};
            pedidoEncabezado.pe_idEstadoPago = 8;
            pedidoEncabezado.pe_medioPago = "PagoOnline";
            pedido
                .updEncabezado($scope.idPedido, pedidoEncabezado)
                .success(function(response) {
                    $scope.ultimoPedido = false;
                    $scope.showEstadoPago = true;
                })
                .error(function(err) {
                    $scope.ultimoPedido = false;
                });
        };
        $scope.cancelarPedido = function() {
            pedidoEncabezado = {};
            pedidoEncabezado.pe_idEstado = 4;
            pedidoEncabezado.pe_motivoCancelado = "No pudo realizar el pago";
            pedido
                .updEncabezado($scope.idPedido, pedidoEncabezado)
                .success(function(response) {
                    if (response.result == 1) {
                        var alertPopupExito = $ionicPopup.alert({
                            title: "Atencion",
                            template: "El Pedido fue cancelado",
                        });

                        $scope.ultimoPedido = true;
                        $scope.btnPagoOnline = true;
                        $scope.btnPagoEfec = true;
                        $scope.btnCancel = true;
                        $scope.showing = false;
                        $scope.estadoPago = "Pedido Cancelado";
                        $scope.colorEstadoPago = "assertive";
                        //Preguntar si quiere que lo lleve a ultimos pedidos
                        $ionicHistory.nextViewOptions({
                            historyRoot: true,
                            disableBack: true,
                        });
                        $ionicSideMenuDelegate.canDragContent(true);
                        $state.go("last_orders", {}, { location: "replace" });
                    } else {
                        $scope.ultimoPedido = false;
                        var alertPopupFracaso = $ionicPopup.alert({
                            title: "Atencion",
                            template: "No se pudo cancelar el Pedido, Comuniquese con el local",
                        });
                    }
                })
                .error(function(err) {
                    $scope.ultimoPedido = false;
                });
        };

        $scope.pagarEfectivo = function() {
            var pedidoEncabezado = {};
            pedidoEncabezado.pe_idEstadoPago = 8;
            pedidoEncabezado.pe_medioPago = "Efectivo";
            pedido
                .updEncabezado($scope.idPedido, pedidoEncabezado)
                .success(function(response) {
                    if (response.result == 1) {
                        var alertPopupPExito = $ionicPopup.alert({
                            title: "Atencion",
                            template: "El Pedido cambio a pago en efectivo",
                        });

                        $scope.ultimoPedido = true;
                        $scope.btnPagoOnline = true;
                        $scope.btnPagoEfec = true;
                        $scope.btnCancel = true;
                        $scope.showing = false;
                        $scope.estadoPago = "Pago en destino";
                        $scope.colorEstadoPago = "balanced";
                        //preguntar si quiere que lo lleve directamente
                        $ionicHistory.nextViewOptions({
                            historyRoot: true,
                            disableBack: true,
                        });
                        $ionicSideMenuDelegate.canDragContent(true);
                        $state.go("last_orders", {}, { location: "replace" });
                    } else {
                        $scope.ultimoPedido = false;
                        var alertPopupPFracaso = $ionicPopup.alert({
                            title: "Atencion",
                            template: "No se pudo cambiar el pago, Comuniquese con el local e informe como va a pagar",
                        });
                    }
                })
                .error(function(err) {
                    $scope.ultimoPedido = false;
                });
        };

        $scope.openPage = function() {
            $scope.countMP++;
            $scope.showing = true;
            $scope.estadoPago = "Procesando pago aguarde";
            $scope.colorEstadoPago = "positive";
            if ($scope.countMP > 1) {
                cambiarPendiente();
            }
            //var ref = externalAppsService.openExternalUrlself($scope.url);
            //para probar en local
            var ref = externalAppsService.openExternalUrl($scope.url);
            ref.addEventListener("exit", function(event) {
                var alertPopup = $ionicPopup.alert({
                    title: "Atencion",
                    template: "En unos segundos se actulizara el estado del pago",
                });
                // $state.go("last_orders", {}, { location: "replace" });
            });
        };

        $scope.openPageIos = function() {
            $scope.countMP++;
            $scope.showing = true;
            $scope.estadoPago = "Procesando pago aguarde";
            $scope.colorEstadoPago = "positive";
            if ($scope.countMP > 1) {
                cambiarPendiente();
            }
            var ref = externalAppsService.openExternalUrl($scope.url);
        };
        $scope.irUltPed = function() {
            if ($scope.ultimoPedido) {
                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableBack: true,
                });
                $ionicSideMenuDelegate.canDragContent(true);
                $state.go("last_orders", {}, { location: "replace" });
            } else {
                var alertPopupUltP = $ionicPopup.alert({
                    title: "Atencion",
                    template: "Debe completar el proceso de pago o cambiar a pago en efectivo",
                });
            }
        };
    });

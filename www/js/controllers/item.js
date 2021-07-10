angular
    .module("item", [])
    // Item controller
    .controller("ItemCtrl", function(
        $scope,
        $state,
        $stateParams,
        $ionicPopup,
        $ionicNavBarDelegate,
        sharedUtils,
        producto,
        sharedCartService
    ) {
        var id = $stateParams.id;
        var initialice = function() {
            sharedUtils.showLoading();
            producto
                .getProducto(id)
                .success(function(response) {
                    $scope.item = response;
                    sharedUtils.hideLoading();
                })
                .error(function(err) {
                    sharedUtils.hideLoading();
                });
        };

        initialice();
        //            $scope.item = Items.get(1);

        // toggle favorite
        $scope.toggleFav = function() {
            $scope.item.faved = !$scope.item.faved;
        };

        // Show note popup when click to 'Notes to driver'
        $scope.addCart = function(item) {
            $scope.data = {
                quantity: "1",
            };

            if (
                item.variedades.length > 0 &&
                typeof item.selectedVariedad === "undefined"
            ) {
                var alertPopup = $ionicPopup.alert({
                    title: "Atencion",
                    template: "Seleccione una Variedad",
                });
            } else {
                $scope.item;
                if ($scope.item.producto.prod_unidad == 2) {
                    $scope.data.quantity = "0.5";
                    var myPopup = $ionicPopup.show({
                        templateUrl: "templates/popup-quantityMitad.html",
                        title: "Cantidad",
                        scope: $scope,
                        buttons: [
                            { text: "Cancelar" },
                            {
                                text: "<b>Guardar</b>",
                                type: "button-assertive",
                                onTap: function(e) {
                                    if (!$scope.data.quantity) {
                                        //don't allow the user to close unless he enters note
                                        e.preventDefault();
                                    } else {
                                        return $scope.data.quantity;
                                    }
                                },
                            },
                        ],
                    });
                } else {
                    var myPopup = $ionicPopup.show({
                        templateUrl: "templates/popup-quantity2.html",
                        title: "Cantidad",
                        scope: $scope,
                        buttons: [
                            { text: "Cancelar" },
                            {
                                text: "<b>Guardar</b>",
                                type: "button-assertive",
                                onTap: function(e) {
                                    if (!$scope.data.quantity) {
                                        //don't allow the user to close unless he enters note
                                        e.preventDefault();
                                    } else {
                                        return $scope.data.quantity;
                                    }
                                },
                            },
                        ],
                    });
                }

                myPopup.then(function(res) {
                    if (res) {
                        sharedUtils.showLoading();
                        $scope.data.quantity = res;
                        var productoPedido = {};
                        var detalle = {};
                        productoPedido.precioBase =
                            typeof item.selectedVariedad === "undefined" ?
                            item.producto.prod_precioBase :
                            item.selectedVariedad.var_precio;
                        productoPedido.idProducto = item.producto.prod_id;
                        productoPedido.idVariedad =
                            typeof item.selectedVariedad === "undefined" ?
                            -1 :
                            item.selectedVariedad.var_id;
                        productoPedido.nombreVariedad =
                            typeof item.selectedVariedad === "undefined" ?
                            "" :
                            item.selectedVariedad.var_nombre;
                        productoPedido.nombre = item.producto.prod_nombre;
                        productoPedido.idCategoria = item.producto.prod_idCategoria;
                        productoPedido.img = item.producto.slider;
                        productoPedido.descripcion = item.producto.prod_descripcionProducto;
                        productoPedido.aclaracion = item.aclaracion || "Sin Aclaracion";
                        productoPedido.componentestxt = "";
                        productoPedido.componentes = [];
                        productoPedido.aderezo = parseInt(item.producto.prod_isAderezo);
                        detalle.productoP = productoPedido;
                        detalle.cantidad = parseFloat(res);
                        detalle.descuentoAplicado = parseFloat(res * productoPedido.precioBase * item.producto.cat_descuento);
                        sharedCartService.cart.add(detalle);
                        if (detalle.cantidad == 0.5) {
                            item = {
                                variedad: productoPedido.nombreVariedad,
                                categoria: productoPedido.idCategoria,
                            };
                            sharedCartService.cartMitad.add(item);
                        }

                        sharedUtils.hideLoading();
                        $ionicNavBarDelegate.back();
                    }
                });
            }

            // An elaborate, custom popup
        };
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
            });
        };
    });
angular.module('starter.controllers', [])


// Authentication controller
// Put your login, register functions here
        .controller('AuthCtrl', function ($scope, $rootScope, $ionicHistory, sharedUtils, $state, $stateParams, $ionicSideMenuDelegate, auth, credenciales) {

            // hide back butotn in next view
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            if (auth.hasToken()) {
                $state.go('home', {}, {location: "replace"});

            }

            $scope.user = {
                email: $stateParams.correo,
                password: $stateParams.password
            }




            //chekear si ya esta logeado

            $scope.login = function (formName, cred) {

                if (formName.$valid)

                {  // Check if the form data is valid or not
                    var data = {
                        Correo: cred.email,
                        Password: cred.password
                    };



                    sharedUtils.showLoading();

                    credenciales.login(data).success(function (r) {

                        if (r.response)
                        {
                            auth.setToken(r.result);
                            $ionicHistory.nextViewOptions({
                                historyRoot: true
                            });
                            $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
                            sharedUtils.hideLoading();
                            $state.go('home', {}, {location: "replace"});
                        } else
                        {
                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atencion", r.message);
                        }
                    }).error(function (err) {

                        sharedUtils.hideLoading();
                        sharedUtils.showAlert("Atencion", err.message);
                    });




                } else {
                    sharedUtils.showAlert("Atencion", "Los datos no son validos");
                }



            }

            $scope.sigup = function (formName, user, passwordValidator) {
                if (formName.$valid)

                {  // Check if the form data is valid or not
                    debugger;
                    if (passwordValidator == $scope.user.per_password) {
                        sharedUtils.showLoading();

                        credenciales.sigup(user).success(function (r) {


                            if (r.response)
                            {

                                $ionicHistory.nextViewOptions({
                                    historyRoot: true
                                });
                                $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
                                sharedUtils.hideLoading();

                                $state.go('login', {"correo": user.per_email, "password": user.per_password}, {location: "replace"});
                            } else
                            {
                                sharedUtils.hideLoading();
                                sharedUtils.showAlert("Atención", r.message);
                            }
                        }).error(function (err) {

                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atención", err.message);
                        });
                    } else {
                        sharedUtils.showAlert("Atencion", "El password no coincide ingrese nuevamente");
                    }
                } else {
                    sharedUtils.showAlert("Atención", "Los datos no son validos");
                }

            }



            $scope.loginFb = function () {
                //Facebook Login
            };

            $scope.loginGmail = function () {
                //Gmail Login
            };

        })

// Home controller
        .controller('HomeCtrl', function ($scope, $ionicPopup, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $state, $rootScope, promo, categoria, empresa, openHours, sharedUtils) {
            // get all categories from service
//            $scope.categories = Menu.all();


            empresa.getHorarios().success(function (response) {

                $scope.days = response.data;
                var respuesta = openHours.isOpen($scope.days);
                $rootScope.open = respuesta.valor;
                $scope.message = respuesta.message;


            });
            incialite = function () {


//                window.plugins.sim.requestReadPermission();
//                window.plugins.sim.getSimInfo(
//                        function (result) {
//                            var alertPopup = $ionicPopup.alert({
//                                title: 'Atencion',
//                                template: 'Provedor : ' + result.carrierName + ' Telefono: ' + result.phoneNumber +
//                                        'IME: ' + result.deviceId
//
//                            });
//
//                        },
//                        function (error) {
//                            var alertPopup = $ionicPopup.alert({
//                                title: 'Atencion',
//                                template: "me dio error"
//                            });
//                        }
//                );

                sharedUtils.showLoading();
                categoria.getCategorias().success(function (response) {

                    $scope.categories = response.data;
                    promo.getPromos().success(function (response) {
                        $scope.promos = response.data;
                        sharedUtils.hideLoading();
                    });
                });


            }

//            $scope.slides = [];
            incialite();








            //actualizar slider
            $scope.updateSlider = function () {
                $ionicSlideBoxDelegate.update(); //or just return the function
            }



        })

// Categories controller
        .controller('CategoriesCtrl', function ($scope, $state, $stateParams, sharedUtils, categoria) {

            var initialice = function () {
                sharedUtils.showLoading();
                categoria.getCategorias().success(function (response) {
                    $scope.categories = response.data;
                    sharedUtils.hideLoading();

                }).error(function (err) {
                    sharedUtils.hideLoading();

                });

            }

            initialice();



        })


// Category controller
        .controller('CategoryCtrl', function ($scope, $state, $stateParams, producto, categoria, sharedUtils) {


            var id = $stateParams.id;
            $scope.products = {};
            $scope.category = {};
            var initialice = function () {
                sharedUtils.showLoading();
                producto.getProductoCat(id).success(function (response) {
                    $scope.products = response.data;
                    categoria.getCategoria(id).success(function (response) {
                        $scope.category = response;
                        sharedUtils.hideLoading();
                    }).error(function (err) {
                        sharedUtils.hideLoading();

                    });

                }).error(function (err) {
                    sharedUtils.hideLoading();

                });
                ;
            }

            initialice();






            // get all items from service by category id
//            $scope.category = Categories.get(1);
        })

// Item controller
        .controller('ItemCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicNavBarDelegate, sharedUtils, producto, sharedCartService) {
            var id = $stateParams.id;


            var initialice = function () {
                sharedUtils.showLoading();
                producto.getProducto(id).success(function (response) {
                    debugger;
                    $scope.item = response;
                    sharedUtils.hideLoading();

                }).error(function (err) {
                    sharedUtils.hideLoading();

                });

            }

            initialice();
//            $scope.item = Items.get(1);

            // toggle favorite
            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }

            // Show note popup when click to 'Notes to driver'
            $scope.addCart = function (item) {

                $scope.data = {
                    quantity: "1"
                }

                if (item.variedades.length > 0 && (typeof item.selectedVariedad === 'undefined')) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: 'Seleccione una Variedad'
                    });
                } else {
                    $scope.item;
                    if ($scope.item.producto.prod_unidad == 2) {
                        $scope.data.quantity = "0.5"
                        var myPopup = $ionicPopup.show({
                            templateUrl: 'templates/popup-quantityMitad.html',
                            title: 'Cantidad',
                            scope: $scope,
                            buttons: [
                                {text: 'Cancelar'},
                                {
                                    text: '<b>Guardar</b>',
                                    type: 'button-assertive',
                                    onTap: function (e) {
                                        if (!$scope.data.quantity) {
                                            //don't allow the user to close unless he enters note
                                            e.preventDefault();

                                        } else {

                                            return $scope.data.quantity;
                                        }
                                    }
                                },
                            ]
                        });
                    } else {
                        var myPopup = $ionicPopup.show({
                            templateUrl: 'templates/popup-quantity2.html',
                            title: 'Cantidad',
                            scope: $scope,
                            buttons: [
                                {text: 'Cancelar'},
                                {
                                    text: '<b>Guardar</b>',
                                    type: 'button-assertive',
                                    onTap: function (e) {
                                        if (!$scope.data.quantity) {
                                            //don't allow the user to close unless he enters note
                                            e.preventDefault();
                                            debugger;
                                        } else {
                                            debugger;
                                            return $scope.data.quantity;
                                        }
                                    }
                                },
                            ]
                        });
                    }



                    myPopup.then(function (res) {

                        if (res) {
                            sharedUtils.showLoading();
                            $scope.data.quantity = res;
                            var productoPedido = {};
                            var detalle = {};

                            productoPedido.precioBase = ((typeof item.selectedVariedad === 'undefined') ? item.producto.prod_precioBase : item.selectedVariedad.var_precio);
                            productoPedido.idProducto = item.producto.prod_id;
                            productoPedido.idVariedad = ((typeof item.selectedVariedad === 'undefined') ? -1 : item.selectedVariedad.var_id);
                            productoPedido.nombreVariedad = ((typeof item.selectedVariedad === 'undefined') ? '' : item.selectedVariedad.var_nombre);
                            productoPedido.nombre = item.producto.prod_nombre;
                            productoPedido.idCategoria = item.producto.prod_idCategoria;
                            productoPedido.img = item.producto.slider;
                            productoPedido.descripcion = item.producto.prod_descripcionProducto;
                            productoPedido.aclaracion = item.aclaracion || "Sin Aclaracion";
                            productoPedido.componentestxt = '';
                            productoPedido.componentes = [];
                            productoPedido.aderezo = parseInt(item.producto.prod_isAderezo);

                            detalle.productoP = productoPedido;
                            detalle.cantidad = parseFloat(res);
                            sharedCartService.cart.add(detalle);


                            if (detalle.cantidad == 0.5) {
                                debugger;

                                item = {
                                    variedad: productoPedido.nombreVariedad,
                                    categoria: productoPedido.idCategoria
                                }
                                sharedCartService.cartMitad.add(item);


                            }


                            sharedUtils.hideLoading();
                            $ionicNavBarDelegate.back();

                        }


                    });

                }




                // An elaborate, custom popup

            };
            $scope.addAclaracion = function (item) {
                var myPopup2 = $ionicPopup.show({
                    templateUrl: 'templates/popup-aclaracion.html',
                    title: 'Aclaracion',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Aceptar</b>',
                            type: 'button-assertive',
                            onTap: function (e) {
                                return item.aclaracion;

                            }
                        },
                    ]
                });
                myPopup2.then(function (res) {
                    item.aclaracion = res;
                });

            };
        })

// LastOrder controller
        .controller('LastoCtrl', function ($scope, $state, usuario, auth) {

            $scope.usuario = {};
            $scope.pedidos = {};
            isLogged = function () {

                if (auth.hasToken())

                {
                    $scope.usuario = auth.datosUsuario();


                } else {

                    $state.go('login', {}, {location: "replace"});

                }
            };
            //inicilizacion
            isLogged();

            usuario.getPedidos($scope.usuario.id).success(function (response) {



                $scope.pedidos = response;

            });



            // get all favorite items

        })
// Favorite controller
        .controller('FavoriteCtrl', function ($scope, $state) {

//            // get all favorite items
//            $scope.items = Items.all()
//
//            // remove item from favorite
//            $scope.remove = function (index) {
//
//
//                $scope.items.splice(index, 1);
//
//            }
        })

// Cart controller
        .controller('CartCtrl', function ($scope, $rootScope, $ionicPopup, $ionicHistory, $ionicSideMenuDelegate, $state, sharedCartService, openHours, empresa) {

            $scope.cart = sharedCartService.cart;
            $scope.promos = sharedCartService.cartPromo;
            $scope.total = sharedCartService.total_amount;
            $scope.vacio = !(sharedCartService.total_qty > 0);
            $scope.llevaAderezo = (sharedCartService.qtyAderezo > 0)
            $scope.parametros = {};
            $scope.aderezos = {};

            debugger;
            $scope.item = {
                aclaracion: sharedCartService.aclaraciones,
            };
            empresa.getParametros().success(function (response) {

                $scope.parametros = response;
            });
            empresa.getHorarios().success(function (response) {

                $scope.days = response.data;
                var respuesta = openHours.isOpen($scope.days);
                $rootScope.open = respuesta.valor;
                $scope.message = respuesta.message;


            });

            empresa.getAderezos().success(function (response) {

                $scope.aderezos = response.data;
            });


            // plus quantity
            $scope.addAclaracion = function (item) {
                var myPopup2 = $ionicPopup.show({
                    templateUrl: 'templates/popup-aclaracion.html',
                    title: 'Aclaracion',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Aceptar</b>',
                            type: 'button-assertive',
                            onTap: function (e) {
                                return item.aclaracion;

                            }
                        },
                    ]
                });
                myPopup2.then(function (res) {
                    item.aclaracion = res;
                    sharedCartService.aclaraciones = item.aclaracion;

                });

            };

            $scope.selAderezos = function (item) {
                if ($scope.aderezos.length > 0) {
                    var myPopup = $ionicPopup.show({
                        templateUrl: 'templates/popup-aderezos.html',
                        title: 'Elija sus Aderezos',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancelar'},
                            {
                                text: '<b>Guardar</b>',
                                type: 'button-assertive',
                                onTap: function (e) {

                                    var texAde = '';
                                    angular.forEach($scope.aderezos, function (aderezo) {
                                        if (aderezo.selected) {

                                            texAde += aderezo.ade_nombre + ' ';
                                        }
                                    })

                                    return texAde;
                                }
                            },
                        ]
                    });
                    myPopup.then(function (res) {
                        debugger;
                        if (res) {

                            item.aderezos = res;
                            sharedCartService.aderezos = item.aderezos;

                        } else {
                            item.aderezos = 'Sin Aderezos'
                            sharedCartService.aderezos = item.aderezos;
                        }
                    });

                }


                $scope.SelectedVariedadChange = function (variedad) {

                    $scope.selectedVariedad = variedad;

                };





                // An elaborate, custom popup

            };

            // remove item from cart
            $scope.removeProd = function (index) {

                sharedCartService.cart.drop(index);
                $scope.total = sharedCartService.total_amount;
                $scope.cart = sharedCartService.cart;


            }
            $scope.removePro = function (index) {

                sharedCartService.cartPromo.drop(index);
                $scope.total = sharedCartService.total_amount;
                $scope.promos = sharedCartService.cartPromo;



            }

            $scope.checkOut = function () {
                debugger;
                $scope.total = sharedCartService.total_amount;
                debugger;
                if (!($rootScope.open && ($scope.parametros.par_habilitado == 1))) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: "Por el momento no podemos recibir Pedidos por este Medio"
                    });
                    alertPopup.then(function (res) {
                        $state.go('home', {}, {});
                    })

                } else {
                    if ($scope.total >= $scope.parametros.par_pedidoMinimo) {
                        if (sharedCartService.cartMitad.isEmpty()) {
                            $state.go('checkout', {}, {});
                        } else
                        {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: "Falta Pedir Otra Media Pizza " + sharedCartService.cartMitad[0].variedad
                            });
                        }

                    } else {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Atencion',
                            template: "Debe completar el Pedido Minimo"
                        });

                    }
                }

            }

            $scope.pedirComida = function () {

                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable      
                $state.go('home', {}, {location: "replace"})

            }
        })

// Offer controller
        .controller('OfferCtrl', function ($scope, $state, $ionicSideMenuDelegate, sharedUtils, $ionicSlideBoxDelegate, promo) {
            // get all items form Items model
//            $scope.items = Items.all();
            var initialice = function () {
                sharedUtils.showLoading();
                promo.getPromos().success(function (response) {
                    $scope.promos = response.data;
                    sharedUtils.hideLoading();


                }).error(function (err) {
                    sharedUtils.hideLoading();

                });
                ;
            }

            initialice();


            promo.getPromos().success(function (response) {
                $scope.promos = response.data;


            });

            //actualizar slider
            $scope.updateSlider = function () {
                $ionicSlideBoxDelegate.update(); //or just return the function
            }

            // toggle favorite
            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }

            // disabled swipe menu
            $ionicSideMenuDelegate.canDragContent(false);
        })
        .controller('ItemOfferCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicNavBarDelegate, producto, promo, sharedCartService, sharedUtils) {
            var id = $stateParams.id;
            var cantidadVariedadesSel = 0;
            var checkVar = function (item) {
                return item.cantVar > 0;
            }
            // get item from service by item id

            var initialice = function () {
                sharedUtils.showLoading();
                promo.getPromo(id).success(function (response) {

                    $scope.promo = response;
                    promo.getProductoPromo(id).success(function (response) {
                        $scope.items = response;
                        sharedUtils.hideLoading();

                    }).error(function (err) {
                        sharedUtils.hideLoading();

                    })

                }).error(function (err) {
                    sharedUtils.hideLoading();

                });
                ;
            }

            initialice();




            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }
            $scope.selOptions = function (optionO) {
                $scope.options = [];
                var idProd = optionO.prod_id;
                producto.getProducto(idProd).success(function (response) {
                    $scope.options = response.variedades;
                    if ($scope.options.length > 0) {
                        var myPopup = $ionicPopup.show({
                            templateUrl: 'templates/popup-prodOption.html',
                            title: 'Seleccione',
                            scope: $scope,
                            buttons: [
                                {text: 'Cancelar'},
                                {
                                    text: '<b>Guardar</b>',
                                    type: 'button-assertive',
                                    onTap: function (e) {

                                        if (!$scope.selectedVariedad) {
                                            //don't allow the user to close unless he enters note
                                            e.preventDefault();
                                        } else {
                                            return $scope.selectedVariedad;


//                                    return $scope.data.quantity;
                                        }
                                    }
                                },
                            ]
                        });
                        myPopup.then(function (res) {
                            debugger;
                            if (res) {
                                if ((typeof optionO.selectedVariedad === 'undefined')) {
                                    optionO.selectedVariedad = res;
                                    cantidadVariedadesSel += 1;

                                } else {
                                    optionO.selectedVariedad = res;

                                }
                            }
                        });

                    }
                });

                $scope.SelectedVariedadChange = function (variedad) {

                    $scope.selectedVariedad = variedad;

                };





                // An elaborate, custom popup

            };
            // Show note popup when click to 'Notes to driver'


            $scope.addCart = function (promo, items) {
                if (cantidadVariedadesSel >= items.filter(checkVar).length) {
                    $scope.data = {
                        quantity: "1"
                    }
                    var promoPedido = {};
                    promoPedido.productosP = []
                    promoPedido.nombre = promo.pro_nombre;
                    promoPedido.precioUnitario = promo.pro_precio;
                    promoPedido.cantidad = 1;
                    promoPedido.idPromo = promo.pro_id;
                    promoPedido.detallePp = promo.pro_descripcion;
                    promoPedido.aclaracion = '';
                    promoPedido.aderezos = 0;


                    angular.forEach(items, function (value, key) {
                        var prodPedido = {};


                        prodPedido.precioBase = value.prod_precioBase;
                        prodPedido.idProducto = value.prod_id;
                        prodPedido.idVariedad = ((typeof value.selectedVariedad === 'undefined') ? -1 : value.selectedVariedad.var_id);
                        prodPedido.precioCalc = 0;
                        prodPedido.nombreVariedad = ((typeof value.selectedVariedad === 'undefined') ? '' : value.selectedVariedad.var_nombre);
                        prodPedido.aclaracion = '';
                        promoPedido.productosP.push(prodPedido);
                        promoPedido.aderezos += parseInt(value.prod_isAderezo);


                    });
                    //promoPedido.aclaracion= 
                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        templateUrl: 'templates/popup-quantity2.html',
                        title: 'Cantidad',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancelar'},
                            {
                                text: '<b>Guardar</b>',
                                type: 'button-assertive',
                                onTap: function (e) {
                                    if (!$scope.data.quantity) {
                                        //don't allow the user to close unless he enters note
                                        e.preventDefault();
                                    } else {
                                        return $scope.data.quantity;
                                    }
                                }
                            },
                        ]
                    });
                    myPopup.then(function (res) {
                        if (res) {
                            sharedUtils.showLoading();
                            $scope.data.quantity = parseFloat(res);
                            promoPedido.cantidad = parseFloat(res);
                            sharedCartService.cartPromo.add(promoPedido);
                            sharedUtils.hideLoading();
                            $ionicNavBarDelegate.back();

                        }


                    });
                } else {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: 'Falta Seleccionar algo'
                    });

                }

            }
            ;
        }
        )

// Checkout controller
        .controller('CheckoutCtrl', function ($scope, $state, $ionicPopup, $window, $ionicSideMenuDelegate, $ionicHistory, auth, usuario, sharedCartService, pedido, empresa, sharedUtils) {
            $scope.addresses = [];
            $scope.usuario = {};
            $scope.parametros = {};

            isLogged = function () {

                if (auth.hasToken())

                {
                    $scope.usuario = auth.datosUsuario();


                } else {

                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
                    $state.go('login', {}, {location: "replace"});



                }
            };


            //inicilizacion
            isLogged();
            empresa.getParametros().success(function (response) {

                $scope.parametros = response;
            });
            usuario.getDirecciones($scope.usuario.id).success(function (response) {
                $scope.addresses = response;
            });
            $scope.payments = [
                {id: 'Debito', name: 'Tarjeta Debito'},
                {id: 'Efectivo', name: 'Efectivo '}
            ];
            $scope.total = sharedCartService.total_amount;


            $scope.data = {
                payment: 'Efectivo'
            };

            $scope.addManipulation = function (edit_val) {  // Takes care of address add and edit ie Address Manipulator


                if (edit_val != null) {

                    $scope.data = edit_val; // For editing address 
                    // poner al telefono como un numero.
                    var title = "Editar Direccion";
                    var sub_title = "Editar su Domicilio";
                } else {
                    $scope.data = {};    // For adding new address
                    var title = "Agregar Domicilio";
                    var sub_title = "Agregar un nuevo Domicilio";
                }
                // An elaborate, custom popup
                var addressPopup = $ionicPopup.show({
                    template: '<input type="text"   placeholder="Nombre Lugar"  ng-model="data.dir_nombre"> <br/> ' +
                            '<input type="text"   placeholder="Direccion" ng-model="data.dir_direccion"> <br/> ' +
                            '<textarea placeholder="Aclaraciones" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ' +
                            '<input type="number" placeholder="Telefono Fijo" ng-model="data.dir_telefonoFijo">',
                    title: title,
                    subTitle: sub_title,
                    scope: $scope,
                    buttons: [
                        {text: 'Cerrar'},
                        {
                            text: '<b>Guardar</b>',
                            type: 'button-positive',
                            onTap: function (e) {

                                if (!$scope.data.dir_nombre || !$scope.data.dir_direccion || !$scope.data.dir_telefonoFijo || !$scope.data.dir_aclaracion) {
                                    e.preventDefault(); //don't allow the user to close unless he enters full details
                                } else {
                                    return $scope.data;
                                }
                            }
                        }
                    ]
                });

                addressPopup.then(function (res) {
                    createAdress(res);



                });

            };

            createAdress = function (res) {

                var direccion = {};

                if (res != null) {
                    direccion.dir_nombre = res.dir_nombre;
                    direccion.dir_telefonoFijo = res.dir_telefonoFijo;
                    direccion.dir_direccion = res.dir_direccion;
                    direccion.dir_aclaracion = res.dir_aclaracion;

                    if (res.dir_idPersona) {
                        //par actualizar

                    } else {
                        direccion.dir_idPersona = $scope.usuario.id;
                        usuario.addDireccion(direccion).success(function (res) {

                            if (res.response) {
                                usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                    $scope.addresses = response;
                                });



                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });


                            }
                        }).error(function (err) {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });

                        });


                    }
                }

            };


            $scope.pay = function () {
                var payment = $scope.data.payment;
                var address = $scope.data.address;


                if (sharedCartService.total_qty < 1 && sharedCartService.total_qty < 1) {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
                    $state.go('home', {}, {location: "replace"});

                } else {
                    if (!(typeof payment === 'undefined') && !(typeof address === 'undefined'))
                    {
                        var pedidoEncabezado = {};
                        pedidoEncabezado.pe_idCliente = address.dir_idPersona
                        pedidoEncabezado.pe_aclaraciones = '';
                        pedidoEncabezado.pe_total = sharedCartService.total_amount;
                        pedidoEncabezado.pe_idPersona = address.dir_idPersona;
                        pedidoEncabezado.pe_cli_tel = $scope.usuario.celular;
                        pedidoEncabezado.pe_idDireccion = address.dir_id;
                        pedidoEncabezado.pe_medioPago = payment;
                        pedidoEncabezado.pe_idEstado = 1;
                        pedidoEncabezado.pe_resumen = sharedCartService.generarResumen();
                        pedidoEncabezado.pe_aderezos = sharedCartService.aderezos;
                        pedidoEncabezado.pe_cantAderezos = sharedCartService.qtyAderezo;

                        debugger;


                        sharedUtils.showLoading();

                        pedido.setEncabezado(pedidoEncabezado).success(function (res) {
                            if (res.response) {
                                debugger;
                                var idencabezado = res.result;

                                var detalle = {};
                                detalle.idPedidoEncabezado = res.result;
                                detalle.cart = sharedCartService.cart;
                                var promoPedido = {};
                                promoPedido.idPedidoEncabezado = res.result;
                                promoPedido.cart = sharedCartService.cartPromo;
                                pedido.addDetallePedido(detalle).success(function (res) {
                                    if (res.response) {
                                        sharedCartService.cleanCart();
                                        sharedCartService.recalcularTotales();
                                        pedido.addPromoPedido(promoPedido).success(function (res) {
                                            if (res.response) {
                                                sharedCartService.cleanCartPromo();
                                                sharedCartService.recalcularTotales();
                                                sharedUtils.hideLoading();
                                                var alertPopup = $ionicPopup.alert({
                                                    title: 'Atencion',
                                                    template: 'El pedido se genero correctamente'
                                                });
                                                $ionicHistory.nextViewOptions({
                                                    historyRoot: true
                                                });
                                                $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
                                                $state.go('last_orders', {}, {location: "replace"});

                                            } else {
                                                sharedUtils.hideLoading();
                                            }
//      

                                        })
                                                .error(function (err) {
                                                    sharedUtils.hideLoading();

                                                    var alertPopup = $ionicPopup.alert({
                                                        title: 'Atencion',
                                                        template: 'No se pudo pedir algunas promos intente mas tarde nuevamente'
                                                    });
                                                })
                                    } else {
                                        sharedUtils.hideLoading();
                                    }
                                }).error(function (err) {
                                    sharedUtils.hideLoading();

                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Atencion',
                                        template: 'No se pudo pedir algunos productos intente mas tarde nuevamente'
                                    });

                                })
                            } else
                            {
                                debugger;
                                sharedUtils.hideLoading();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });
                            }
                        }).error(function (err) {
                            debugger;
                            sharedUtils.hideLoading();

                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });


                        });
                    } else
                    {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Atencion',
                            template: 'Debe elegir una Direccion y un Medio de Pago'
                        });
                    }
                }



            }

        }
        )

// Address controller
        .controller('AddressCtrl', function ($scope, $state, $ionicPopup, externalAppsService, sharedCartService) {



            function initialize() {
                // set up begining position
                var myLatlng = new google.maps.LatLng(-25.5984759, -54.5749279);
                var image = 'img/marker.jpg';

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    title: "Pizza Color Delivery!",
                    icon: image
                });

                // set option for map
                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP

                };
                // init map
                var map = new google.maps.Map(document.getElementById("map"),
                        mapOptions);
                marker.setMap(map);
                // assign to stop
                $scope.map = map;
            }
            $scope.openMaps = function () {
                externalAppsService.openExternalUrl("geo:#{-25.5984759},#{-54.5749279}?q=#Gustavo Eppens 258, Puerto Iguazú, Misiónes")

            }
            // load map when the ui is loaded
            $scope.init = function () {
                initialize();
            }
        })

// User controller
        .controller('UserCtrl', function ($scope, $state, auth) {


        })

// Setting Controller
        .controller('SettingCtrl', function ($scope, $ionicPopup, $state, auth, usuario, sharedUtils, $window) {
            //$scope.usuario = {};
            $scope.addresses = [];
            $scope.passwordValidator = '';


            $scope.usuario = {};
            isLogged = function () {

                if (auth.hasToken())
                {
                    sharedUtils.showLoading();
                    $scope.usuario = auth.datosUsuario();
                    usuario.getDirecciones($scope.usuario.id).success(function (response) {
                        $scope.addresses = response;
                        sharedUtils.hideLoading();

                    }).error(function (err) {
                        sharedUtils.hideLoading();

                    });
                } else {
                    $state.go('login', {}, {location: "replace"});
                }
            };
            //inicilizacion
            isLogged();
            $scope.addManipulation = function (edit_val) {  // Takes care of address add and edit ie Address Manipulator


                if (edit_val != null) {

                    $scope.data = edit_val; // For editing address 
                    // poner al telefono como un numero.
                    var title = "Editar Direccion";
                    var sub_title = "Editar su Domicilio";
                } else {
                    $scope.data = {};    // For adding new address
                    var title = "Agregar Domicilio";
                    var sub_title = "Agregar un nuevo Domicilio";
                }
                // An elaborate, custom popup
                var addressPopup = $ionicPopup.show({
                    template: '<input type="text"   placeholder="Nombre Lugar"  ng-model="data.dir_nombre"> <br/> ' +
                            '<input type="text"   placeholder="Direccion" ng-model="data.dir_direccion"> <br/> ' +
                            '<textarea placeholder="Aclaraciones" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ' +
                            '<input type="text" placeholder="Telefono Fijo" ng-model="data.dir_telefonoFijo">',
                    title: title,
                    subTitle: sub_title,
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Guardar</b>',
                            type: 'button-positive',
                            onTap: function (e) {


                                if (!$scope.data.dir_nombre || !$scope.data.dir_direccion || !$scope.data.dir_telefonoFijo) {
                                    e.preventDefault(); //don't allow the user to close unless he enters full details
                                } else {
                                    return $scope.data;
                                }
                            }
                        }
                    ]
                });

                addressPopup.then(function (res) {
                    createAdress(res);



                });

            };
            createAdress = function (res) {

                var direccion = {};


                if (res != null) {
                    direccion.dir_nombre = res.dir_nombre;
                    direccion.dir_telefonoFijo = res.dir_telefonoFijo;
                    direccion.dir_direccion = res.dir_direccion;
                    direccion.dir_aclaracion = res.dir_aclaracion;

                    if (res.dir_idPersona) {


                        usuario.updateDireccion(res).success(function (res) {

                            if (res.response) {

                                usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                    $scope.addresses = response;

                                });



                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });


                            }
                        }).error(function (err) {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });

                        });

                    } else {

                        direccion.dir_idPersona = $scope.usuario.id;
                        usuario.addDireccion(direccion)
                                .success(function (res) {

                                    if (res.response) {

                                        usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                            $scope.addresses = response;

                                        });




                                    } else {
                                        var alertPopup = $ionicPopup.alert({
                                            title: 'Atencion',
                                            template: res.message
                                        });


                                    }
                                })
                                .error(function (err) {

                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Atencion',
                                        template: err.message
                                    });

                                });


                    }
                }

            };
            $scope.deleteAddress = function (del_id) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Eliminar Domicilio',
                    template: 'Esta seguro de eliminar este domicilio',
                    buttons: [
                        {text: 'No', type: 'button-stable'},
                        {text: 'Si', type: 'button-assertive', onTap: function () {
                                return del_id;
                            }}
                    ]
                });

                confirmPopup.then(function (res) {
                    if (res) {

                        usuario.deleteDireccion(res).success(function (r) {
                            if (r.response) {

                                usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                    $scope.addresses = response;

                                });

                            }
                        });


                        //eliminar direccion de la base

                    }
                });
            };

            $scope.guardar = function () {
                debugger;
                var data = {}
                var id = $scope.usuario.id;
                data.per_celular = $scope.usuario.celular;

                if ((typeof $scope.usuario.password === 'undefined')) {

                } else {
                    debugger;
                    if($scope.usuario.password==$scope.usuario.passwordValidator){

                    data.per_password =$scope.usuario.password ;
                    usuario.save(id, data).success(function (res) {
                        debugger;
                        if (res.response) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Informacion',
                                template: 'Los cambio se Guardaron Correctamente'
                            });

                        }
                    });
                }
                else{
                    sharedUtils.showAlert("Atencion", "Los Password no coinciden ingrese nuevamente");
                    
                }

                }



            }

        })



// News controller
        .controller('NewsCtrl', function ($scope, $state, Posts) {
            // get all posts from services
            $scope.posts = Posts.all();
        })

// About controller
        .controller('AboutCtrl', function ($scope, $state, empresa, openHours, externalAppsService) {
            // working hours
            $scope.dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];





//            $scope.days = [
//                {
//                    'name': 'Monday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Tuesday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Wednesday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Thursday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Friday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Saturday',
//                    'hours': '05:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Sunday',
//                    'hours': '05:00pm - 10:00pm'
//                }
//            ];



            empresa.getHorarios().success(function (response) {
                $scope.days = response.data;

            });
            empresa.getTelefonos().success(function (response) {
                $scope.tel = response;

            });
            empresa.getDatosContacto().success(function (response) {
                $scope.contac = response;


            });
            $scope.openFacebookPage = function () {
                externalAppsService.openExternalUrl($scope.contac.dcon_facebook);
            }

            $scope.openPage = function () {
                externalAppsService.openExternalUrl($scope.contac.dcon_website);
            }

            $scope.openTwitterPage = function () {
                externalAppsService.openExternalUrl($scope.contac.dcon_twitter);
            }





        })
// Logout controller
        .controller('LogoutCtrl', function ($scope, $state, auth) {
            // get all posts from services
            auth.logout();

            $state.go('login', {}, {location: "replace"})

        })
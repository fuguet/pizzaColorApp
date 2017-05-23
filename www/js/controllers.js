angular.module('starter.controllers', [])


// Authentication controller
// Put your login, register functions here
        .controller('AuthCtrl', function ($scope, $rootScope, $ionicHistory, sharedUtils, $state, $ionicSideMenuDelegate, auth, restApi) {
            // hide back butotn in next view
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            if (auth.hasToken()) {
                $state.go('home', {}, {location: "replace"});

            }


            //chekear si ya esta logeado

            $scope.login = function (formName, cred) {

                auth.getToken();

                if (formName.$valid)

                {  // Check if the form data is valid or not

                    sharedUtils.showLoading();

                    restApi.call(
                            {
                                method: 'post',
                                url: 'auth/autenticar',
                                data: {
                                    Correo: cred.email,
                                    Password: cred.password
                                },
                                response: function (r)
                                {

                                    if (r.response)
                                    {

                                        auth.setToken(r.result);
                                        $ionicHistory.nextViewOptions({
                                            historyRoot: true
                                        });
                                        $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
                                        $rootScope.extras = true;
                                        sharedUtils.hideLoading();
                                        $state.go('home', {}, {location: "replace"});
                                    } else

                                    {
                                        sharedUtils.hideLoading();
                                        sharedUtils.showAlert("Please note", "Authentication Error");
                                        alert(r.message);

                                    }
                                },
                                error: function (r) {

                                    sharedUtils.hideLoading();
                                    sharedUtils.showAlert("Please note", "Authentication Error");
                                    alert(r.message);

                                },
                                validationError: function (r) {
                                    sharedUtils.showAlert(r);
                                    sharedUtils.hideLoading();

                                }
                            });



                } else {
                    sharedUtils.showAlert("Please note", "Entered data is not valid");
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
        .controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate, $state, $rootScope, Menu, promo, categoria, empresa, openHours) {
            // get all categories from service
//            $scope.categories = Menu.all();
            empresa.getHorarios().success(function (response) {

                $scope.days = response.data;
                var respuesta = openHours.isOpen($scope.days);
                $rootScope.open = respuesta.valor;
                $scope.message = respuesta.message;


            });

            $scope.slides = [];

            categoria.getCategorias().success(function (response) {

                $scope.categories = response.data;
            });



            promo.getPromos().success(function (response) {
                $scope.promos = response.data;
                angular.forEach(response.data, function (value, key) {
                    $scope.slides.push(value.slider);
                });
            });

            //actualizar slider
            $scope.updateSlider = function () {
                $ionicSlideBoxDelegate.update(); //or just return the function
            }


        })

// Categories controller
        .controller('CategoriesCtrl', function ($scope, $state, Categories, $stateParams, categoria) {
            categoria.getCategorias().success(function (response) {
                $scope.categories = response.data;

            });


        })


// Category controller
        .controller('CategoryCtrl', function ($scope, $state, Categories, $stateParams, producto, categoria) {


            var id = $stateParams.id;
            $scope.products = {};
            $scope.category = {};

            producto.getProductoCat(id).success(function (response) {
                $scope.products = response.data;

            });
            categoria.getCategoria(id).success(function (response) {

                $scope.category = response;
            });


            // get all items from service by category id
//            $scope.category = Categories.get(1);
        })

// Item controller
        .controller('ItemCtrl', function ($scope, $state, Items, $stateParams, $ionicPopup, $ionicNavBarDelegate, producto, sharedCartService) {
            var id = $stateParams.id;


            // get item from service by item id

            producto.getProducto(id).success(function (response) {


                $scope.item = response;

            });


//            $scope.item = Items.get(1);

            // toggle favorite
            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }

            // Show note popup when click to 'Notes to driver'
            $scope.addCart = function (item) {

                $scope.data = {
                    quantity: 1
                }

                if (item.variedades.length > 0 && (typeof item.selectedVariedad === 'undefined')) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: 'Seleccione una Variedad'
                    });
                } else {
                    var myPopup = $ionicPopup.show({
                        templateUrl: 'templates/popup-quantityMitad.html',
                        title: 'Quantity',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>Save</b>',
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

                        $scope.data.quantity = res;
                        var productoPedido = {};
                        var detalle = {};


//                        productoPedido.precioBase = ((typeof item.selectedVariedad === 'undefined') ? item.producto.prod_precioBase : item.selectedVariedad.var_precio);
                        productoPedido.precioBase = ((typeof item.selectedVariedad === 'undefined') ? item.producto.prod_precioBase : item.selectedVariedad.var_precio);

                        productoPedido.idProducto = item.producto.prod_id;
                        productoPedido.idVariedad = ((typeof item.selectedVariedad === 'undefined') ? -1 : item.selectedVariedad.var_id);
                        productoPedido.nombreVariedad = ((typeof item.selectedVariedad === 'undefined') ? '' : item.selectedVariedad.var_nombre);
                        productoPedido.nombre = item.producto.prod_nombre;
                        productoPedido.img = item.producto.slider;
                        productoPedido.descripcion = item.producto.prod_descripcionProducto;
                        productoPedido.aclaracion = item.aclaracion || "Sin Aclaracion";
                        productoPedido.componentestxt = '';
                        productoPedido.componentes = [];

                        detalle.productoP = productoPedido;
                        detalle.cantidad = parseFloat(res);
                        sharedCartService.cart.add(detalle);
                        $ionicNavBarDelegate.back();

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
        .controller('LastoCtrl', function ($scope, $state,usuario,auth ) {

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
                 debugger;


                $scope.pedidos= response;

            });
            
            

            // get all favorite items

        })
// Favorite controller
        .controller('FavoriteCtrl', function ($scope, $state, Items) {

            // get all favorite items
            $scope.items = Items.all()

            // remove item from favorite
            $scope.remove = function (index) {


                $scope.items.splice(index, 1);

            }
        })

// Cart controller
        .controller('CartCtrl', function ($scope, $ionicPopup, Cart, sharedCartService) {

            $scope.cart = sharedCartService.cart;
            $scope.promos = sharedCartService.cartPromo;
            $scope.total = sharedCartService.total_amount;
            $scope.item = {
                aclaracion: sharedCartService.aclaraciones,
            };

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
            // remove item from cart
            $scope.removeProd = function (index) {
                debugger;
                sharedCartService.cart.drop(index);
                $scope.total = sharedCartService.total_amount;
                $scope.cart = sharedCartService.cart;


            }
            $scope.removePro = function (index) {
                debugger;
                sharedCartService.cartPromo.drop(index);
                $scope.total = sharedCartService.total_amount;
                $scope.promos = sharedCartService.cartPromo;
                debugger;


            }
        })

// Offer controller
        .controller('OfferCtrl', function ($scope, $state, Items, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, promo) {
            // get all items form Items model
//            $scope.items = Items.all();

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
        .controller('ItemOfferCtrl', function ($scope, $state, Items, $stateParams, $ionicPopup, $ionicNavBarDelegate, producto, promo, sharedCartService) {
            var id = $stateParams.id;
            var cantidadVariedadesSel = 0;
            var checkVar = function (item) {
                return item.cantVar > 0;
            }
            // get item from service by item id
            promo.getPromo(id).success(function (response) {
                $scope.promo = response;
            });

            promo.getProductoPromo(id).success(function (response) {
                $scope.items = response;

            });
            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }
            $scope.selOptions = function (optionO) {


                $scope.data = {
                    quantity: 1
                };
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
                                {text: 'Cancel'},
                                {
                                    text: '<b>Save</b>',
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
                            if ((typeof optionO.selectedVariedad === 'undefined')) {
                                optionO.selectedVariedad = res;
                                cantidadVariedadesSel += 1;

                            } else {
                                optionO.selectedVariedad = res;

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
                        quantity: 1
                    }
                    var promoPedido = {};
                    promoPedido.productosP = []
                    promoPedido.nombre = promo.pro_nombre;
                    promoPedido.precioUnitario = promo.pro_precio;
                    promoPedido.cantidad = 1;
                    promoPedido.idPromo = promo.pro_id;
                    promoPedido.detallePp = promo.pro_descripcion;
                    promoPedido.aclaracion = '';

                    angular.forEach(items, function (value, key) {
                        var prodPedido = {};
                        prodPedido.precioBase = value.prod_precioBase;
                        prodPedido.idProducto = value.prod_id;
                        prodPedido.idVariedad = ((typeof value.selectedVariedad === 'undefined') ? -1 : value.selectedVariedad.var_id);
                        prodPedido.precioCalc = 0;
                        prodPedido.nombreVariedad = ((typeof value.selectedVariedad === 'undefined') ? '' : value.selectedVariedad.var_nombre);
                        prodPedido.aclaracion = '';
                        promoPedido.productosP.push(prodPedido);

                    });
                    //promoPedido.aclaracion= 
                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        templateUrl: 'templates/popup-quantity.html',
                        title: 'Quantity',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>Save</b>',
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
                            $scope.data.quantity = res;
                            promoPedido.cantidad = res;
                            sharedCartService.cartPromo.add(promoPedido);
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
        .controller('CheckoutCtrl', function ($scope, $state, $ionicPopup, $window, auth, usuario, sharedCartService, pedido) {
            $scope.addresses = [];
            $scope.usuario = {};
            isLogged = function () {

                if (auth.hasToken())

                {
                    $scope.usuario = auth.datosUsuario();


                } else {

                    $state.go('login', {}, {location: "replace"});

                }
            };
            debugger;

            //inicilizacion
            isLogged();

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
                        {text: 'Close'},
                        {
                            text: '<b>Save</b>',
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
                            debugger;
                            if (res.response) {

                                $window.location.reload(true);



                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });


                            }
                        }).error(function (err) {
                            debugger;
                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });

                        });


                    }
                }

            };


//            

            $scope.pay = function () {


                ;
                var payment = $scope.data.payment;
                var address = $scope.data.address;

                if (!(typeof payment === 'undefined') && !(typeof address === 'undefined'))
                {


                    var pedidoEncabezado = {};
                    pedidoEncabezado.pe_idCliente = address.dir_idPersona
                    pedidoEncabezado.pe_aclaraciones = '';
                    pedidoEncabezado.pe_total = sharedCartService.total_amount;
                    pedidoEncabezado.pe_idPersona = address.dir_idPersona;
                    pedidoEncabezado.pe_cli_tel = address.dir_telefonoFijo;
                    pedidoEncabezado.pe_idDireccion = address.dir_id;
                    pedidoEncabezado.pe_medioPago = payment;
                    pedidoEncabezado.pe_idEstado = 1;

                    //test



                    pedido.setEncabezado(pedidoEncabezado).success(function (res) {
                        if (res.response) {
                            var idencabezado = res.result;
                            debugger;
                            var detalle = {};
                            detalle.idPedidoEncabezado = res.result;
                            detalle.cart = sharedCartService.cart;
                            var promoPedido = {};
                            promoPedido.idPedidoEncabezado = res.result;
                            promoPedido.cart = sharedCartService.cartPromo;
                            pedido.addDetallePedido(detalle).success(function (res) {
                                debugger;

                                if (res.response) {
                                    sharedCartService.cleanCart();
                                    sharedCartService.recalcularTotales();
                                }

                            }).error(function (err) {

                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: 'No se pudo pedir algunos productos intente mas tarde nuevamente'
                                });

                            })
                            pedido.addPromoPedido(promoPedido).success(function (res) {
                                debugger;
                                if (res.response) {
                                    sharedCartService.cleanCartPromo();
                                    sharedCartService.recalcularTotales();
                                }
//      
                                debugger;
                            }).error(function (err) {

                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: 'No se pudo pedir algunas promos intente mas tarde nuevamente'
                                });
                            })
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







                    //preguntar como ahcer las llamadas asincronicas
//                  sharedUtils.showAlert("Info", "El Pedido se realizo con Exito");
//                    $state.go('lastOrders', {}, {location: "replace", reload: true});


                    //                    // Go to past order page
//                    $ionicHistory.nextViewOptions({
//                        historyRoot: true
//                    });
//                    
                    //cargar item al carrito

//
//                    //Remove users cart


                } else
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: 'Debe elegir una Direccion y un Medio de Pago'
                    });



                }
            }








        }
        )

// Address controller
        .controller('AddressCtrl', function ($scope, $state) {
            function initialize() {
                // set up begining position
                var myLatlng = new google.maps.LatLng(21.0227358, 105.8194541);

                // set option for map
                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                // init map
                var map = new google.maps.Map(document.getElementById("map"),
                        mapOptions);

                // assign to stop
                $scope.map = map;
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
        .controller('SettingCtrl', function ($scope, $ionicPopup, $state, auth, usuario, $window) {
            //$scope.usuario = {};
            $scope.addresses = [];

            $scope.usuario = {};
            isLogged = function () {

                if (auth.hasToken())

                {
                    $scope.usuario = auth.datosUsuario();
                    debugger;


                } else {

                    $state.go('login', {}, {location: "replace"});

                }
            };
            debugger;

            //inicilizacion
            isLogged();
            usuario.getDirecciones($scope.usuario.id).success(function (response) {
                $scope.addresses = response;
                debugger;
            });
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
                            '<input type="number" placeholder="Telefono Fijo" ng-model="data.dir_telefonoFijo" ng-value="data.dir_telefonoFijo">',
                    title: title,
                    subTitle: sub_title,
                    scope: $scope,
                    buttons: [
                        {text: 'Close'},
                        {
                            text: '<b>Save</b>',
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
                        debugger;
                        usuario.deleteDireccion(res).success(function (r) {
                            if (r.response) {

                                $window.location.reload(true);
                            }
                        });


                        //eliminar direccion de la base

                    }
                });
            };

        })

// Chat controller, view list chats and chat detail
        .controller('ChatCtrl', function ($scope, Chats) {
            $scope.chats = Chats.all();

            // remove a conversation
            $scope.remove = function (chat) {
                Chats.remove(chat);
            };

            // mute a conversation
            $scope.mute = function (chat) {
                // write your code here
            }
        })

        .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout) {
            //$scope.chat = Chats.get($stateParams.chatId);
            $scope.chat = Chats.get(0);

            $scope.sendMessage = function () {
                var message = {
                    type: 'sent',
                    time: 'Just now',
                    text: $scope.input.message
                };

                $scope.input.message = '';

                // push to massages list
                $scope.chat.messages.push(message);

                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
            };

            // hover menu
            $scope.onMessageHold = function (e, itemIndex, message) {
                // show hover menu
                $ionicActionSheet.show({
                    buttons: [
                        {
                            text: 'Copy Text'
                        }, {
                            text: 'Delete Message'
                        }
                    ],
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0: // Copy Text
                                //cordova.plugins.clipboard.copy(message.text);

                                break;
                            case 1: // Delete
                                // no server side secrets here :~)
                                $scope.chat.messages.splice(itemIndex, 1);
                                break;
                        }

                        return true;
                    }
                });
            };

        })

// News controller
        .controller('NewsCtrl', function ($scope, $state, Posts) {
            // get all posts from services
            $scope.posts = Posts.all();
        })

// About controller
        .controller('AboutCtrl', function ($scope, $state, empresa, openHours) {
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



        })

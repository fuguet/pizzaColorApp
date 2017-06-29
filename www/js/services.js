angular.module('starter.services', [])

        .factory('sharedUtils', ['$ionicLoading', '$ionicPopup', function ($ionicLoading, $ionicPopup) {


                var functionObj = {};
                functionObj.showLoading = function () {
                    $ionicLoading.show({
                        content: '<i class=" ion-loading-c"></i> ', // The text to display in the loading indicator
                        animation: 'fade-in', // The animation to use
                        showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
                        maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
                        showDelay: 0 // The delay in showing the indicator
                    });
                };
                functionObj.hideLoading = function () {
                    $ionicLoading.hide();
                };
                functionObj.showAlert = function (title, message) {
                    var alertPopup = $ionicPopup.alert({
                        title: title,
                        template: message
                    });
                };
                return functionObj;
            }])


        .factory('sharedCartService', ['$ionicPopup', '$rootScope', 'restApi', function ($ionicPopup, $rootScope, restApi) {


                var cartObj = {};
                cartObj.cart = [];//lista de productos  (producto, cantidad)  
                cartObj.cartPromo = [];//lista de promos
                cartObj.cartMitad = [];
                cartObj.total_amount = 0; // total de productos       
                cartObj.total_qty = 0; // cant product 
                cartObj.qtyAderezo = 0; //cant producto con aderezos

                cartObj.aclaraciones = '';
                cartObj.aderezos = '';


                cartObj.resumen = '';


                cartObj.cleanCart = function () {
                    cartObj.cart.splice(0, cartObj.cart.length);
                    cartObj.aclaraciones = '';
                    cartObj.resumen = '';
// cantidad de componente

                };

                cartObj.cleanCartPromo = function () {
                    cartObj.cartPromo.splice(0, cartObj.cartPromo.length);//lista de productos  (producto, cantidad)  
                    cartObj.aclaraciones = '';
                    cartObj.resumen = '';


                };

                //mantiene array de las varidades pedidas en 1/2 si se pide de nuevo quita esa variedad cosa que al finalizar el pedido
                //carmitad tendra todas las varidades que falta pedir una mitad pudiendo asi validar que media pizza falto pedir para completar.
                //queda desarrollar que pasa cuando se elimina un producto que tenia mitad

                cartObj.cartMitad.add = function (variedad) {
                    var i = cartObj.cartMitad.find(variedad);
                    if (i == -1) {
                        cartObj.cartMitad.push(variedad);
                    } else
                    {
                        cartObj.cartMitad.splice(i, 1);

                    }

                }

                cartObj.cartMitad.find = function (producto2) {
                    var result = -1;

                    for (var i = 0, len = cartObj.cartMitad.length; i < len; i++) {
                        if (angular.equals(cartObj.cartMitad[i], producto2)) {
                            result = i;
                            break;
                        }
                    }
                    return result;
                    //revisar hacerlo con each
                };
                cartObj.cartMitad.isEmpty = function () {
                    return !(cartObj.cartMitad.length > 0);
                    //revisar hacerlo con each
                };
                cartObj.cartMitad.drop = function (variedad) {
                    var i = cartObj.cartMitad.find(variedad);
                    if (i != -1) {
                        cartObj.cartMitad.splice(i, 1);
                    }

                }



                cartObj.recalcularTotales = function () {
                    cartObj.total_amount = 0; // total de productos       
                    cartObj.total_qty = 0;
                    cartObj.qtyAderezo = 0;

                    for (var i = 0, len = cartObj.cart.length; i < len; i++) {
                        cartObj.total_qty += cartObj.cart[i].cantidad;
                        cartObj.total_amount += parseFloat(parseFloat(cartObj.cart[i].cantidad) * parseFloat(cartObj.cart[i].productoP.precioBase))
                        debugger

                    }
                    for (var i = 0, len = cartObj.cartPromo.length; i < len; i++) {

                        cartObj.total_qty += cartObj.cartPromo[i].cantidad;
                        cartObj.total_amount += parseFloat(parseFloat(cartObj.cartPromo[i].cantidad) * parseFloat(cartObj.cartPromo[i].precioUnitario));
                        debugger;




                    }

                    $rootScope.totalCart = cartObj.total_qty;

                }

                cartObj.generarResumen = function () {
                    var resumentxt = '';
                    for (var i = 0, len = cartObj.cart.length; i < len; i++) {
                        var temp = '*' + cartObj.cart[i].cantidad + '-' + cartObj.cart[i].productoP.nombre + '-' +
                                cartObj.cart[i].productoP.nombreVariedad + '-$' + cartObj.cart[i].productoP.precioBase;
                        resumentxt = resumentxt + temp + ' \n';
                    }
                    cartObj.resumen = resumentxt + ' \n'

                    resumentxt = '';

                    for (var i = 0, len = cartObj.cartPromo.length; i < len; i++) {
                        var temp = '*' + cartObj.cartPromo[i].cantidad + '-' + cartObj.cartPromo[i].nombre + '-' +
                                '-$' + cartObj.cartPromo[i].precioUnitario + ' \n';

                        for (var j = 0, len2 = cartObj.cartPromo[i].productosP.length; j < len2; j++) {
                            if (cartObj.cartPromo[i].productosP[j].nombreVariedad.length > 0)
                                temp = temp + '-*' + cartObj.cartPromo[i].productosP[j].nombreVariedad + ' \n';

                        }
                        resumentxt = resumentxt + temp + ' \n';

                    }

                    cartObj.resumen = cartObj.resumen + resumentxt
                    debugger;

                    return  cartObj.resumen;


                }

                //productos
                cartObj.cart.add = function (detalle) {

                    var i = cartObj.cart.find(detalle.productoP);
                    if (i != -1) {
                        cartObj.cart[i].cantidad += detalle.cantidad;
                        cartObj.total_qty += detalle.cantidad;
                        cartObj.total_amount += parseFloat(parseFloat(detalle.cantidad) * parseFloat(detalle.productoP.precioBase));

                    } else {
                        cartObj.cart.push(detalle);
                        cartObj.total_qty += detalle.cantidad;
                        cartObj.total_amount += parseFloat(parseFloat(detalle.cantidad) * parseFloat(detalle.productoP.precioBase));

                    }
                    debugger;
                    cartObj.qtyAderezo += detalle.productoP.aderezo;
                    $rootScope.totalCart = cartObj.total_qty;
                };
                cartObj.cart.find = function (producto2) {
                    var result = -1;

                    for (var i = 0, len = cartObj.cart.length; i < len; i++) {
                        if (angular.equals(cartObj.cart[i].productoP, producto2)) {
                            result = i;
                            break;
                        }
                    }
                    return result;
                    //revisar hacerlo con each
                };
                cartObj.cart.drop = function (ind) {

                    var temp = cartObj.cart[ind];
                    cartObj.total_qty -= parseFloat(temp.cantidad);
                    cartObj.total_amount -= (parseFloat(temp.cantidad) * parseFloat(temp.productoP.precioBase));
                    cartObj.qtyAderezo -= temp.productoP.aderezo;
                    cartObj.cart.splice(ind, 1);
                    $rootScope.totalCart = cartObj.total_qty;
                    debugger;
                    if (!(temp.cantidad % 1 == 0)) {
                        var item = {
                            variedad: temp.productoP.nombreVariedad,
                            categoria: temp.productoP.idCategoria
                        }
                        cartObj.cartMitad.drop(item);
                    }


                };
                cartObj.cart.increment = function (id) {

                    var ind = cartObj.cart.find(id);
                    var temp = cartObj.cart[ind];
                    temp.qty += 1;
                    cartObj.total_qty += 1;
                    cartObj.total_amount += (parseFloat(cartObj.cart[ind].price));
                };
                cartObj.cart.decrement = function (id) {
                    var ind = cartObj.cart.find(id);
                    var temp = cartObj.cart[ind];
                    cartObj.total_qty -= 1;
                    cartObj.total_amount -= parseFloat(temp.price);
                    if (cartObj.cart[cartObj.cart.find(id)].qty == 1) {  // if the cart item was only 1 in qty
                        cartObj.cart.splice(cartObj.cart.find(id), 1); //edited
                    } else {
                        cartObj.cart[cartObj.cart.find(id)].qty -= 1;
                    }

                };

                //promos
                cartObj.cartPromo.increment = function (promoPedido) {

                    promoPedido.cantidad += 1;//aumentar cantidad de la promo
                    cartObj.total_qty += 1;
                    cartObj.total_amount += parseFloat(promoPedido.precioUnitario);


                };
                cartObj.cartPromo.decrement = function (ind) {

                    var temp = cartObj.cartPromo[ind];
                    cartObj.total_qty -= 1;
                    cartObj.total_amount -= parseFloat(temp.precioUnitario);
                    if (cartObj.cart[ind].cantidad == 1) {  // if the cart item was only 1 in qty
                        cartObj.cart.splice(ind, 1); //edited
                    } else {
                        cartObj.cart[ind].cantidad -= 1;
                    }

                };
                cartObj.cartPromo.drop = function (ind) {


                    var temp = cartObj.cartPromo[ind];

                    debugger;
                    cartObj.total_qty -= parseFloat(temp.cantidad);
                    cartObj.total_amount -= parseFloat(parseFloat(temp.cantidad) * parseFloat(temp.precioUnitario));
                    cartObj.qtyAderezo -= temp.aderezos;
                    cartObj.cartPromo.splice(ind, 1);
                    $rootScope.totalCart = cartObj.total_qty;
                };
                cartObj.cartPromo.add = function (promoPedido) {
                    debugger;
                    cartObj.cartPromo.push(promoPedido);
                    cartObj.total_qty += promoPedido.cantidad;
                    cartObj.total_amount += parseFloat(parseFloat(promoPedido.cantidad) * parseFloat(promoPedido.precioUnitario));
                    cartObj.qtyAderezo += promoPedido.aderezos;
                    $rootScope.totalCart = cartObj.total_qty;

                };


                cartObj.getQty = function () {
                    return  cartObj.total_qty;
                };
                return cartObj;
            }])


        .factory('auth', ['$location', '$state', function ($location, $state) {
                var auth = {
                    setToken: function (token) {
                        localStorage[API.token_name] = token;
                    },
                    getToken: function () {
                        return localStorage[API.token_name];
                    },
                    getUserData: function () {

                        try
                        {
                            var token = localStorage[API.token_name];
                            if (token === '')
                                return;
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                            return JSON.parse(window.atob(base64)).data;
                        } catch (err) {
                            $location.path('/');
                        }
                    },
                    logout: function () {
                        localStorage[API.token_name] = '';
                        localStorage.removeItem(API.token_name);
                        //                                                                        $state.go('login');
                    },
                    hasToken: function () {
                        debugger;
                        return (!(typeof localStorage[API.token_name] === 'undefined') && (localStorage[API.token_name] !== ''));
                    },
                    redirectIfNotExists: function () {
                        if (!auth.hasToken()) {
                            $state.go('login');
                        }
                    },
                    datosUsuario: function () {
                        debugger;


                        usuario = {"id": "", "nombre": "", "celular": "", "email": ""};

                        usuario.id = auth.getUserData().id;
                        usuario.nombrecompleto = auth.getUserData().NombreCompleto;
                        usuario.nombre = auth.getUserData().Nombre;
                        usuario.celular = auth.getUserData().Celular;
                        usuario.email = auth.getUserData().email;
                        //You have to create a local variable for storing emails
                        data_editable = {};
                        data_editable.email = usuario.email;  // For editing store it in local variable
                        data_editable.password = "";
                        return usuario;

                    }
                };



                return auth;
            }])


        .service('restApi', ['$http', 'auth', function ($http, auth) {


                this.call = function (config) {
                    var headers = {};
                    headers[API.token_name] = auth.getToken();
//                                                                  headers['Content-Type'] = 'application/x-www-form-urlencoded';

                    var http_config = {
                        method: config.method,
                        url: API.base_url + config.url,
                        data: typeof (config.data) === 'undefined' ? null : config.data,
                        headers: headers
                    };
                    $http(http_config).then(function successCallback(response) {

                        config.response(response.data);
                    }, function errorCallback(response) {
                        switch (response.status) {
                            case 401: // No autorizado
                                auth.logout();
                                break;
                            case 422: // Validación
                                config.validationError(response.data);
                                break;
                            default:
                                config.error(response);
                                console.log(response.statusText);
                                break;
                        }
                    });
                };
            }])


        .factory('Posts', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var posts = [
                {
                    id: 1,
                    title: 'Lorem Ipsum is simply',
                    thumb: 'img/items/thumbs/brick_chicken.jpg',
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever si"
                },
                {
                    id: 2,
                    title: 'Lorem Ipsum is simply',
                    thumb: 'img/items/thumbs/fried_calamari.jpg',
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever si"
                },
                {
                    id: 3,
                    title: 'Lorem Ipsum is simply',
                    thumb: 'img/items/thumbs/marsala_chicken.jpg',
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever si"
                },
                {
                    id: 4,
                    title: 'Lorem Ipsum is simply',
                    thumb: 'img/items/thumbs/rib_eyes.jpg',
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever si"
                },
                {
                    id: 5,
                    title: 'Lorem Ipsum is simply',
                    thumb: 'img/items/thumbs/seared_tuna.jpg',
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever si"
                },
                {
                    id: 6,
                    title: 'Lorem Ipsum is simply',
                    thumb: 'img/items/thumbs/zuppa.jpg',
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever si"
                },
                {
                    id: 7,
                    title: 'Lorem Ipsum is simply',
                    thumb: 'img/items/thumbs/brick_chicken.jpg',
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever si"
                }
            ];

            return {
                all: function () {
                    return posts;
                },
                remove: function (post) {
                    posts.splice(posts.indexOf(post), 1);
                },
                get: function (postId) {
                    for (var i = 0; i < posts.length; i++) {
                        if (posts[i].id === parseInt(postId)) {
                            return posts[i];
                        }
                    }
                    return null;
                }
            };
        })

        .factory('promo', ['$http', function ($http) {
                // Might use a resource here that returns a JSON array

                var dataPromo = {};

                dataPromo.getPromos = function () {
                    return($http({
                        url: API.base_url + 'public/prolistarslider',
                        method: "GET"
                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };
                dataPromo.getPromo = function (idPromo) {
                    return($http({
                        url: API.base_url + 'public/proobtenertodo/' + idPromo,
                        method: "GET"
                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };
                dataPromo.getProductoPromo = function (idPromo) {
                    return($http({
                        url: API.base_url + 'public/prolistarprod2/' + idPromo,
                        method: "GET"
                    }).success(function (data, status, headers, config) {

                        datos = data.data;
                        return datos;
                    }).error(function (err) {

                        error = err;
                    })
                            )

                };

                return dataPromo;
            }])

        .factory('categoria', ['$http', 'auth', function ($http, auth) {
                // Might use a resource here that returns a JSON array

                var headers = {};
                headers[API.token_name] = auth.getToken();
                var dataCategoria = {};

                dataCategoria.getCategorias = function () {
                    return($http({
                        url: API.base_url + 'public/catlistar3',
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };

                dataCategoria.getCategoria = function (idCategoria) {
                    return($http({
                        url: API.base_url + 'public/catobtener/' + idCategoria,
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };

                return dataCategoria;
            }])

        .factory('producto', ['$http', 'auth', function ($http, auth) {
                // Might use a resource here that returns a JSON array

                var headers = {};
                headers[API.token_name] = auth.getToken();
                var dataProducto = {};

                dataProducto.getProductoCat = function (idCategoria) {
                    return($http({
                        url: API.base_url + '/public/prodlistarCat2/' + idCategoria,
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };

                dataProducto.getProducto = function (idProducto) {
                    return($http({
                        url: API.base_url + '/public/prodobtenertodo/' + idProducto,
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {

                        datos = data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };


                return dataProducto;
            }])


        .factory('empresa', ['$http', 'auth', function ($http, auth) {
                // Might use a resource here that returns a JSON array

                var headers = {};
                headers[API.token_name] = auth.getToken();
                var dataEmpresa = {};

                dataEmpresa.getSucursal = function () {
                    return($http({
                        url: API.base_url + 'public/sucobtener/4',
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };

                dataEmpresa.getHorarios = function () {
                    return($http({
                        url: API.base_url + 'public/dhlistar/4',
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {

                        datos = data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };

                dataEmpresa.getTelefonos = function () {
                    return($http({
                        url: API.base_url + 'public/dclistartelsuc/4',
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {

                        datos = data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };

                dataEmpresa.getDatosContacto = function () {
                    return($http({
                        url: API.base_url + 'public/dcobtenersuc/4',
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {

                        datos = data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )
                };

                dataEmpresa.getParametros = function () {
                    return($http({
                        url: API.base_url + 'public/parobtener/4',
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        datos = data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )
                };

                dataEmpresa.getAderezos = function () {
                    return($http({
                        url: API.base_url + 'public/adelistar1',
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {

                        datos = data;
                        return datos;
                    }).error(function (err) {

                        error = err;
                    })
                            )
                };





                return dataEmpresa;
            }])


        .factory('openHours', ['$http', 'auth', 'empresa', function ($http, auth, empresa) {
                // Might use a resource here that returns a JSON array

                var headers = {};
                headers[API.token_name] = auth.getToken();
                var dataOpen = {};
                dataOpen.isOpen = function (openHours) {

                    var now = (new Date());
                    var day = now.getDay();
                    var message = '';
                    var response = {};
                    var date = getShiftedDate(now);
                    var fixedTime = date.getTime();
                    // var fixedTime = now.getTime();

                    var open;

                    for (var i = 0; i < openHours.length; i++) {
                        open = openHours[i];
                        if (parseInt(open.dh_diaSemana) !== day) {
                            continue;
                        }

                        var ha = (new Date());
                        var hc = (new Date());
                        var hora = open.dh_horaApertura.substring(0, 2);
                        var minutos = open.dh_horaApertura.substring(3, 5);
                        var hora1 = open.dh_horaCierre.substring(0, 2);
                        var minutos1 = open.dh_horaCierre.substring(3, 5);

                        ha.setHours(parseInt(hora), parseInt(minutos), 1);
                        hc.setHours(parseInt(hora1), parseInt(minutos1), 1);


                        var openAt = getShiftedDate(ha).getTime();
                        var closeAt = getShiftedDate(hc).getTime();

                        if (fixedTime >= openAt && fixedTime <= closeAt) {
                            response.valor = true;
                            return response;
                        } else {


                            response.message =
                                    'EL delivery esta abierto de: ' +
                                    open.dh_horaApertura + ' a  ' +
                                    open.dh_horaCierre +
                                    ', Ahora son las  ' + now.getHours() + ':' + now.getMinutes();
                            response.valor = false;
                            return response;
                        }
                    }

                    response.valor = false;

                    return response;

                };

                function getShiftedDate(now, shift) {
                    shift = shift || 0;

                    var hours;

                    if (shift > 0) {
                        hours = now.getUTCHours() + shift;
                    } else {
                        hours = now.getHours();
                    }

                    var minutes = now.getMinutes();
                    return (new Date(2015, 0, 1, hours, minutes, 0));
                }
                ;




                return dataOpen;
            }])

        .factory('usuario', ['$http', 'auth', function ($http, auth) {
                // Might use a resource here that returns a JSON array
                debugger;
                var headers = {};
                headers[API.token_name] = auth.getToken();
//                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                var dataUsuario = {};

                dataUsuario.getDirecciones = function (id) {

                    return($http({
                        url: API.base_url + 'loginpublic/perlistardir/' + id,
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };
                dataUsuario.addDireccion = function (data) {
                    debugger;
                    return($http({
                        url: API.base_url + 'loginpublic/dirinsertar',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {
                        debugger;
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        debugger;
                        error = err;
                    })
                            )

                };
                dataUsuario.deleteDireccion = function (id) {
                    debugger;
                    return($http({
                        url: API.base_url + 'loginpublic/direliminar/' + id,
                        method: "DELETE",
                        headers: headers

                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        error = err;
                    })
                            )

                };
                dataUsuario.updateDireccion = function (data) {
                    debugger;
                    return($http({
                        url: API.base_url + 'loginpublic/diractualizar/' + data.dir_id,
                        method: "PUT",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {
                        debugger;
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        debugger;
                        error = err;
                    })
                            )

                };
                dataUsuario.getPedidos = function (id) {
                    debugger;
                    return($http({
                        url: API.base_url + 'loginpublic/pelistarcliente/' + id,
                        method: "GET",
                        headers: headers

                    }).success(function (data, status, headers, config) {
                        debugger;
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        debugger;
                        error = err;
                    })
                            )

                };

                dataUsuario.save = function (id, data) {
                    debugger;

                    return($http({
                        url: API.base_url + 'loginpublic/peractualizar/' + id,
                        method: "PUT",
                        data: data,
                        headers: headers

                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {
                        debugger;
                        error = err;
                    })
                            )

                };

                return dataUsuario;
            }])

        .factory('pedido', ['$http', 'auth', function ($http, auth) {
                // Might use a resource here that returns a JSON array

                var headers = {};
                headers[API.token_name] = auth.getToken();
                var dataPedido = {};


                dataPedido.setEncabezado = function (data) {
                    debugger;

                    return($http({
                        url: API.base_url + 'loginpublic/peinsertar',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {
                        debugger;

                        return error;

                    })
                            )

                };
                dataPedido.addDetallePedido = function (data) {
                    debugger;
                    return($http({
                        url: API.base_url + 'loginpublic/peinsertarcart',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {
                        debugger;
                        return data;
                    }).error(function (error, status) {
                        debugger;
                        return error;

                    })
                            )

                };
                dataPedido.addPromoPedido = function (data) {
                    debugger;
                    return($http({
                        url: API.base_url + 'loginpublic/peinsertarcartpromo',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {
                        debugger;
                        return data;
                    }).error(function (error, status) {
                        debugger;
                        return error;

                    })
                            )

                };



                return dataPedido;
            }])

        .factory('credenciales', ['$http', 'auth', function ($http, auth) {
                // Might use a resource here that returns a JSON array

                var headers = {};
                headers[API.token_name] = auth.getToken();
                var dataCredencial = {};


                dataCredencial.login = function (data) {

                    return($http({
                        url: API.base_url + 'auth/autenticar',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {
                        debugger;

                        return error;

                    })
                            )

                };
                dataCredencial.sigup = function (data) {
                    debugger;
                    return($http({
                        url: API.base_url + 'auth/registrar',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {
                        debugger;

                        return error;

                    })
                            )

                };




                return dataCredencial;
            }])

        .factory('externalAppsService', ['$window', function ($window) {
                // Might use a resource here that returns a JSON array




                var service = {
                    openExternalUrl: openExternalUrl,
                    openMapsApp: openMapsApp
                };
                return service;


                function openExternalUrl(url) {
                    $window.open(url, '_system', 'location=yes');
                    return false;
                }

                function openMapsApp(coords) {
                    debugger;
                    var q;
                    if (ionic.Platform.isAndroid()) {
                        q = 'geo:' + coords + '?q=' + coords;
                    } else {
                        q = 'maps://maps.apple.com/?q=' + coords;
                    }
                    q = q.replace(' ', '');
                    $window.location.href = q;
                    return q;
                }





            }])

      

        
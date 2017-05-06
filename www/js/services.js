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


        .factory('sharedCartService', ['$ionicPopup', 'restApi', function ($ionicPopup, restApi) {


                var cartObj = {};
                cartObj.cart = []; //lista de productos  (producto, cantidad)         
                cartObj.total_amount = 0; // total de productos
                cartObj.total_compAmount = 0; // total de componentes
                cartObj.total_qty = 0; // cant producto
                cartObj.total_compqty = 0; // cantidad de componente
                cartObj.idPE = -1;
                cartObj.comentariosP = '';
                
                cartObj.generarPedido = function (data) {

                    var data2 = {};
                    data2.pe_idCliente = data.idCliente;
                    data2.pe_idDireccion = data.idDireccion;
                    data2.pe_medioPago = data.medioPago;
                    data2.pe_comentarios = cartObj.comentariosP;
                    data2.pe_idPersona = data.idCliente;
                    data2.pe_cli_tel = data.tel;
                    data2.pe_idEstado = 1;
                    
                    restApi.call({
                        method: 'post',
                        url: 'pedidoencabezado/insertar',
                        data: data2,
                        response: function (r) {
                            cartObj.idPE = r.result;
                        },
                        error: function (r) {

                        },
                       validationError: function (r) {

                        }
                    });
                }
                cartObj.generarDetalle = function () {

                    angular.forEach(cartObj.cart, function (value, key) {
                        var prodPedido = {};
                        prodPedido.precioBase = value.producto.prod_precioBase;
                        prodPedido.idProducto = value.producto.prod_id;
                        prodPedido.idVariedad = value.variedad.var_id;
                        prodPedido.precioCalc = value.price + value.compAmount;
                        prodPedido.componentes = value.componentes;
                        restApi.call({
                            method: 'post',
                            url: 'productopedido/insertar',
                            data: prodPedido,
                            response: function (r) {
                        
                                cartObj.registrarDetalle(value, r.result);
                            },
                            error: function (r) {

                            },
                            validationError: function (r) {

                            }
                        });
                    });
                }
                cartObj.registrarDetalle = function (value, idpp) {

                    var detallePedido = {};
                    detallePedido.dp_Cantidad = parseInt(value.qty);
                    detallePedido.dp_PrecioUnitario = value.price + value.compAmount;
                    detallePedido.dp_idProductoPedido = idpp;
                    detallePedido.dp_idPedidoEncabezado = cartObj.idPE;
                    restApi.call({
                        method: 'post',
                        url: 'detallepedido/insertar',
                        data: detallePedido,
                        response: function (r) {
                          
                        },
                        error: function (r) {
                            
                            //abria que limpiar el carro si guardo

                        },
                        validationError: function (r) {

                        }
                    });
                }
                cartObj.vaciarCarro = function () {
                    cartObj.cart = []; //lista de productos  (producto, cantidad)         
                    cartObj.total_amount = 0; // total de productos
                    cartObj.total_compAmount = 0; // total de componentes
                    cartObj.total_qty = 0; // cant producto
                    cartObj.total_compqty = 0; // cantidad de componente
                    cartObj.idPE = -1;
                    cartObj.comentariosP = '';
                };
                cartObj.cargarComentarios = function () {

                    angular.forEach(cartObj.cart, function (value, key) {

                        cartObj.comentariosP = cartObj.comentariosP + ' Producto = ' + value.producto.prod_nombre + ' comentario =' + value.comentario + '\n';
                    });
                }
                cartObj.cart.add = function (productoPedido) {
                    debugger;
                    var i = cartObj.cart.find(productoPedido);
                    if (i != -1) {
                        cartObj.cart[i].cantidad += productoPedido.cantidad;
                       
                    } else {
                        debugger;

                        cartObj.cart.push(productoPedido);
                        cartObj.total_qty += productoPedido.cantidad;
                        cartObj.total_amount += parseFloat(parseFloat(productoPedido.cantidad) * parseFloat(productoPedido.precioBase));
                    }
                };
                cartObj.cart.find = function (producto2) {
                    var result = -1;
                    debugger;
                    for (var i = 0, len = cartObj.cart.length; i < len; i++) {
                        if (cartObj.cart[i].idProducto === producto2.idProducto && cartObj.cart[i].idVariedad === producto2.idVariedad) {
                            result = i;
                            break;
                        }
                    }
                    return result;
                    //revisar hacerlo con each
                };
                cartObj.cart.drop = function (id) {

                    var ind = cartObj.cart.find(id);
                    var temp = cartObj.cart[ind];
                    cartObj.total_qty -= parseInt(temp.qty);
                    cartObj.total_compqty -= parseInt(temp.comqty);
                    cartObj.total_amount -= (parseInt(temp.qty) * parseInt(temp.price));
                    cartObj.total_compAmount -= parseFloat(temp.compAmount);
                    cartObj.cart.splice(ind, 1);
                };
                cartObj.cart.increment = function (id) {

                    var ind = cartObj.cart.find(id);
                    var temp = cartObj.cart[ind];
                    temp.qty += 1;
                    cartObj.total_compqty += parseInt(temp.comqty); //preguntar si aumenta la cant del prooducto aumenta los componentes tambien
                    cartObj.total_qty += 1;
                    cartObj.total_amount += (parseInt(cartObj.cart[ind].price));
                    cartObj.total_compAmount += parseFloat(temp.compAmount);
                };
                cartObj.cart.decrement = function (id) {
                    var ind = cartObj.cart.find(id);
                    var temp = cartObj.cart[ind];
                    cartObj.total_qty -= 1;
                    cartObj.total_amount -= parseInt(temp.price);
                    cartObj.total_compqty -= parseInt(temp.comqty);
                    cartObj.total_compAmount -= parseFloat(temp.compAmount);
                    if (cartObj.cart[cartObj.cart.find(id)].qty == 1) {  // if the cart item was only 1 in qty
                        cartObj.cart.splice(cartObj.cart.find(id), 1); //edited
                    } else {
                        cartObj.cart[cartObj.cart.find(id)].qty -= 1;
                    }

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
                        //                                                                        $state.go('login');
                    },
                    hasToken: function () {
                        return (localStorage[API.token_name] !== '');
                    },
                    redirectIfNotExists: function () {
                        if (!auth.hasToken()) {
                            $state.go('login');
                        }
                    },
                    datosUsuario: function () {
                        usuario = {"id": "", "nombre": "", "celular": "", "email": ""};
                        usuario.id = auth.getUserData().id;
                        usuario.nombre = auth.getUserData().nombre;
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

        .factory('Menu', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var menu = [
                {
                    id: 1,
                    name: "Appetizes",
                    thumb: 'img/categories/appetizes.png',
                    items: []
                },
                {
                    id: 2,
                    name: "Sides",
                    thumb: 'img/categories/sides.png',
                    items: []
                },
                {
                    id: 3,
                    name: "Desserts",
                    thumb: 'img/categories/desserts.png',
                    items: []
                },
                {
                    id: 4,
                    name: "Salads",
                    thumb: 'img/categories/salad.jpg',
                    items: []
                },
                {
                    id: 5,
                    name: "Main cours",
                    thumb: 'img/categories/entree.jpg',
                    items: []
                }
            ];

            return {
                all: function () {
                    return menu;
                }
            };
        })

        .factory('Categories', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var categories = [
                {
                    id: 1,
                    name: "Entrees",
                    thumb: 'img/categories/entree.jpg',
                    items: [
                        {
                            id: 1,
                            name: "Seared tuna",
                            price: 14.20,
                            thumb: "img/items/seared_tuna.jpg"
                        },
                        {
                            id: 2,
                            name: "Rib eye",
                            price: 15.20,
                            thumb: "img/items/rib_eyes.jpg"
                        },
                        {
                            id: 3,
                            name: "Brick chicken",
                            price: 16.20,
                            thumb: "img/items/brick_chicken.jpg"
                        },
                        {
                            id: 4,
                            name: "Fried calamari",
                            price: 17.20,
                            thumb: "img/items/fried_calamari.jpg"
                        },
                        {
                            id: 5,
                            name: "Zuppa",
                            price: 17.20,
                            thumb: "img/items/zuppa.jpg"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Drinks",
                    thumb: 'img/categories/drink.jpg',
                    items: []
                },
                {
                    id: 3,
                    name: "Salads",
                    thumb: 'img/categories/salad.jpg',
                    items: []
                },
                {
                    id: 4,
                    name: "Fruits",
                    thumb: 'img/categories/fruit.jpg',
                    items: []
                },
                {
                    id: 5,
                    name: "Pizzas",
                    thumb: 'img/categories/pizza.jpg',
                    items: []
                },
                {
                    id: 6,
                    name: "Sushi",
                    thumb: 'img/categories/sushi.jpg',
                    items: []
                },
                {
                    id: 7,
                    name: "Buggers",
                    thumb: 'img/categories/bugger.jpg',
                    items: []
                },
            ];

            return {
                all: function () {
                    return categories;
                },
                remove: function (cat) {
                    categories.splice(categories.indexOf(cat), 1);
                },
                get: function (catId) {
                    for (var i = 0; i < categories.length; i++) {
                        if (categories[i].id === parseInt(catId)) {
                            return categories[i];
                        }
                    }
                    return null;
                }
            };
        })
        .factory('Items', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var items = [
                {
                    id: 1,
                    name: "Rib eye steak",
                    price: 14.20,
                    offer: 40,
                    thumb: "img/items/thumbs/rib_eyes.jpg",
                    images: [
                        "img/items/rib_eye_2.jpg",
                        "img/items/rib_eye_3.jpg",
                        "img/items/rib_eye_4.jpg"
                    ],
                    description: "Beef steak, sauce, french fries",
                    faved: true,
                    options: [
                        {
                            id: 1,
                            name: "Tomatoes"
                        },
                        {
                            id: 2,
                            name: "Olives"
                        },
                        {
                            id: 3,
                            name: "Oregano"
                        }
                    ],
                    extras: [
                        {
                            id: 1,
                            name: "Cheese",
                            price: 1.2
                        }
                    ],
                    sizes: [
                        {
                            id: 1,
                            name: "Standard",
                            price: 8
                        },
                        {
                            id: 2,
                            name: "Large",
                            price: 12
                        }
                    ],
                    reviews: [
                        {
                            id: 1,
                            user_id: 1,
                            username: "Adam",
                            face: "img/people/adam.jpg",
                            text: "Incredibly delicious tender steak! Be sure to order more",
                            images: []
                        },
                        {
                            id: 2,
                            user_id: 3,
                            username: "Ben",
                            face: "img/people/ben.png",
                            text: "Mmm.... Amazing! Steaks are very good",
                            images: []
                        },
                        {
                            id: 3,
                            user_id: 3,
                            username: "Max",
                            face: "img/people/max.png",
                            text: "Incredibly delicious tender steak! Be sure to order more",
                            images: []
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Seared Tuna",
                    price: 15.20,
                    offer: 20,
                    thumb: "img/items/thumbs/seared_tuna.jpg"
                },
                {
                    id: 3,
                    name: "Brick chicken",
                    price: 16.20,
                    offer: 40,
                    thumb: "img/items/thumbs/brick_chicken.jpg"
                },
                {
                    id: 4,
                    name: "Fried calamari",
                    price: 17.20,
                    offer: 50,
                    thumb: "img/items/thumbs/fried_calamari.jpg"
                },
                {
                    id: 5,
                    name: "Zuppa",
                    price: 17.20,
                    offer: 20,
                    thumb: "img/items/thumbs/zuppa.jpg"
                }
            ];

            return {
                all: function () {
                    return items;
                },
                remove: function (item) {
                    items.splice(items.indexOf(item), 1);
                },
                get: function (itemId) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].id === parseInt(itemId)) {
                            return items[i];
                        }
                    }
                    return null;
                }
            };
        })
        .factory('Cart', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var cart = {
                shipping: 6,
                total: 166,
                items: [
                    {
                        id: 2,
                        name: "Seared Tuna",
                        price: 15.20,
                        thumb: "img/items/thumbs/seared_tuna.jpg",
                        quantity: 2
                    },
                    {
                        id: 3,
                        name: "Brick chicken",
                        price: 16.20,
                        thumb: "img/items/thumbs/brick_chicken.jpg",
                        quantity: 3
                    },
                    {
                        id: 4,
                        name: "Fried calamari",
                        price: 17.20,
                        thumb: "img/items/thumbs/fried_calamari.jpg",
                        quantity: 1
                    },
                    {
                        id: 5,
                        name: "Zuppa",
                        price: 17.20,
                        thumb: "img/items/thumbs/zuppa.jpg",
                        quantity: 2
                    }
                ]
            };

            return {
                get: function () {
                    return cart;
                }
            };
        })

        .factory('Chats', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var chats = [
                {
                    id: 0,
                    name: 'Ben Sparrow',
                    lastText: 'You on your way?',
                    face: 'img/people/ben.png',
                    messages: [
                        {
                            type: 'received',
                            text: 'Hey, How are you? wanna hang out this friday?',
                            image: '',
                            time: 'Thursday 05:55 PM'
                        },
                        {
                            type: 'sent',
                            text: 'Good, Yes sure why not :D',
                            image: '',
                            time: 'Thursday 05:56 PM'
                        },
                        {
                            type: 'received',
                            text: 'Check out this view from my last trip',
                            image: '',
                            time: 'Thursday 05:57 PM'
                        },
                        {
                            type: 'sent',
                            text: 'Looks Great is that view in Canada?',
                            image: '',
                            time: 'Thursday 05:58 PM'
                        },
                        {
                            type: 'received',
                            text: 'Yes, it\'s in Canada',
                            image: '',
                            time: 'Thursday 05:57 PM'
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Max Lynx',
                    lastText: 'Hey, it\'s me',
                    face: 'img/people/max.png'
                },
                {
                    id: 2,
                    name: 'Adam Bradleyson',
                    lastText: 'I should buy a boat',
                    face: 'img/people/adam.jpg'
                },
                {

                    d: 3,
                    name: 'Perry Governor',
                    lastText: 'Look at my mukluks!',
                    face: 'img/people/perry.png'
                },
                {
                    id: 4,
                    name: 'Mike Harrington',
                    lastText: 'This is wicked good ice cream.',
                    face: 'img/people/mike.png'
                },
                {
                    id: 5,
                    name: 'Ben Sparrow',
                    lastText: 'You on your way?',
                    face: 'img/people/ben.png'
                },
                {
                    id: 6,
                    name: 'Max Lynx',
                    lastText: 'Hey, it\'s me',
                    face: 'img/people/max.png'
                }
            ];

            return {
                all: function () {
                    return chats;
                },
                remove: function (chat) {
                    chats.splice(chats.indexOf(chat), 1);
                },
                get: function (chatId) {
                    for (var i = 0; i < chats.length; i++) {
                        if (chats[i].id === parseInt(chatId)) {
                            return chats[i];
                        }
                    }
                    return null;
                }
            };
        })
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
                        url: API.base_url + 'promo/listarslider',
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
                        url: API.base_url + 'promo/obtenertodo/' + idPromo,
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
                        url: API.base_url + 'promo/listarprod2/' + idPromo,
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
                        url: API.base_url + 'categoria/listar3',
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
                        url: API.base_url + 'categoria/obtener/' + idCategoria,
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
                        url: API.base_url + '/producto/listarCat2/' + idCategoria,
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
                        url: API.base_url + '/producto/obtenertodo/' + idProducto,
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
                        url: API.base_url + 'sucursal/obtener/4',
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
                        url: API.base_url + 'diahorario/listar/4',
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
                        url: API.base_url + 'datocontacto/listartelsuc/4',
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
                        url: API.base_url + 'datocontacto/obtenersuc/4',
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
                                    ', Ahora son las  ' + now.getHours()+':'+now.getMinutes();
                            response.valor = false;
                            return response;
                        }
                    }
                    
                    response.valor=false;

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

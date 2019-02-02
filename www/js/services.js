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
                    cartObj.aderezos = '';
// cantidad de componente

                };

                cartObj.cleanCartPromo = function () {
                    cartObj.cartPromo.splice(0, cartObj.cartPromo.length);//lista de productos  (producto, cantidad)  
                    cartObj.aclaraciones = '';
                    cartObj.resumen = '';
                    cartObj.aderezos = '';


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


                    }
                    for (var i = 0, len = cartObj.cartPromo.length; i < len; i++) {

                        cartObj.total_qty += cartObj.cartPromo[i].cantidad;
                        cartObj.total_amount += parseFloat(parseFloat(cartObj.cartPromo[i].cantidad) * parseFloat(cartObj.cartPromo[i].precioUnitario));





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


                    cartObj.total_qty -= parseFloat(temp.cantidad);
                    cartObj.total_amount -= parseFloat(parseFloat(temp.cantidad) * parseFloat(temp.precioUnitario));
                    cartObj.qtyAderezo -= temp.aderezos;
                    cartObj.cartPromo.splice(ind, 1);
                    $rootScope.totalCart = cartObj.total_qty;
                };
                cartObj.cartPromo.add = function (promoPedido) {

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

                        return (!(typeof localStorage[API.token_name] === 'undefined') && (localStorage[API.token_name] !== ''));
                    },
                    redirectIfNotExists: function () {
                        if (!auth.hasToken()) {
                            $state.go('login');
                        }
                    },
                    datosUsuario: function () {


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

        .factory('Countrie', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var countries = [{
                    name: "Otro",
                    dial_code: "+0",
                    code: "OT"
                }, {
                    name: "United States",
                    dial_code: "+1",
                    code: "US"
                }, {
                    name: "Israel",
                    dial_code: "+972",
                    code: "IL"
                }, {
                    name: "Afghanistan",
                    dial_code: "+93",
                    code: "AF"
                }, {
                    name: "Albania",
                    dial_code: "+355",
                    code: "AL"
                }, {
                    name: "Algeria",
                    dial_code: "+213",
                    code: "DZ"
                }, {
                    name: "Andorra",
                    dial_code: "+376",
                    code: "AD"
                }, {
                    name: "Angola",
                    dial_code: "+244",
                    code: "AO"
                }, {
                    name: "Anguilla",
                    dial_code: "+1 264",
                    code: "AI"
                }, {
                    name: "Argentina",
                    dial_code: "+54",
                    code: "AR"
                }, {
                    name: "Armenia",
                    dial_code: "+374",
                    code: "AM"
                }, {
                    name: "Aruba",
                    dial_code: "+297",
                    code: "AW"
                }, {
                    name: "Australia",
                    dial_code: "+61",
                    code: "AU"
                }, {
                    name: "Austria",
                    dial_code: "+43",
                    code: "AT"
                }, {
                    name: "Azerbaijan",
                    dial_code: "+994",
                    code: "AZ"
                }, {
                    name: "Bahamas",
                    dial_code: "+1 242",
                    code: "BS"
                }, {
                    name: "Belgium",
                    dial_code: "+32",
                    code: "BE"
                }, {
                    name: "Belize",
                    dial_code: "+501",
                    code: "BZ"
                }, {
                    name: "Benin",
                    dial_code: "+229",
                    code: "BJ"
                }, {
                    name: "Bermuda",
                    dial_code: "+1 441",
                    code: "BM"
                }, {
                    name: "Botswana",
                    dial_code: "+267",
                    code: "BW"
                }, {
                    name: "Brazil",
                    dial_code: "+55",
                    code: "BR"
                }, {
                    name: "Bulgaria",
                    dial_code: "+359",
                    code: "BG"
                }, {
                    name: "Burkina Faso",
                    dial_code: "+226",
                    code: "BF"
                }, {
                    name: "Cambodia",
                    dial_code: "+855",
                    code: "KH"
                },
                {
                    name: "Cameroon",
                    dial_code: "+237",
                    code: "CM"
                }, {
                    name: "Canada",
                    dial_code: "+1",
                    code: "CA"
                }, {
                    name: "Cape Verde",
                    dial_code: "+238",
                    code: "CV"
                }, {
                    name: "Cayman Islands",
                    dial_code: "+ 345",
                    code: "KY"
                }, {
                    name: "Central African Republic",
                    dial_code: "+236",
                    code: "CF"
                }, {
                    name: "Chile",
                    dial_code: "+56",
                    code: "CL"
                }, {
                    name: "China",
                    dial_code: "+86",
                    code: "CN"
                }, , {
                    name: "Colombia",
                    dial_code: "+57",
                    code: "CO"
                }, {
                    name: "Congo",
                    dial_code: "+242",
                    code: "CG"
                }, {
                    name: "Costa Rica",
                    dial_code: "+506",
                    code: "CR"
                }, {
                    name: "Croatia",
                    dial_code: "+385",
                    code: "HR"
                }, {
                    name: "Cuba",
                    dial_code: "+53",
                    code: "CU"
                }, {
                    name: "Czech Republic",
                    dial_code: "+420",
                    code: "CZ"
                }, {
                    name: "Denmark",
                    dial_code: "+45",
                    code: "DK"
                }, {
                    name: "Dominica",
                    dial_code: "+1 767",
                    code: "DM"
                }, {
                    name: "Dominican Republic",
                    dial_code: "+1 849",
                    code: "DO"
                }, {
                    name: "Ecuador",
                    dial_code: "+593",
                    code: "EC"
                }, {
                    name: "Egypt",
                    dial_code: "+20",
                    code: "EG"
                }, {
                    name: "El Salvador",
                    dial_code: "+503",
                    code: "SV"
                }, {
                    name: "Equatorial Guinea",
                    dial_code: "+240",
                    code: "GQ"
                }, {
                    name: "Estonia",
                    dial_code: "+372",
                    code: "EE"
                }, {
                    name: "Ethiopia",
                    dial_code: "+251",
                    code: "ET"
                }, {
                    name: "Fiji",
                    dial_code: "+679",
                    code: "FJ"
                }, {
                    name: "Finland",
                    dial_code: "+358",
                    code: "FI"
                }, {
                    name: "France",
                    dial_code: "+33",
                    code: "FR"
                }, {
                    name: "French Guiana",
                    dial_code: "+594",
                    code: "GF"
                }, {
                    name: "Gabon",
                    dial_code: "+241",
                    code: "GA"
                }, {
                    name: "Gambia",
                    dial_code: "+220",
                    code: "GM"
                }, {
                    name: "Georgia",
                    dial_code: "+995",
                    code: "GE"
                }, {
                    name: "Germany",
                    dial_code: "+49",
                    code: "DE"
                }, {
                    name: "Ghana",
                    dial_code: "+233",
                    code: "GH"
                }, {
                    name: "Gibraltar",
                    dial_code: "+350",
                    code: "GI"
                }, {
                    name: "Greece",
                    dial_code: "+30",
                    code: "GR"
                }, {
                    name: "Greenland",
                    dial_code: "+299",
                    code: "GL"
                }, {
                    name: "Grenada",
                    dial_code: "+1 473",
                    code: "GD"
                }, {
                    name: "Guatemala",
                    dial_code: "+502",
                    code: "GT"
                }, {
                    name: "Guinea",
                    dial_code: "+224",
                    code: "GN"
                }, {
                    name: "Guinea-Bissau",
                    dial_code: "+245",
                    code: "GW"
                }, {
                    name: "Guyana",
                    dial_code: "+595",
                    code: "GY"
                }, {
                    name: "Haiti",
                    dial_code: "+509",
                    code: "HT"
                }, {
                    name: "Honduras",
                    dial_code: "+504",
                    code: "HN"
                }, {
                    name: "Hungary",
                    dial_code: "+36",
                    code: "HU"
                }, {
                    name: "Iceland",
                    dial_code: "+354",
                    code: "IS"
                }, {
                    name: "India",
                    dial_code: "+91",
                    code: "IN"
                }, {
                    name: "Indonesia",
                    dial_code: "+62",
                    code: "ID"
                }, {
                    name: "Iraq",
                    dial_code: "+964",
                    code: "IQ"
                }, {
                    name: "Ireland",
                    dial_code: "+353",
                    code: "IE"
                }, {
                    name: "Israel",
                    dial_code: "+972",
                    code: "IL"
                }, {
                    name: "Italy",
                    dial_code: "+39",
                    code: "IT"
                }, {
                    name: "Jamaica",
                    dial_code: "+1 876",
                    code: "JM"
                }, {
                    name: "Japan",
                    dial_code: "+81",
                    code: "JP"
                }, {
                    name: "Jordan",
                    dial_code: "+962",
                    code: "JO"
                }, {
                    name: "Kazakhstan",
                    dial_code: "+7 7",
                    code: "KZ"
                }, {
                    name: "Kenya",
                    dial_code: "+254",
                    code: "KE"
                }, {
                    name: "Kiribati",
                    dial_code: "+686",
                    code: "KI"
                }, {
                    name: "Kuwait",
                    dial_code: "+965",
                    code: "KW"
                }, {
                    name: "Lesotho",
                    dial_code: "+266",
                    code: "LS"
                }, {
                    name: "Liberia",
                    dial_code: "+231",
                    code: "LR"
                }, {
                    name: "Liechtenstein",
                    dial_code: "+423",
                    code: "LI"
                }, {
                    name: "Lithuania",
                    dial_code: "+370",
                    code: "LT"
                }, {
                    name: "Luxembourg",
                    dial_code: "+352",
                    code: "LU"
                }, {
                    name: "Madagascar",
                    dial_code: "+261",
                    code: "MG"
                }, {
                    name: "Malaysia",
                    dial_code: "+60",
                    code: "MY"
                }, {
                    name: "Maldives",
                    dial_code: "+960",
                    code: "MV"
                }, {
                    name: "Mali",
                    dial_code: "+223",
                    code: "ML"
                }, {
                    name: "Malta",
                    dial_code: "+356",
                    code: "MT"
                }, {
                    name: "Martinique",
                    dial_code: "+596",
                    code: "MQ"
                }, {
                    name: "Mauritania",
                    dial_code: "+222",
                    code: "MR"
                }, {
                    name: "Mexico",
                    dial_code: "+52",
                    code: "MX"
                }, {
                    name: "Monaco",
                    dial_code: "+377",
                    code: "MC"
                }, {
                    name: "Mongolia",
                    dial_code: "+976",
                    code: "MN"
                }, {
                    name: "Montenegro",
                    dial_code: "+382",
                    code: "ME"
                }, {
                    name: "Morocco",
                    dial_code: "+212",
                    code: "MA"
                }, {
                    name: "Myanmar",
                    dial_code: "+95",
                    code: "MM"
                }, {
                    name: "Namibia",
                    dial_code: "+264",
                    code: "NA"
                }, {
                    name: "Nauru",
                    dial_code: "+674",
                    code: "NR"
                }, {
                    name: "Nepal",
                    dial_code: "+977",
                    code: "NP"
                }, {
                    name: "Netherlands",
                    dial_code: "+31",
                    code: "NL"
                }, {
                    name: "New Zealand",
                    dial_code: "+64",
                    code: "NZ"
                }, {
                    name: "Nicaragua",
                    dial_code: "+505",
                    code: "NI"
                }, {
                    name: "Nigeria",
                    dial_code: "+234",
                    code: "NG"
                }, {
                    name: "Norway",
                    dial_code: "+47",
                    code: "NO"
                }, {
                    name: "Oman",
                    dial_code: "+968",
                    code: "OM"
                }, {
                    name: "Pakistan",
                    dial_code: "+92",
                    code: "PK"
                }, {
                    name: "Palau",
                    dial_code: "+680",
                    code: "PW"
                }, {
                    name: "Panama",
                    dial_code: "+507",
                    code: "PA"
                }, {
                    name: "Paraguay",
                    dial_code: "+595",
                    code: "PY"
                }, {
                    name: "Peru",
                    dial_code: "+51",
                    code: "PE"
                }, {
                    name: "Philippines",
                    dial_code: "+63",
                    code: "PH"
                }, {
                    name: "Poland",
                    dial_code: "+48",
                    code: "PL"
                }, {
                    name: "Portugal",
                    dial_code: "+351",
                    code: "PT"
                }, {
                    name: "Puerto Rico",
                    dial_code: "+1 939",
                    code: "PR"
                }, {
                    name: "Qatar",
                    dial_code: "+974",
                    code: "QA"
                }, {
                    name: "Romania",
                    dial_code: "+40",
                    code: "RO"
                }, {
                    name: "Samoa",
                    dial_code: "+685",
                    code: "WS"
                }, {
                    name: "San Marino",
                    dial_code: "+378",
                    code: "SM"
                }, {
                    name: "Saudi Arabia",
                    dial_code: "+966",
                    code: "SA"
                }, {
                    name: "Senegal",
                    dial_code: "+221",
                    code: "SN"
                }, {
                    name: "Serbia",
                    dial_code: "+381",
                    code: "RS"
                }, {
                    name: "Singapore",
                    dial_code: "+65",
                    code: "SG"
                }, {
                    name: "Slovenia",
                    dial_code: "+386",
                    code: "SI"
                }, {
                    name: "Solomon Islands",
                    dial_code: "+677",
                    code: "SB"
                }, {
                    name: "South Africa",
                    dial_code: "+27",
                    code: "ZA"
                }, {
                    name: "Spain",
                    dial_code: "+34",
                    code: "ES"
                }, {
                    name: "Sri Lanka",
                    dial_code: "+94",
                    code: "LK"
                }, {
                    name: "Sudan",
                    dial_code: "+249",
                    code: "SD"
                }, {
                    name: "Swaziland",
                    dial_code: "+268",
                    code: "SZ"
                }, {
                    name: "Sweden",
                    dial_code: "+46",
                    code: "SE"
                }, {
                    name: "Tajikistan",
                    dial_code: "+992",
                    code: "TJ"
                }, {
                    name: "Thailand",
                    dial_code: "+66",
                    code: "TH"
                }, {
                    name: "Togo",
                    dial_code: "+228",
                    code: "TG"
                }, {
                    name: "Tonga",
                    dial_code: "+676",
                    code: "TO"
                }, {
                    name: "Trinidad and Tobago",
                    dial_code: "+1 868",
                    code: "TT"
                }, {
                    name: "Tunisia",
                    dial_code: "+216",
                    code: "TN"
                }, {
                    name: "Turkey",
                    dial_code: "+90",
                    code: "TR"
                }, {
                    name: "Uganda",
                    dial_code: "+256",
                    code: "UG"
                }, {
                    name: "Ukraine",
                    dial_code: "+380",
                    code: "UA"
                }, {
                    name: "United Arab Emirates",
                    dial_code: "+971",
                    code: "AE"
                }, {
                    name: "United Kingdom",
                    dial_code: "+44",
                    code: "GB"
                }, {
                    name: "Uruguay",
                    dial_code: "+598",
                    code: "UY"
                }, {
                    name: "Uzbekistan",
                    dial_code: "+998",
                    code: "UZ"
                }, {
                    name: "Yemen",
                    dial_code: "+967",
                    code: "YE"
                }, {
                    name: "Zambia",
                    dial_code: "+260",
                    code: "ZM"
                }, {
                    name: "Zimbabwe",
                    dial_code: "+263",
                    code: "ZW"
                }, {
                    name: "land Islands",
                    dial_code: "",
                    code: "AX"
                }, {
                    name: "Bolivia, Plurinational State of",
                    dial_code: "+591",
                    code: "BO"
                }, {
                    name: "Cocos (Keeling) Islands",
                    dial_code: "+61",
                    code: "CC"
                }, {
                    name: "Congo, The Democratic Republic of the",
                    dial_code: "+243",
                    code: "CD"
                }, {
                    name: "Hong Kong",
                    dial_code: "+852",
                    code: "HK"
                }, {
                    name: "Iran, Islamic Republic of",
                    dial_code: "+98",
                    code: "IR"
                }, {
                    name: "Jersey",
                    dial_code: "+44",
                    code: "JE"
                }, {
                    name: "Korea, Democratic People's Republic of",
                    dial_code: "+850",
                    code: "KP"
                }, {
                    name: "Korea, Republic of",
                    dial_code: "+82",
                    code: "KR"
                }, {
                    name: "Micronesia, Federated States of",
                    dial_code: "+691",
                    code: "FM"
                }, {
                    name: "Palestinian Territory, Occupied",
                    dial_code: "+970",
                    code: "PS"
                }, {
                    name: "Russia",
                    dial_code: "+7",
                    code: "RU"
                }, {
                    name: "Saint Barthélemy",
                    dial_code: "+590",
                    code: "BL"
                }, {
                    name: "Saint Lucia",
                    dial_code: "+1 758",
                    code: "LC"
                }, {
                    name: "Sao Tome and Principe",
                    dial_code: "+239",
                    code: "ST"
                }, {
                    name: "Somalia",
                    dial_code: "+252",
                    code: "SO"
                }, {
                    name: "Syrian Arab Republic",
                    dial_code: "+963",
                    code: "SY"
                }, {
                    name: "Taiwan, Province of China",
                    dial_code: "+886",
                    code: "TW"
                }, {
                    name: "Tanzania, United Republic of",
                    dial_code: "+255",
                    code: "TZ"
                }, {
                    name: "Venezuela, Bolivarian Republic of",
                    dial_code: "+58",
                    code: "VE"
                }, {
                    name: "Viet Nam",
                    dial_code: "+84",
                    code: "VN"
                }, {
                    name: "Virgin Islands, British",
                    dial_code: "+1 284",
                    code: "VG"
                }, {
                    name: "Virgin Islands, U.S.",
                    dial_code: "+1 340",
                    code: "VI"
                }]

            return {
                all: function () {
                    return countries;
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

        .factory('hotel', ['$http', 'auth', function ($http, auth) {
                // Might use a resource here that returns a JSON array

                var headers = {};
                headers[API.token_name] = auth.getToken();
                var dataHotel = {};

                dataHotel.getHoteles = function () {
                    return($http({
                        url: API.base_url + 'public/hotlistar2',
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

                dataHotel.getHotel = function (idHotel) {
                    return($http({
                        url: API.base_url + 'public/hotobtener/' + idHotel,
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

                return dataHotel;
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
                                    ', Ahora son las  ' + now.getHours() + ':' + (now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes());
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

                    return($http({
                        url: API.base_url + 'loginpublic/diractualizar/' + data.dir_id,
                        method: "PUT",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        datos = data.data;
                        return datos;
                    }).error(function (err) {

                        error = err;
                    })
                            )

                };
                dataUsuario.getPedidos = function (id) {

                    return($http({
                        url: API.base_url + 'loginpublic/pelistarcliente/' + id,
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

                dataUsuario.save = function (id, data) {

                    return($http({
                        url: API.base_url + 'loginpublic/peractualizar/' + id,
                        method: "PUT",
                        data: data,
                        headers: headers

                    }).success(function (data, status, headers, config) {
                        datos = data.data;
                        return datos;
                    }).error(function (err) {

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


                    return($http({
                        url: API.base_url + 'loginpublic/peinsertar',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {


                        return error;

                    })
                            )

                };
                dataPedido.addDetallePedido = function (data) {

                    return($http({
                        url: API.base_url + 'loginpublic/peinsertarcart',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {

                        return error;

                    })
                            )

                };
                dataPedido.addPromoPedido = function (data) {

                    return($http({
                        url: API.base_url + 'loginpublic/peinsertarcartpromo',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {

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


                        return error;

                    })
                            )

                };
                dataCredencial.sigup = function (data) {

                    return($http({
                        url: API.base_url + 'auth/registrar',
                        method: "POST",
                        headers: headers,
                        data: data

                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {


                        return error;

                    })
                            )

                };
                dataCredencial.recovery = function (data) {
                    return($http({
                        url: API.base_url + 'auth/recuperar' + data,
                        method: "GET",
                        headers: headers
                    }).success(function (data, status, headers, config) {

                        return data;
                    }).error(function (error, status) {
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



        
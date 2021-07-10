angular
    .module("pedido.service", [])
    .factory('pedido', ['$http', 'auth', function($http, auth) {
        // Might use a resource here that returns a JSON array

        var headers = {};
        headers[API.token_name] = auth.getToken();
        var dataPedido = {};


        dataPedido.setEncabezado = function(data) {


            return ($http({
                url: API.base_url + 'loginpublic/peinsertar',
                method: "POST",
                headers: headers,
                data: data

            }).success(function(data, status, headers, config) {

                return data;
            }).error(function(error, status) {


                return error;

            }));

        };
        dataPedido.addDetallePedido = function(data) {

            return ($http({
                url: API.base_url + 'loginpublic/peinsertarcart',
                method: "POST",
                headers: headers,
                data: data

            }).success(function(data, status, headers, config) {

                return data;
            }).error(function(error, status) {

                return error;

            }))

        };
        dataPedido.addPromoPedido = function(data) {

            return ($http({
                url: API.base_url + 'loginpublic/peinsertarcartpromo',
                method: "POST",
                headers: headers,
                data: data

            }).success(function(data, status, headers, config) {

                return data;
            }).error(function(error, status) {

                return error;

            }))

        };
        dataPedido.updEncabezado = function(id, data) {


            return ($http({
                url: API.base_url + 'pedidoencabezado/actualizar/' + id,
                method: "PUT",
                headers: headers,
                data: data

            }).success(function(data, status, headers, config) {

                return data;
            }).error(function(error, status) {


                return error;

            }));

        };
        dataPedido.getEncabezado = function(id) {


            return ($http({
                url: API.base_url + 'pedidoencabezado/obtener/' + id,
                method: "GET",
                headers: headers

            }).success(function(data, status, headers, config) {
                return data;
            }).error(function(error, status) {
                return error;

            }));

        };


        return dataPedido;
    }]);
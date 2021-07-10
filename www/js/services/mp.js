angular
    .module("mp.service", [])
    .factory('mp', ['$http', 'auth', function($http, auth) {
        // Might use a resource here that returns a JSON array

        var headers = {};
        headers[API.token_name] = auth.getToken();
        var dataCategoria = {};

        dataCategoria.getUrl = function($idPedido) {
            return ($http({
                url: API.base_url + 'mp/getItems/' + $idPedido,
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {

                return data;
            }).error(function(err) {
                error = err;
            }));

        };


        return dataCategoria;
    }]);
angular
.module("categoria.service", [])
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
}]);
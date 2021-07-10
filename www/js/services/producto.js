angular
.module("producto.service", [])
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
}]);
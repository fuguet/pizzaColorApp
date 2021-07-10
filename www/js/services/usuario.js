angular
.module("usuario.service", [])
.factory('usuario', ['$http', 'auth', function ($http, auth) {
    // Might use a resource here that returns a JSON array
    
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
          
            datos = data.data;
            return datos;
        }).error(function (err) {

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
}]);

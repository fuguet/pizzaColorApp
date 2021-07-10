angular
.module("credenciales.service", [])
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
            url: API.base_url + 'auth/recuperar/' + data,
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
}]);

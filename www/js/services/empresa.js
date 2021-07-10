angular
    .module("empresa.service", [])
    .factory('empresa', ['$http', 'auth', function($http, auth) {
        // Might use a resource here that returns a JSON array

        var headers = {};
        headers[API.token_name] = auth.getToken();
        var dataEmpresa = {};

        dataEmpresa.getSucursal = function() {
            return ($http({
                url: API.base_url + 'public/sucobtener/4',
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {
                datos = data.data;
                return datos;
            }).error(function(err) {
                error = err;
            }));

        };

        dataEmpresa.getHorarios = function() {
            return ($http({
                url: API.base_url + 'public/dhlistar/4',
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {
                datos = data.data;
                return datos;
            }).error(function(err) {
                error = err;
            }))

        };

        dataEmpresa.getTelefonos = function() {
            return ($http({
                url: API.base_url + 'public/dclistartelsuc/4',
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {
                datos = data.data;
                return datos;
            }).error(function(err) {
                error = err;
            }))

        };

        dataEmpresa.getDatosContacto = function() {
            return ($http({
                url: API.base_url + 'public/dcobtenersuc/4',
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {
                datos = data.data;
                return datos;
            }).error(function(err) {
                error = err;
            }))
        };

        dataEmpresa.getParametros = function() {
            return ($http({
                url: API.base_url + 'public/parobtener/4',
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {
                datos = data.data;
                return datos;
            }).error(function(err) {
                error = err;
            }))
        };

        dataEmpresa.getAderezos = function() {
            return ($http({
                url: API.base_url + 'public/adelistar1',
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {

                datos = data;
                return datos;
            }).error(function(err) {

                error = err;
            }))
        };





        return dataEmpresa;
    }]);
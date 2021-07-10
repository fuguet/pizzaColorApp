angular
    .module("hotel.service", [])
    .factory('hotel', ['$http', 'auth', function($http, auth) {
        // Might use a resource here that returns a JSON array

        var headers = {};
        headers[API.token_name] = auth.getToken();
        var dataHotel = {};

        dataHotel.getHoteles = function() {
            return ($http({
                url: API.base_url + 'public/hotlistar2',
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {
                datos = data.data;
                return datos;
            }).error(function(err) {
                error = err;
            }))

        };

        dataHotel.getHotel = function(idHotel) {
            return ($http({
                url: API.base_url + 'public/hotobtener/' + idHotel,
                method: "GET",
                headers: headers
            }).success(function(data, status, headers, config) {
                datos = data.data;
                return datos;

            }).error(function(err) {
                error = err;
            }))

        };

        return dataHotel;
    }]);
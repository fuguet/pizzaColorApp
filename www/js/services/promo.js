angular
.module("promo.service", [])
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
                );

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
                );

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
                );

    };

    return dataPromo;
}]);
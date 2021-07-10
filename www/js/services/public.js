angular
.module("public.service", [])
.factory('publicidad', ['$http', function ($http) {
    // Might use a resource here that returns a JSON array

    var dataPub = {};

    dataPub.getPub = function () {
        return($http({
            url: API.base_url + 'public/publistarslider',
            method: "GET"
        }).success(function (data, status, headers, config) {
            datos = data.data;
            return datos;
        }).error(function (err) {
            error = err;
        })
                );

    };
 
     return dataPub;
}]);
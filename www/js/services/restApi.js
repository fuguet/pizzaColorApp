angular
.module("restApi.service", [])
.service('restApi', ['$http', 'auth', function ($http, auth) {


    this.call = function (config) {
        var headers = {};
        headers[API.token_name] = auth.getToken();
//                                                                  headers['Content-Type'] = 'application/x-www-form-urlencoded';

        var http_config = {
            method: config.method,
            url: API.base_url + config.url,
            data: typeof (config.data) === 'undefined' ? null : config.data,
            headers: headers
        };
        $http(http_config).then(function successCallback(response) {

            config.response(response.data);
        }, function errorCallback(response) {
            switch (response.status) {
                case 401: // No autorizado
                    auth.logout();
                    break;
                case 422: // Validación
                    config.validationError(response.data);
                    break;
                default:
                    config.error(response);
                    console.log(response.statusText);
                    break;
            }
        });
    };
}]);
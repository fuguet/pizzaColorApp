angular
    .module("externalApps.service", [])
    .factory('externalAppsService', ['$window', function($window) {
        // Might use a resource here that returns a JSON array




        var service = {
            openExternalUrl: openExternalUrl,
            openExternalUrlself: openExternalUrlself,
            openMapsApp: openMapsApp
        };
        return service;


        function openExternalUrl(url) {
            $window.open(url, '_system', 'location=yes');
            return false;
        }


        function openExternalUrlself(url) {
            return $window.open(url, '_self', 'hardwareback=yes');

        }

        function openMapsApp(coords) {

            var q;
            if (ionic.Platform.isAndroid()) {
                q = 'geo:' + coords + '?q=' + coords;
            } else {
                q = 'maps://maps.apple.com/?q=' + coords;
            }
            q = q.replace(' ', '');
            $window.location.href = q;
            return q;
        }







    }]);
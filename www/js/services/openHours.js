angular
    .module("openHours.service", [])
    .factory('openHours', ['$http', 'auth', 'empresa', function($http, auth, empresa) {
        // Might use a resource here that returns a JSON array

        var headers = {};
        headers[API.token_name] = auth.getToken();
        var dataOpen = {};
        dataOpen.isOpen = function(openHours) {

            var now = (new Date());
            var day = now.getDay();
            var message = '';
            var response = {};
            var date = getShiftedDate(now);
            var fixedTime = date.getTime();
            // var fixedTime = now.getTime();

            var open;

            for (var i = 0; i < openHours.length; i++) {
                open = openHours[i];
                if (parseInt(open.dh_diaSemana) !== day) {
                    continue;
                }

                var ha = (new Date());
                var hc = (new Date());
                var hora = open.dh_horaApertura.substring(0, 2);
                var minutos = open.dh_horaApertura.substring(3, 5);
                var hora1 = open.dh_horaCierre.substring(0, 2);
                var minutos1 = open.dh_horaCierre.substring(3, 5);
                ha.setHours(parseInt(hora), parseInt(minutos), 1);
                hc.setHours(parseInt(hora1), parseInt(minutos1), 1);
                // segundo horario
                var ha2 = (new Date());
                var hc2 = (new Date());
                var hora = open.dh_horaApertura2.substring(0, 2);
                var minutos = open.dh_horaApertura2.substring(3, 5);
                var hora1 = open.dh_horaCierre2.substring(0, 2);
                var minutos1 = open.dh_horaCierre2.substring(3, 5);
                ha2.setHours(parseInt(hora), parseInt(minutos), 1);
                hc2.setHours(parseInt(hora1), parseInt(minutos1), 1);






                var openAt = getShiftedDate(ha).getTime();
                var closeAt = getShiftedDate(hc).getTime();
                var openAt2 = getShiftedDate(ha2).getTime();
                var closeAt2 = getShiftedDate(hc2).getTime();

                if ((fixedTime >= openAt && fixedTime <= closeAt) || (fixedTime >= openAt2 && fixedTime <= closeAt2)) {
                    response.valor = true;
                    return response;
                } else {

                    response.message =
                        'EL delivery esta abierto de: ' +
                        open.dh_horaApertura + ' a  ' +
                        open.dh_horaCierre +
                        " y de \n " +
                        open.dh_horaApertura2 + ' a  ' +
                        open.dh_horaCierre2 +
                        ', Ahora son las  ' + now.getHours() + ':' + (now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes());
                    response.valor = false;
                    return response;
                }
            }

            response.valor = false;

            return response;

        };

        function getShiftedDate(now, shift) {
            shift = shift || 0;

            var hours;

            if (shift > 0) {
                hours = now.getUTCHours() + shift;
            } else {
                hours = now.getHours();
            }

            var minutes = now.getMinutes();
            return (new Date(2015, 0, 1, hours, minutes, 0));
        };




        return dataOpen;
    }]);
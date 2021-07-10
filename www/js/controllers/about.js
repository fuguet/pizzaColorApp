angular.module("about", [])
    .controller("AboutCtrl", function(
        $scope,
        $state,
        empresa,
        openHours,
        externalAppsService
    ) {
        // working hours
        $scope.horarioCorrido = true;
        $scope.dias = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
        ];
        //            $scope.days = [
        //                {
        //                    'name': 'Monday',
        //                    'hours': '02:00pm - 10:00pm'
        //                },
        //                {
        //                    'name': 'Tuesday',
        //                    'hours': '02:00pm - 10:00pm'
        //                },
        //                {
        //                    'name': 'Wednesday',
        //                    'hours': '02:00pm - 10:00pm'
        //                },
        //                {
        //                    'name': 'Thursday',
        //                    'hours': '02:00pm - 10:00pm'
        //                },
        //                {
        //                    'name': 'Friday',
        //                    'hours': '02:00pm - 10:00pm'
        //                },
        //                {
        //                    'name': 'Saturday',
        //                    'hours': '05:00pm - 10:00pm'
        //                },
        //                {
        //                    'name': 'Sunday',
        //                    'hours': '05:00pm - 10:00pm'
        //                }
        //            ];

        empresa.getHorarios().success(function(response) {
            $scope.days = response.data;
            $scope.horarioCorrido = $scope.days[0].dh_horaApertura === $scope.days[0].dh_horaApertura2;
        });
        empresa.getTelefonos().success(function(response) {
            $scope.tel = response.data;
        });
        empresa.getDatosContacto().success(function(response) {
            $scope.contac = response.data;
        });
        $scope.openInsta = function() {
            externalAppsService.openExternalUrl("https://www.instagram.com/pizzacolordeliveryexpress");
        };
        $scope.openFacebook = function() {
            externalAppsService.openExternalUrl($scope.contac.dcon_facebook);
        };

        $scope.openPage = function() {
            externalAppsService.openExternalUrl($scope.contac.dcon_website);
        };

        $scope.openTwitterPage = function() {
            externalAppsService.openExternalUrl($scope.contac.dcon_twitter);
        };
    });
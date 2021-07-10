angular
    .module("home", [])
    .controller("HomeCtrl", function(
        $scope,
        $ionicPopup,
        $ionicSlideBoxDelegate,
        $ionicSideMenuDelegate,
        $state,
        $rootScope,
        promo,
        categoria,
        empresa,
        publicidad,
        openHours,
        sharedUtils
    ) {
        // get all categories from service
        // $rootScope.BrowserNetworkType = "BROWSER";
        var idSubcriber;

        empresa.getHorarios().success(function(response) {
            $scope.days = response.data;
            var respuesta = openHours.isOpen($scope.days);
            $rootScope.open = respuesta.valor;
            $scope.message = respuesta.message ? respuesta.message : "Estamos Atendiendo";
            if (!$rootScope.open) sharedUtils.showAlert("Atencion", respuesta.message);
        });
        incialite = function() {
            sharedUtils.showLoading();

            categoria.getCategorias().success(function(response) {
                $scope.categories = response.data;
                promo.getPromos().success(function(response) {
                    $scope.promos = response.data;
                    sharedUtils.hideLoading();
                    publicidad.getPub().success(function(response) {
                        $scope.publicidad = response.data;
                        sharedUtils.hideLoading();
                    });
                });
            });
        };

        //            $scope.slides = [];
        incialite();
        //actualizar slider
        $scope.updateSlider = function() {
            $ionicSlideBoxDelegate.update(); //or just return the function
        };
    });
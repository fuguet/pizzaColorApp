angular
    .module("auth", [])
    .controller("AuthCtrl", function(
        $scope,
        $rootScope,
        $ionicHistory,
        sharedUtils,
        $state,
        $stateParams,
        $ionicSideMenuDelegate,
        auth,
        credenciales,
        Countrie,
        $filter
    ) {
        $scope.selectedCountry = {};

        // hide back butotn in next view
        $ionicHistory.nextViewOptions({
            disableBack: true,
        });
        if (auth.hasToken()) {
            $state.go("home", {}, { location: "replace" });
        }

        $scope.user = {
            email: $stateParams.correo,
            password: $stateParams.password,
        };
        $scope.countries = Countrie.all();
        //chekear si ya esta logeado

        $scope.login = function(formName, cred) {
            if (formName.$valid) {
                // Check if the form data is valid or not
                var data = {
                    Correo: cred.email,
                    Password: cred.password,
                };
                sharedUtils.showLoading();
                credenciales
                    .login(data)
                    .success(function(r) {
                        if (r.response) {
                            auth.setToken(r.result);
                            $ionicHistory.nextViewOptions({
                                historyRoot: true,
                            });
                            $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                            sharedUtils.hideLoading();
                            $state.go("home", {}, { location: "replace" });
                        } else {
                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atencion", r.message);
                        }
                    })
                    .error(function(err) {
                        sharedUtils.hideLoading();
                        sharedUtils.showAlert("Atencion", err.message);
                    });
            } else {
                sharedUtils.showAlert("Atencion", "Los datos no son validos");
            }
        };

        $scope.sigup = function(formName, user, passwordValidator) {
            var numeroMovil =
                user.Pais.dial_code + user.per_prefijo + user.per_celular;
            var data = {};
            data.per_email = user.per_email;
            data.per_password = user.per_password;
            data.per_celular = numeroMovil;
            data.per_nacionalidad = user.Pais.name;
            data.per_nombre = user.per_nombre;

            if (formName.$valid) {
                // Check if the form data is valid or not

                if (passwordValidator == $scope.user.per_password) {
                    sharedUtils.showLoading();
                    credenciales
                        .sigup(data)
                        .success(function(r) {
                            if (r.response) {
                                $ionicHistory.nextViewOptions({
                                    historyRoot: true,
                                });
                                $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                                sharedUtils.hideLoading();
                                $state.go(
                                    "login", { correo: user.per_email, password: user.per_password }, { location: "replace" }
                                );
                            } else {
                                sharedUtils.hideLoading();
                                sharedUtils.showAlert("Atención", r.message);
                            }
                        })
                        .error(function(err) {
                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atención", err.message);
                        });
                } else {
                    sharedUtils.showAlert(
                        "Atencion",
                        "El password no coincide ingrese nuevamente"
                    );
                }
            } else {
                sharedUtils.showAlert("Atención", "Los datos no son validos");
            }
        };

        $scope.recovery = function(formName, user) {
            var data = {};
            data.per_email = user.per_email;

            if (formName.$valid) {
                // Check if the form data is valid or not
                sharedUtils.showLoading();
                credenciales
                    .recovery(data.per_email)
                    .success(function(r) {
                        if (r.response) {
                            $ionicHistory.nextViewOptions({
                                historyRoot: true,
                            });
                            $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atención", r.message);
                            $state.go(
                                "login", { correo: user.per_email, password: "" }, { location: "replace" }
                            );
                        } else {
                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atención", r.message);
                        }
                    })
                    .error(function(err) {
                        sharedUtils.hideLoading();
                        sharedUtils.showAlert("Atención", err.message);
                    });
            } else {
                sharedUtils.showAlert("Atención", "Los datos no son validos");
            }
        };

        $scope.loginFb = function() {
            //Facebook Login
        };
        $scope.loginGmail = function() {
            //Gmail Login
        };
    });
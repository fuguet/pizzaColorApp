angular.module("userAddress", [])
    .controller("userAddressCtrl", function(
        $scope,
        $ionicPopup,
        $ionicModal,
        $state,
        auth,
        usuario,
        sharedUtils,
        $window,
        hotel
    ) {
        //$scope.usuario = {};
        $scope.addresses = [];
        $scope.usuario = {};
        $scope.direccion = {};
        $scope.newHotel = {};
        $scope.editHotel = {
            hoteles: [
                { hotel_id: "0", hotel_nombre: "Ninguno de la lista", selected: false },
            ],
            hotel: null,
        };

        $ionicModal
            .fromTemplateUrl("templates/modaladresshotel.html", {
                scope: $scope,
                animation: "slide-in-up",
            })
            .then(function(modal) {
                $scope.modal = modal;
            });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.editHotel.hotel = null;
            $scope.newHotel = {};
        };
        isLogged = function() {
            if (auth.hasToken()) {
                sharedUtils.showLoading();
                $scope.usuario = auth.datosUsuario();
                usuario
                    .getDirecciones($scope.usuario.id)
                    .success(function(response) {
                        $scope.addresses = response;

                        sharedUtils.hideLoading();
                    })
                    .error(function(err) {
                        sharedUtils.hideLoading();
                    });
                hotel
                    .getHoteles()
                    .success(function(response) {
                        $scope.editHotel.hoteles = $scope.editHotel.hoteles.concat(
                            response.data
                        );

                        sharedUtils.hideLoading();
                    })
                    .error(function(err) {
                        sharedUtils.hideLoading();
                    });
            } else {
                $state.go("login", {}, { location: "replace" });
            }
        };
        //inicilizacion
        isLogged();
        $scope.addAdressHotel = function(formName, res) {
            var direccion = {};
            if ($scope.editHotel.hotel != null) {
                if (formName.$valid) {
                    if ($scope.editHotel.hotel.hotel_id == 0) {
                        direccion.dir_nombre = res.dir_nombre;
                        direccion.dir_telefonoFijo = 0;
                        direccion.dir_direccion = res.dir_direccion;
                        direccion.dir_idHotel = 0;
                        direccion.dir_aclaracion = res.dir_aclaracion;
                        direccion.dir_nombreHotel = res.dir_nombre;
                        direccion.dir_habitacion = res.dir_habitacion;
                        direccion.dir_tipodireccion = 2; //tipo 2 Hotel 1 Particular
                        direccion.dir_idPersona = $scope.usuario.id;
                    }
                    if ($scope.editHotel.hotel.hotel_id != 0) {
                        direccion.dir_nombre = $scope.editHotel.hotel.hotel_nombre;
                        direccion.dir_telefonoFijo = $scope.editHotel.hotel.hotel_telefono;
                        direccion.dir_direccion = $scope.editHotel.hotel.hotel_direccion;
                        direccion.dir_idHotel = $scope.editHotel.hotel.hotel_id;
                        direccion.dir_aclaracion = res.dir_aclaracion;
                        direccion.dir_nombreHotel = $scope.editHotel.hotel.hotel_nombre;
                        direccion.dir_habitacion = res.dir_habitacion;
                        direccion.dir_tipoDireccion = 2; //tipo 2 Hotel 1 Particular
                        direccion.dir_idPersona = $scope.usuario.id;
                    }

                    direccion;

                    usuario
                        .addDireccion(direccion)
                        .success(function(res) {
                            if (res.response) {
                                usuario
                                    .getDirecciones($scope.usuario.id)
                                    .success(function(response) {
                                        $scope.addresses = response;
                                    });
                                $scope.closeModal();
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: "Atencion",
                                    template: res.message,
                                });
                            }
                        })
                        .error(function(err) {
                            var alertPopup = $ionicPopup.alert({
                                title: "Atencion",
                                template: err.message,
                            });
                        });
                } else {
                    sharedUtils.showAlert(
                        "Atencion",
                        "Debe completar los campos obligatorios"
                    );
                }
            } else {
                sharedUtils.showAlert("Atencion", "Debe Seleccionar una Opcion");
            }
        };
        createAdress = function(res) {
            var direccion = {};
            if (res != null) {
                direccion.dir_nombre = res.dir_nombre;
                direccion.dir_telefonoFijo = parseInt(res.dir_telefonoFijo) || 0;
                direccion.dir_direccion = res.dir_direccion;
                direccion.dir_aclaracion = res.dir_aclaracion;
                direccion.dir_tipoDireccion = 1; //tipo 2 Hotel 1 Particular
                if (res.dir_idPersona) {
                    usuario
                        .updateDireccion(res)
                        .success(function(res) {
                            if (res.response) {
                                usuario
                                    .getDirecciones($scope.usuario.id)
                                    .success(function(response) {
                                        $scope.addresses = response;
                                    });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: "Atencion",
                                    template: res.message,
                                });
                            }
                        })
                        .error(function(err) {
                            var alertPopup = $ionicPopup.alert({
                                title: "Atencion",
                                template: err.message,
                            });
                        });
                } else {
                    direccion.dir_idPersona = $scope.usuario.id;
                    usuario
                        .addDireccion(direccion)
                        .success(function(res) {
                            if (res.response) {
                                usuario
                                    .getDirecciones($scope.usuario.id)
                                    .success(function(response) {
                                        $scope.addresses = response;
                                    });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: "Atencion",
                                    template: res.message,
                                });
                            }
                        })
                        .error(function(err) {
                            var alertPopup = $ionicPopup.alert({
                                title: "Atencion",
                                template: err.message,
                            });
                        });
                }
            }
        };
        $scope.addManipulation = function(edit_val) {
            // Takes care of address add and edit ie Address Manipulator
            if (edit_val != null) {
                $scope.data = edit_val; // For editing address
                // poner al telefono como un numero.
                var title = "Editar Direccion";
                var sub_title = "Editar su Domicilio";
            } else {
                $scope.data = {}; // For adding new address
                var title = "Agregar Domicilio";
                var sub_title = "Agregar un nuevo Domicilio";
            }
            // An elaborate, custom popup
            var addressPopup = $ionicPopup.show({
                template: '<input type="text" maxlength="20"  placeholder="Nombre Lugar"  ng-model="data.dir_nombre"> <br/> ' +
                    '<input type="text"   maxlength="30" placeholder="Direccion" ng-model="data.dir_direccion"> <br/> ' +
                    '<textarea placeholder="Aclaraciones" maxlength="60" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ' +
                    '<input type="text" maxlength="12" placeholder="Telefono Fijo (Opcional)" ng-model="data.dir_telefonoFijo"  valid-number>',
                title: title,
                subTitle: sub_title,
                scope: $scope,
                buttons: [
                    { text: "Cancelar" },
                    {
                        text: "<b>Guardar</b>",
                        type: "button-positive",
                        onTap: function(e) {
                            if (!$scope.data.dir_nombre || !$scope.data.dir_direccion) {
                                e.preventDefault(); //don't allow the user to close unless he enters full details
                            } else {
                                return $scope.data;
                            }
                        },
                    },
                ],
            });
            addressPopup.then(function(res) {
                createAdress(res);
            });
        };
        $scope.addManipulation2 = function(edit_val) {
            // Takes care of address add and edit ie Address Manipulator

            $scope.openModal();
        };
        $scope.addManipulation3 = function(edit_val) {
            var title = "Editar hotel";
            var sub_title = "Editar su hotel";
            $scope.data = edit_val; // For editing address
            // An elaborate, custom popup
            var addressPopup = $ionicPopup.show({
                template: '<input type="text" maxlength="20"  placeholder="Nombre Lugar"  ng-model="data.dir_nombre" ng-disabled="true"> <br/> ' +
                    '<input type="text"  maxlength="30" placeholder="Direccion" ng-model="data.dir_direccion" ng-disabled="true"> <br/> ' +
                    '<input type="text"  maxlength="20" placeholder="Habitacion o Departamento" ng-model="data.dir_habitacion" > <br/>' +
                    '<textarea maxlength="60" placeholder="Aclaraciones" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ',
                title: title,
                subTitle: sub_title,
                scope: $scope,
                buttons: [
                    { text: "Cancelar" },
                    {
                        text: "<b>Guardar</b>",
                        type: "button-positive",
                        onTap: function(e) {
                            if (!$scope.data.dir_nombre ||
                                !$scope.data.dir_direccion ||
                                !$scope.data.dir_habitacion
                            ) {
                                e.preventDefault(); //don't allow the user to close unless he enters full details
                            } else {
                                return $scope.data;
                            }
                        },
                    },
                ],
            });
        };
        $scope.deleteAddress = function(del_id) {
            var confirmPopup = $ionicPopup.confirm({
                title: "Eliminar Domicilio",
                template: "Esta seguro de eliminar este domicilio",
                buttons: [
                    { text: "No", type: "button-stable" },
                    {
                        text: "Si",
                        type: "button-assertive",
                        onTap: function() {
                            return del_id;
                        },
                    },
                ],
            });
            confirmPopup.then(function(res) {
                if (res) {
                    usuario.deleteDireccion(res).success(function(r) {
                        if (r.response) {
                            usuario
                                .getDirecciones($scope.usuario.id)
                                .success(function(response) {
                                    $scope.addresses = response;
                                });
                        }
                    });
                    //eliminar direccion de la base
                }
            });
        };
    });
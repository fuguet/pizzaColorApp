angular
  .module("checkout", [])
  // Checkout controller
  .controller("CheckoutCtrl", function (
    $scope,
    $state,
    $ionicPopup,
    $window,
    $ionicSideMenuDelegate,
    $ionicHistory,
    $ionicModal,
    auth,
    usuario,
    sharedCartService,
    pedido,
    empresa,
    sharedUtils,
    hotel,
    $stateParams
  ) {
    $scope.addresses = [];
    $scope.usuario = {};
    $scope.parametros = {};
    $scope.data = {
      // payment: "PagoOnline",
    };
    $scope.newHotel = {};
    $scope.editHotel = {
      hoteles: [
        {hotel_id: "0", hotel_nombre: "Ninguno de la lista", selected: false},
      ],
      hotel: null,
    };
    var userIdNotification = API.userId || "";

    isLogged = function () {
      if (auth.hasToken()) {
        $scope.usuario = auth.datosUsuario();
      } else {
        $ionicHistory.nextViewOptions({
          historyRoot: true,
        });
        $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
        $state.go("login", {}, {location: "replace"});
      }
    };
    //inicilizacion
    isLogged();
    $ionicModal
      .fromTemplateUrl("templates/modaladresshotel.html", {
        scope: $scope,
        animation: "slide-in-up",
      })
      .then(function (modal) {
        $scope.modal = modal;
      });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
      $scope.editHotel.hotel = null;
      $scope.newHotel = {};
    };
    hotel
      .getHoteles()
      .success(function (response) {
        $scope.editHotel.hoteles = $scope.editHotel.hoteles.concat(
          response.data
        );

        sharedUtils.hideLoading();
      })
      .error(function (err) {
        sharedUtils.hideLoading();
      });
    empresa.getParametros().success(function (response) {
      $scope.parametros = response.data;
    });
    usuario.getDirecciones($scope.usuario.id).success(function (response) {
      $scope.addresses = response;
    });
    $scope.payments = [
      {id: "PagoOnline", name: "Pago Online", disable: $stateParams.DisablePago},
      {id: "Efectivo", name: "Efectivo ", disable: false},
    ];
    $scope.total = sharedCartService.total_amount;
    $scope.addManipulation = function () {
      // Takes care of address add and edit ie Address Manipulator

      // For adding new address
      var title = "Agregar Domicilio";
      var sub_title = "Agregar un nuevo Domicilio";
      // An elaborate, custom popup
      var addressPopup = $ionicPopup.show({
        template: '<input type="text"  maxlength="20"  placeholder="Nombre Lugar"  ng-model="data.dir_nombre"> <br/> ' +
          '<input type="text"   maxlength="30" placeholder="Direccion" ng-model="data.dir_direccion"> <br/> ' +
          '<textarea maxlength="60"  placeholder="Aclaraciones" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ' +
          '<input type="text"  maxlength="12" placeholder="Telefono Fijo (Opcional)" ng-model="data.dir_telefonoFijo" valid-number>',
        title: title,
        subTitle: sub_title,
        scope: $scope,
        buttons: [
          {text: "Cerrar"},
          {
            text: "<b>Guardar</b>",
            type: "button-positive",
            onTap: function (e) {
              if (!$scope.data.dir_nombre || !$scope.data.dir_direccion) {
                e.preventDefault(); //don't allow the user to close unless he enters full details
              } else {
                return $scope.data;
              }
            },
          },
        ],
      });
      addressPopup.then(function (res) {
        createAdress(res);
      });
    };
    $scope.addManipulation2 = function (edit_val) {
      // Takes care of address add and edit ie Address Manipulator

      $scope.openModal();
    };
    $scope.addAdressHotel = function (formName, res) {
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
            .success(function (res) {
              if (res.response) {
                usuario
                  .getDirecciones($scope.usuario.id)
                  .success(function (response) {
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
            .error(function (err) {
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
    createAdress = function (res) {
      var direccion = {};
      if (res != null) {
        direccion.dir_nombre = res.dir_nombre;
        direccion.dir_telefonoFijo = res.dir_telefonoFijo;
        direccion.dir_direccion = res.dir_direccion;
        direccion.dir_aclaracion = res.dir_aclaracion;
        direccion.dir_tipoDireccion = 1; //tipo 2 Hotel 1 Particular
        if (res.dir_idPersona) {
          //par actualizar
        } else {
          direccion.dir_idPersona = $scope.usuario.id;
          usuario
            .addDireccion(direccion)
            .success(function (res) {
              if (res.response) {
                usuario
                  .getDirecciones($scope.usuario.id)
                  .success(function (response) {
                    $scope.addresses = response;
                    $scope.data.address = $scope.addresses[0];
                  });
              } else {
                var alertPopup = $ionicPopup.alert({
                  title: "Atencion",
                  template: res.message,
                });
              }
            })
            .error(function (err) {
              var alertPopup = $ionicPopup.alert({
                title: "Atencion",
                template: err.message,
              });
            });
        }
      }
    };
    $scope.pay = function () {
      var payment = $scope.data.payment;
      var address = $scope.data.address;
      var pedidoId = '';

      if (sharedCartService.total_qty < 1 && sharedCartService.total_qty < 1) {
        $ionicHistory.nextViewOptions({
          historyRoot: true,
        });
        $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
        $state.go("home", {}, {location: "replace"});
      } else {
        if (!(typeof payment === "undefined") &&
          !(typeof address === "undefined")
        ) {
          var pedidoEncabezado = {};
          pedidoEncabezado.pe_idCliente = address.dir_idPersona;
          pedidoEncabezado.pe_aclaraciones = sharedCartService.aclaraciones;
          pedidoEncabezado.pe_total = sharedCartService.total_amount;
          pedidoEncabezado.pe_idPersona = address.dir_idPersona;
          pedidoEncabezado.pe_cli_tel = $scope.usuario.celular;
          pedidoEncabezado.pe_idDireccion = address.dir_id;
          pedidoEncabezado.pe_medioPago = payment;
          pedidoEncabezado.pe_idEstado = 1;
          pedidoEncabezado.pe_resumen = sharedCartService.generarResumen();
          pedidoEncabezado.pe_aderezos = sharedCartService.aderezos;
          pedidoEncabezado.pe_cantAderezos = sharedCartService.qtyAderezo;
          pedidoEncabezado.pe_idNotification = userIdNotification;

          sharedUtils.showLoading();
          pedido
            .setEncabezado(pedidoEncabezado)
            .success(function (res) {
              if (res.response) {
                var idencabezado = res.result;
                pedidoId = res.result;
                var detalle = {};
                detalle.idPedidoEncabezado = res.result;
                detalle.cart = sharedCartService.cart;
                var promoPedido = {};
                promoPedido.idPedidoEncabezado = res.result;
                promoPedido.cart = sharedCartService.cartPromo;
                pedido
                  .addDetallePedido(detalle)
                  .success(function (res) {
                    if (res.response) {
                      sharedCartService.cleanCart();
                      sharedCartService.recalcularTotales();
                      pedido
                        .addPromoPedido(promoPedido)
                        .success(function (res) {
                          if (res.response) {
                            sharedCartService.cleanCartPromo();
                            sharedCartService.recalcularTotales();
                            sharedUtils.hideLoading();

                            // $ionicHistory.nextViewOptions({
                            //     historyRoot: true,
                            // });
                            // $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                            //si se paga con tarjeta se genera una nueva preferencia de pago
                            if (payment == "PagoOnline") {
                              $ionicPopup.alert({
                                title: "Atencion",
                                template: "El pedido se genero correctamente. Pague a travez del link de Mercado Pago",
                              });
                              $ionicHistory.nextViewOptions({
                                historyRoot: true,
                                disableBack: true
                              });
                              $ionicSideMenuDelegate.canDragContent(false);
                              $state.go(
                                "pago", {
                                  'idPedido': pedidoId
                                }, {location: "replace"}
                              );
                            } else {

                              $ionicPopup.alert({
                                title: "Atencion",
                                template: "El pedido se genero correctamente. Pague en destino",
                              });
                              $ionicHistory.nextViewOptions({
                                historyRoot: true,
                                disableBack: true
                              });
                              $ionicSideMenuDelegate.canDragContent(true);

                              $state.go(
                                "last_orders", {}, {location: "replace"}
                              );
                            }
                          } else {
                            sharedUtils.hideLoading();
                          }
                          //
                        })
                        .error(function (err) {
                          sharedUtils.hideLoading();
                          var alertPopup = $ionicPopup.alert({
                            title: "Atencion",
                            template: "No se pudo pedir algunas promos intente mas tarde nuevamente",
                          });
                        });
                    } else {
                      sharedUtils.hideLoading();
                    }
                  })
                  .error(function (err) {
                    sharedUtils.hideLoading();
                    var alertPopup = $ionicPopup.alert({
                      title: "Atencion",
                      template: "No se pudo pedir algunos productos intente mas tarde nuevamente",
                    });
                  });
              } else {
                sharedUtils.hideLoading();
                var alertPopup = $ionicPopup.alert({
                  title: "Atencion",
                  template: res.message,
                });
              }
            })
            .error(function (err) {
              sharedUtils.hideLoading();
              var alertPopup = $ionicPopup.alert({
                title: "Atencion",
                template: err.message,
              });
            });
        } else {
          var alertPopup = $ionicPopup.alert({
            title: "Atencion",
            template: "Debe elegir una Direccion y un Medio de Pago",
          });
        }
      }
    };
  });

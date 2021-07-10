angular.module("itemOffers", [])
.controller("ItemOfferCtrl", function (
    $scope,
    $state,
    $stateParams,
    $ionicPopup,
    $ionicNavBarDelegate,
    producto,
    promo,
    sharedCartService,
    sharedUtils
  ) {
    var id = $stateParams.id;
    var cantidadVariedadesSel = 0;
    var checkVar = function (item) {
      return item.cantVar > 0;
    };
    // get item from service by item id

    var initialice = function () {
      sharedUtils.showLoading();
      promo
        .getPromo(id)
        .success(function (response) {
          $scope.promo = response;
          promo
            .getProductoPromo(id)
            .success(function (response) {
              $scope.items = response;
              sharedUtils.hideLoading();
            })
            .error(function (err) {
              sharedUtils.hideLoading();
            });
        })
        .error(function (err) {
          sharedUtils.hideLoading();
        });
    };

    initialice();
    $scope.toggleFav = function () {
      $scope.item.faved = !$scope.item.faved;
    };
    $scope.selOptions = function (optionO) {
      $scope.options = [];
      var idProd = optionO.prod_id;
      producto.getProducto(idProd).success(function (response) {
        $scope.options = response.variedades;
        if ($scope.options.length > 0) {
          var myPopup = $ionicPopup.show({
            templateUrl: "templates/popup-prodOption.html",
            title: "Seleccione",
            scope: $scope,
            buttons: [
              { text: "Cancelar" },
              {
                text: "<b>Guardar</b>",
                type: "button-assertive",
                onTap: function (e) {
                  if (!$scope.selectedVariedad) {
                    //don't allow the user to close unless he enters note
                    e.preventDefault();
                  } else {
                    return $scope.selectedVariedad;
                    //                                    return $scope.data.quantity;
                  }
                },
              },
            ],
          });
          myPopup.then(function (res) {
            if (res) {
              if (typeof optionO.selectedVariedad === "undefined") {
                optionO.selectedVariedad = res;
                cantidadVariedadesSel += 1;
              } else {
                optionO.selectedVariedad = res;
              }
            }
          });
        }
      });
      $scope.SelectedVariedadChange = function (variedad) {
        $scope.selectedVariedad = variedad;
      };
      // An elaborate, custom popup
    };
    // Show note popup when click to 'Notes to driver'

    $scope.addCart = function (promo, items) {
      if (cantidadVariedadesSel >= items.filter(checkVar).length) {
        $scope.data = {
          quantity: "1",
        };
        var promoPedido = {};
        promoPedido.productosP = [];
        promoPedido.nombre = promo.pro_nombre;
        promoPedido.precioUnitario = promo.pro_precio;
        promoPedido.cantidad = 1;
        promoPedido.idPromo = promo.pro_id;
        promoPedido.detallePp = promo.pro_descripcion;
        promoPedido.aclaracion = "";
        promoPedido.aderezos = 0;
        angular.forEach(items, function (value, key) {
          var prodPedido = {};
          prodPedido.precioBase = value.prod_precioBase;
          prodPedido.idProducto = value.prod_id;
          prodPedido.idVariedad =
            typeof value.selectedVariedad === "undefined"
              ? -1
              : value.selectedVariedad.var_id;
          prodPedido.precioCalc = 0;
          prodPedido.nombreVariedad =
            typeof value.selectedVariedad === "undefined"
              ? ""
              : value.selectedVariedad.var_nombre;
          prodPedido.aclaracion = "";
          promoPedido.productosP.push(prodPedido);
          promoPedido.aderezos += parseInt(value.prod_isAderezo);
        });
        //promoPedido.aclaracion=
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: "templates/popup-quantity2.html",
          title: "Cantidad",
          scope: $scope,
          buttons: [
            { text: "Cancelar" },
            {
              text: "<b>Guardar</b>",
              type: "button-assertive",
              onTap: function (e) {
                if (!$scope.data.quantity) {
                  //don't allow the user to close unless he enters note
                  e.preventDefault();
                } else {
                  return $scope.data.quantity;
                }
              },
            },
          ],
        });
        myPopup.then(function (res) {
          if (res) {
            sharedUtils.showLoading();
            $scope.data.quantity = parseFloat(res);
            promoPedido.cantidad = parseFloat(res);
            sharedCartService.cartPromo.add(promoPedido);
            sharedUtils.hideLoading();
            $ionicNavBarDelegate.back();
          }
        });
      } else {
        var alertPopup = $ionicPopup.alert({
          title: "Atencion",
          template: "Falta Seleccionar algo",
        });
      }
    };
  });

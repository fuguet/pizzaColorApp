angular.module("category", [])
 // Category controller
 .controller("CategoryCtrl", function (
    $scope,
    $state,
    $stateParams,
    producto,
    categoria,
    sharedUtils
  ) {
    var id = $stateParams.id;
    $scope.products = {};
    $scope.category = {};
    var initialice = function () {
      sharedUtils.showLoading();
      producto
        .getProductoCat(id)
        .success(function (response) {
          $scope.products = response.data;
          categoria
            .getCategoria(id)
            .success(function (response) {
              $scope.category = response;
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
    // get all items from service by category id
    //            $scope.category = Categories.get(1);
  });
  
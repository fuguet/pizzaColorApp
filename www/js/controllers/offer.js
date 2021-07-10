angular.module("offer", [])
  // Offer controller
  .controller("OfferCtrl", function (
    $scope,
    $state,
    $ionicSideMenuDelegate,
    sharedUtils,
    $ionicSlideBoxDelegate,
    promo
  ) {
    // get all items form Items model
    //            $scope.items = Items.all();
    var initialice = function () {
      sharedUtils.showLoading();
      promo
        .getPromos()
        .success(function (response) {
          $scope.promos = response.data;
          sharedUtils.hideLoading();
        })
        .error(function (err) {
          sharedUtils.hideLoading();
        });
    };

    initialice();
    promo.getPromos().success(function (response) {
      $scope.promos = response.data;
    });
    //actualizar slider
    $scope.updateSlider = function () {
      $ionicSlideBoxDelegate.update(); //or just return the function
    };

    // toggle favorite
    $scope.toggleFav = function () {
      $scope.item.faved = !$scope.item.faved;
    };

    // disabled swipe menu
    $ionicSideMenuDelegate.canDragContent(false);
  });
  

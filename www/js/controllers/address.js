angular.module("address", [])
.controller("AddressCtrl", function (
    $scope,
    $state,
    $ionicPopup,
    externalAppsService,
    sharedCartService
  ) {
    function initialize() {
      // set up begining position
      var myLatlng = new google.maps.LatLng(-25.5984759, -54.5749279);
      var image = "img/marker.jpg";
      var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Pizza Color Delivery!",
        icon: image,
      });
      // set option for map
      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      // init map
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      marker.setMap(map);
      // assign to stop
      $scope.map = map;
    }
    $scope.openMaps = function () {
      externalAppsService.openExternalUrl(
        "geo:#{-25.5984759},#{-54.5749279}?q=#Gustavo Eppens 258, Puerto Iguazú, Misiónes"
      );
    };
    // load map when the ui is loaded
    $scope.init = function () {
      initialize();
    };
  });

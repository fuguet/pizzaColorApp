angular.module('starter.controllers', [])


// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope, $ionicHistory) {
  // hide back butotn in next view
  $ionicHistory.nextViewOptions({
    disableBack: true
  });
})

// Home controller
.controller('HomeCtrl', function($scope, $state, Menu) {
    // get all categories from service
    $scope.categories = Menu.all();

    // list images for slider
    $scope.slides = [
      "img/categories/fruit.jpg",
      "img/categories/pizza.jpg",
      "img/categories/sushi.jpg"
    ];
})

// Categories controller
.controller('CategoriesCtrl', function($scope, $state, Categories, $stateParams) {
  // get all categories from services
  $scope.categories = Categories.all();
})


// Category controller
.controller('CategoryCtrl', function($scope, $state, Categories, $stateParams) {
  var id = $stateParams.id;

  // get all items from service by category id
  $scope.category = Categories.get(1);
})

// Item controller
.controller('ItemCtrl', function($scope, $state, Items, $stateParams, $ionicPopup) {
    var id = $stateParams.id;

    // get item from service by item id
    $scope.item = Items.get(1);

    // toggle favorite
    $scope.toggleFav = function() {
      $scope.item.faved = !$scope.item.faved;
    }

    // Show note popup when click to 'Notes to driver'
    $scope.addCart = function() {
      $scope.data = {
        quantity: 1
      }

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/popup-quantity.html',
        title: 'Quantity',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-assertive',
            onTap: function(e) {
              if (!$scope.data.quantity) {
                //don't allow the user to close unless he enters note
                e.preventDefault();
              } else {
                return $scope.data.quantity;
              }
            }
          },
        ]
      });
      myPopup.then(function(res) {
        $scope.data.quantity = res;
      });
    };
})

// Favorite controller
.controller('FavoriteCtrl', function($scope, $state, Items) {

  // get all favorite items
  $scope.items = Items.all()

  // remove item from favorite
  $scope.remove = function(index) {
    $scope.items.splice(index, 1);
  }
})

// Cart controller
.controller('CartCtrl', function($scope, Cart) {
  // set cart items
  $scope.cart = Cart.get();

  // plus quantity
  $scope.plusQty = function(item) {
    item.quantity++;
  }

  // minus quantity
  $scope.minusQty = function(item) {
    if(item.quantity > 1)
      item.quantity--;
  }

  // remove item from cart
  $scope.remove = function(index) {
    $scope.cart.items.splice(index, 1);
  }
})

// Offer controller
.controller('OfferCtrl', function($scope, $state, Items, $ionicSideMenuDelegate) {
  // get all items form Items model
  $scope.items = Items.all();

  // toggle favorite
  $scope.toggleFav = function() {
    $scope.item.faved = !$scope.item.faved;
  }

  // disabled swipe menu
  $ionicSideMenuDelegate.canDragContent(false);
})

// Checkout controller
.controller('CheckoutCtrl', function($scope, $state) {})

// Address controller
.controller('AddressCtrl', function($scope, $state) {
  function initialize() {
    // set up begining position
    var myLatlng = new google.maps.LatLng(21.0227358,105.8194541);

    // set option for map
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // init map
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    // assign to stop
    $scope.map = map;
  }
  // load map when the ui is loaded
  $scope.init = function() {
    initialize();
  }
})

// User controller
.controller('UserCtrl', function($scope, $state) {})

// Setting Controller
.controller('SettingCtrl', function($scope, $state) {})

// Chat controller, view list chats and chat detail
.controller('ChatCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();

  // remove a conversation
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // mute a conversation
  $scope.mute = function(chat) {
    // write your code here
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout) {
  //$scope.chat = Chats.get($stateParams.chatId);
  $scope.chat = Chats.get(0);

  $scope.sendMessage = function() {
    var message = {
      type: 'sent',
      time: 'Just now',
      text: $scope.input.message
    };

    $scope.input.message = '';

    // push to massages list
    $scope.chat.messages.push(message);

    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  };

  // hover menu
  $scope.onMessageHold = function(e, itemIndex, message) {
    // show hover menu
    $ionicActionSheet.show({
      buttons: [
        {
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }
      ],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // Copy Text
            //cordova.plugins.clipboard.copy(message.text);

            break;
          case 1: // Delete
            // no server side secrets here :~)
            $scope.chat.messages.splice(itemIndex, 1);
            break;
        }

        return true;
      }
    });
  };

})

// News controller
.controller('NewsCtrl', function($scope, $state, Posts) {
  // get all posts from services
  $scope.posts = Posts.all();
})

// About controller
.controller('AboutCtrl', function($scope, $state) {
  // working hours
  $scope.days = [
    {
      'name': 'Monday',
      'hours': '02:00pm - 10:00pm'
    },
    {
      'name': 'Tuesday',
      'hours': '02:00pm - 10:00pm'
    },
    {
      'name': 'Wednesday',
      'hours': '02:00pm - 10:00pm'
    },
    {
      'name': 'Thursday',
      'hours': '02:00pm - 10:00pm'
    },
    {
      'name': 'Friday',
      'hours': '02:00pm - 10:00pm'
    },
    {
      'name': 'Saturday',
      'hours': '05:00pm - 10:00pm'
    },
    {
      'name': 'Sunday',
      'hours': '05:00pm - 10:00pm'
    }
  ];
})

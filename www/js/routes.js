angular.module('starter.routes', [])
.config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider
                    // login screen
                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'AuthCtrl'
                    })

                    // register screen
                    .state('register', {
                        url: '/register',
                        templateUrl: 'templates/register.html',
                        controller: 'AuthCtrl'
                    })

                    // Home screen
                    .state('home', {
                        url: '/home',
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    })

                    // Categories
                    .state('categories', {
                        url: '/category',
                        templateUrl: 'templates/categories.html',
                        controller: 'CategoriesCtrl'
                    })

                    // Category detail
                    .state('category', {
                        url: '/category/:id',
                        templateUrl: 'templates/category.html',
                        controller: 'CategoryCtrl'
                    })

                    // Item detail
                    .state('item', {
                        url: '/item/:id',
                        templateUrl: 'templates/item.html',
                        controller: 'ItemCtrl'
                    })
                    
                    .state('itemoffer', {
                        url: '/itemoffer/:id',
                        templateUrl: 'templates/itemoffer.html',
                        controller: 'ItemOfferCtrl'
                    })

                    // View favorite items
                    .state('favorite', {
                        url: '/favorite',
                        templateUrl: 'templates/favorite.html',
                        controller: 'FavoriteCtrl'
                    })

                    // View cart
                    .state('cart', {
                        url: '/cart',
                        templateUrl: 'templates/cart.html',
                        controller: 'CartCtrl'
                    })

                    // View ordered items
                    .state('last_orders', {
                        url: '/last-orders/',
                        templateUrl: 'templates/last-orders.html',
                        controller: 'CartCtrl'
                    })

                    .state('offer', {
                        url: '/offer',
                        templateUrl: 'templates/offer.html',
                        controller: 'OfferCtrl'
                    })

                    .state('checkout', {
                        url: '/checkout',
                        templateUrl: 'templates/checkout.html',
                        controller: 'CheckoutCtrl'
                    })

                    .state('address', {
                        url: '/address',
                        templateUrl: 'templates/address.html',
                        controller: 'AddressCtrl'
                    })

                    .state('user', {
                        url: '/user',
                        templateUrl: 'templates/user.html',
                        controller: 'UserCtrl'
                    })

                    .state('setting', {
                        url: '/setting',
                        templateUrl: 'templates/setting.html',
                        controller: 'SettingCtrl'
                    })

                    // Chat list
                    .state('chats', {
                        url: '/chats',
                        templateUrl: 'templates/chats.html',
                        controller: 'ChatCtrl'
                    })

                    .state('chat-detail', {
                        url: '/chats/:chatId',
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    })

                    // News
                    .state('news', {
                        url: '/news',
                        templateUrl: 'templates/news.html',
                        controller: 'NewsCtrl'
                    })

                    .state('about_us', {
                        url: '/about-us',
                        templateUrl: 'templates/about-us.html',
                        controller: 'AboutCtrl'
                    })
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');

        });
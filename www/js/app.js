// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var API = {
    token_name: "APP-TOKEN", // EL NOMBRE DEL TOKEN QUE HAN DEFINIDO PARA SU API
    //base_url: "https://delapi.pizzacolordelivery.com/public/", // LA URL DE SU API
    base_url: "http://localhost/delApi/public/", // LA URL DE Test
    userId: "",
};
var OneSignal = {};
angular
    .module("starter", [
        "ionic",
        // controllers
        "auth",
        "about",
        "address",
        "cart",
        "categories",
        "category",
        "checkout",
        "favorite",
        "home",
        "item",
        "itemOffers",
        "lastOrders",
        "logout",
        "offer",
        "setting",
        "userAddress",
        "mp",
        // services
        "auth.service",
        "cart.service",
        "categoria.service",
        "countrie.service",
        "credenciales.service",
        "empresa.service",
        "externalApps.service",
        "hotel.service",
        "openHours.service",
        "pedido.service",
        "producto.service",
        "promo.service",
        "public.service",
        "restApi.service",
        "usuario.service",
        "utils.service",
        "mp.service",
        // principales
        "starter.routes",
        "starter.directives",
        "nl2br",
        "monospaced.elastic",
    ])
    .config(function($ionicConfigProvider, $sceDelegateProvider) {
        //Added config
        $ionicConfigProvider.views.maxCache(5);
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $ionicConfigProvider.tabs.position("bottom"); // other values: top
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            "self",
            // Allow loading from our assets domain. **.
            "https://www.mercadopago.com.ar/**",
        ]);
    })
    .run(function(
        $ionicPlatform,
        $ionicHistory,
        $ionicPopup,
        $state,
        $rootScope
    ) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.inAppBrowser) {
                window.open = cordova.inAppBrowser.open;
            }
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    alert("No hay conexion a internet disponible");
                    ionic.Platform.exitApp();
                } else {
                    //alert('Usted esta conectado con: '+ navigator.connection.type);
                }
            } else {
                alert("Cannot find Window.Connection");
            }

            var iosSettings = {};
            iosSettings["kOSSettingsKeyAutoPrompt"] = false;
            iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

            var notificationOpenedCallback = function(jsonData) {
                //alert("Notificacion Abierta:\n" + JSON.stringify(jsonData));

                console.log(jsonData.notification.payload);

                if (ionic.Platform.isIOS()) {
                    $rootScope.dataimgIos =
                        jsonData.notification.payload.rawPayload.att.id;
                    $ionicPopup.alert({
                        templateUrl: "templates/pushIOS.html",
                        title: jsonData.notification.payload.title,
                        content: jsonData.notification.payload.body,
                        scope: $rootScope,
                    });
                } else {
                    $rootScope.dataimg = jsonData.notification.payload;
                    $ionicPopup.alert({
                        templateUrl: "templates/push.html",
                        title: jsonData.notification.payload.title,
                        content: jsonData.notification.payload.body,
                        scope: $rootScope,
                    });
                }
            };

            var addSubscriptionObserverCallback = function(state) {
                if (!state.from.subscribed && state.to.subscribed) {
                    console.log("Subscribed for OneSignal push notifications!")
                        // get player ID
                    API.userId = state.to.userId;
                    console.log(API.userId);
                }
                console.log("Push Subscription state changed: " + JSON.stringify(state));

            };

            this.OneSignal = window.plugins.OneSignal;

            this.OneSignal.promptForPushNotificationsWithUserResponse(
                function(accepted) {
                    console.log("User accepted notifications: " + accepted);

                }
            );


            this.OneSignal.startInit("49e5f0a8-7460-4856-80cc-e5279fd2ae55");
            this.OneSignal.iOSSettings(iosSettings);
            this.OneSignal.inFocusDisplaying(
                window.plugins.OneSignal.OSInFocusDisplayOption.Notification
            );
            this.OneSignal.handleNotificationOpened(notificationOpenedCallback);
            this.OneSignal.addSubscriptionObserver(addSubscriptionObserverCallback);
            this.OneSignal.endInit();

            this.OneSignal.getPermissionSubscriptionState(function(status) {

                this.API.userId = status.subscriptionStatus.userId;
                console.log(this.API.userId);

            });
            // cordova.plugins.notification.local.hasPermission(function(granted) {
            //     //alert("Mantenga la aplicación abierta o minimizada para recibir notificaciones del estado de su pedido");
            //     $ionicPopup.alert({
            //         title: "Importante",
            //         content: "Mantenga la aplicación abierta o minimizada para recibir notificaciones del estado de su pedido",
            //     });

            //     //
            // });
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (
                window.cordova &&
                window.cordova.plugins &&
                window.cordova.plugins.Keyboard
            ) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            var BackButton = 0;
            $ionicPlatform.registerBackButtonAction(function(event) {
                if (
                    $state.current.name == "home" ||
                    $state.current.name == "login" ||
                    $state.current.name == "register" ||
                    $state.current.name == "categories" ||
                    $state.current.name == "offer" ||
                    $state.current.name == "cart" ||
                    $state.current.name == "last_orders" ||
                    $state.current.name == "setting" ||
                    $state.current.name == "userAddress" ||
                    $state.current.name == "about_us" ||
                    $state.current.name == "address"
                ) {
                    if (BackButton == 0) {
                        BackButton++;
                        window.plugins.toast.showLongCenter(
                            "Presione nuevamente para salir"
                        );
                        $timeout(function() {
                            BackButton = 0;
                        }, 1500);
                    } else {
                        ionic.Platform.exitApp();
                    }
                } else {
                    BackButton = 0;
                    $ionicHistory.goBack();
                }
            }, 100);
        });
    });

angular
  .module("auth.service", [])

  .factory("auth", [
    "$location",
    "$state",
    function ($location, $state) {
      var auth = {
        setToken: function (token) {
          localStorage[API.token_name] = token;
        },
        getToken: function () {
          return localStorage[API.token_name];
        },
        getUserData: function () {
          try {
            var token = localStorage[API.token_name];
            if (token === "") return;
            var base64Url = token.split(".")[1];
            var base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64)).data;
          } catch (err) {
            $location.path("/");
          }
        },
        logout: function () {
          localStorage[API.token_name] = "";
          localStorage.removeItem(API.token_name);
          //                                                                        $state.go('login');
        },
        hasToken: function () {
          return (
            !(typeof localStorage[API.token_name] === "undefined") &&
            localStorage[API.token_name] !== ""
          );
        },
        redirectIfNotExists: function () {
          if (!auth.hasToken()) {
            $state.go("login");
          }
        },
        datosUsuario: function () {
          usuario = { id: "", nombre: "", celular: "", email: "" };

          usuario.id = auth.getUserData().id;
          usuario.nombrecompleto = auth.getUserData().NombreCompleto;
          usuario.nombre = auth.getUserData().Nombre;
          usuario.celular = auth.getUserData().Celular;
          usuario.email = auth.getUserData().email;
          //You have to create a local variable for storing emails
          data_editable = {};
          data_editable.email = usuario.email; // For editing store it in local variable
          data_editable.password = "";
          return usuario;
        },
      };

      return auth;
    },
  ]);

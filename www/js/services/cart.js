angular
    .module("cart.service", [])

.factory('sharedCartService', ['$ionicPopup', '$rootScope', 'restApi', function($ionicPopup, $rootScope, restApi) {


    var cartObj = {};
    cartObj.cart = []; //lista de productos  (producto, cantidad)  
    cartObj.cartPromo = []; //lista de promos
    cartObj.cartMitad = [];
    cartObj.total_amount = 0; // total de productos       
    cartObj.total_qty = 0; // cant product 
    cartObj.qtyAderezo = 0; //cant producto con aderezos
    cartObj.total_desc = 0; // total de descuentos

    cartObj.aclaraciones = '';
    cartObj.aderezos = '';


    cartObj.resumen = '';


    cartObj.cleanCart = function() {
        cartObj.cart.splice(0, cartObj.cart.length);
        cartObj.aclaraciones = '';
        cartObj.resumen = '';
        cartObj.aderezos = '';
        // cantidad de componente

    };

    cartObj.cleanCartPromo = function() {
        cartObj.cartPromo.splice(0, cartObj.cartPromo.length); //lista de productos  (producto, cantidad)  
        cartObj.aclaraciones = '';
        cartObj.resumen = '';
        cartObj.aderezos = '';


    };

    //mantiene array de las varidades pedidas en 1/2 si se pide de nuevo quita esa variedad cosa que al finalizar el pedido
    //carmitad tendra todas las varidades que falta pedir una mitad pudiendo asi validar que media pizza falto pedir para completar.
    //queda desarrollar que pasa cuando se elimina un producto que tenia mitad

    cartObj.cartMitad.add = function(variedad) {
        var i = cartObj.cartMitad.find(variedad);
        if (i == -1) {
            cartObj.cartMitad.push(variedad);
        } else {
            cartObj.cartMitad.splice(i, 1);

        }

    }

    cartObj.cartMitad.find = function(producto2) {
        var result = -1;

        for (var i = 0, len = cartObj.cartMitad.length; i < len; i++) {
            if (angular.equals(cartObj.cartMitad[i], producto2)) {
                result = i;
                break;
            }
        }
        return result;
        //revisar hacerlo con each
    };
    cartObj.cartMitad.isEmpty = function() {
        return !(cartObj.cartMitad.length > 0);
        //revisar hacerlo con each
    };
    cartObj.cartMitad.drop = function(variedad) {
        var i = cartObj.cartMitad.find(variedad);
        if (i != -1) {
            cartObj.cartMitad.splice(i, 1);
        }

    }



    cartObj.recalcularTotales = function() {
        cartObj.total_amount = 0; // total de productos       
        cartObj.total_qty = 0;
        cartObj.qtyAderezo = 0;

        for (var i = 0, len = cartObj.cart.length; i < len; i++) {
            cartObj.total_qty += cartObj.cart[i].cantidad;
            cartObj.total_amount += parseFloat(parseFloat(cartObj.cart[i].cantidad) * parseFloat(cartObj.cart[i].productoP.precioBase))


        }
        for (var i = 0, len = cartObj.cartPromo.length; i < len; i++) {

            cartObj.total_qty += cartObj.cartPromo[i].cantidad;
            cartObj.total_amount += parseFloat(parseFloat(cartObj.cartPromo[i].cantidad) * parseFloat(cartObj.cartPromo[i].precioUnitario));





        }

        $rootScope.totalCart = cartObj.total_qty;

    };

    cartObj.generarResumen = function() {
        var resumentxt = '';
        for (var i = 0, len = cartObj.cart.length; i < len; i++) {
            var temp = '*' + cartObj.cart[i].cantidad + '-' + cartObj.cart[i].productoP.nombre + '-' +
                cartObj.cart[i].productoP.nombreVariedad + '-$' + cartObj.cart[i].productoP.precioBase;
            resumentxt = resumentxt + temp + '\n';
        }
        cartObj.resumen = resumentxt;
        // + ' \n'

        resumentxt = '';

        for (var i = 0, len = cartObj.cartPromo.length; i < len; i++) {
            var temp = '*' + cartObj.cartPromo[i].cantidad + ' ' + cartObj.cartPromo[i].nombre + ' ' +
                ' $' + cartObj.cartPromo[i].precioUnitario + ' \n';
            temp = temp + '*';

            for (var j = 0, len2 = cartObj.cartPromo[i].productosP.length; j < len2; j++) {
                if (cartObj.cartPromo[i].productosP[j].nombreVariedad.length > 0)
                    temp = temp + cartObj.cartPromo[i].productosP[j].nombreVariedad + ' ';

            }
            resumentxt = resumentxt + temp;
            // + ' \n';

        }

        cartObj.resumen = cartObj.resumen + resumentxt


        return cartObj.resumen;


    };

    cartObj.calcularDescuento = function() {
        cartObj.total_desc = 0;
        for (var i = 0, len = cartObj.cart.length; i < len; i++) {

            cartObj.total_desc += parseFloat(cartObj.cart[i].descuentoAplicado);



        }

        $rootScope.descuentoAplicado = cartObj.total_desc;
        return cartObj.total_desc;

    };


    //productos
    cartObj.cart.add = function(detalle) {

        var i = cartObj.cart.find(detalle.productoP);
        if (i != -1) {
            cartObj.cart[i].cantidad += detalle.cantidad;
            cartObj.total_qty += detalle.cantidad;
            cartObj.total_amount += parseFloat(parseFloat(detalle.cantidad) * parseFloat(detalle.productoP.precioBase));

        } else {
            cartObj.cart.push(detalle);
            cartObj.total_qty += detalle.cantidad;
            cartObj.total_amount += parseFloat(parseFloat(detalle.cantidad) * parseFloat(detalle.productoP.precioBase));

        }

        cartObj.qtyAderezo += detalle.productoP.aderezo;
        $rootScope.totalCart = cartObj.total_qty;
    };
    cartObj.cart.find = function(producto2) {
        var result = -1;

        for (var i = 0, len = cartObj.cart.length; i < len; i++) {
            if (angular.equals(cartObj.cart[i].productoP, producto2)) {
                result = i;
                break;
            }
        }
        return result;
        //revisar hacerlo con each
    };
    cartObj.cart.drop = function(ind) {

        var temp = cartObj.cart[ind];
        cartObj.total_qty -= parseFloat(temp.cantidad);
        cartObj.total_amount -= (parseFloat(temp.cantidad) * parseFloat(temp.productoP.precioBase));
        cartObj.qtyAderezo -= temp.productoP.aderezo;
        cartObj.cart.splice(ind, 1);
        $rootScope.totalCart = cartObj.total_qty;

        if (!(temp.cantidad % 1 == 0)) {
            var item = {
                variedad: temp.productoP.nombreVariedad,
                categoria: temp.productoP.idCategoria
            }
            cartObj.cartMitad.drop(item);
        }


    };
    cartObj.cart.increment = function(id) {

        var ind = cartObj.cart.find(id);
        var temp = cartObj.cart[ind];
        temp.qty += 1;
        cartObj.total_qty += 1;
        cartObj.total_amount += (parseFloat(cartObj.cart[ind].price));
    };
    cartObj.cart.decrement = function(id) {
        var ind = cartObj.cart.find(id);
        var temp = cartObj.cart[ind];
        cartObj.total_qty -= 1;
        cartObj.total_amount -= parseFloat(temp.price);
        if (cartObj.cart[cartObj.cart.find(id)].qty == 1) { // if the cart item was only 1 in qty
            cartObj.cart.splice(cartObj.cart.find(id), 1); //edited
        } else {
            cartObj.cart[cartObj.cart.find(id)].qty -= 1;
        }

    };

    //promos
    cartObj.cartPromo.increment = function(promoPedido) {

        promoPedido.cantidad += 1; //aumentar cantidad de la promo
        cartObj.total_qty += 1;
        cartObj.total_amount += parseFloat(promoPedido.precioUnitario);


    };
    cartObj.cartPromo.decrement = function(ind) {

        var temp = cartObj.cartPromo[ind];
        cartObj.total_qty -= 1;
        cartObj.total_amount -= parseFloat(temp.precioUnitario);
        if (cartObj.cart[ind].cantidad == 1) { // if the cart item was only 1 in qty
            cartObj.cart.splice(ind, 1); //edited
        } else {
            cartObj.cart[ind].cantidad -= 1;
        }

    };
    cartObj.cartPromo.drop = function(ind) {


        var temp = cartObj.cartPromo[ind];


        cartObj.total_qty -= parseFloat(temp.cantidad);
        cartObj.total_amount -= parseFloat(parseFloat(temp.cantidad) * parseFloat(temp.precioUnitario));
        cartObj.qtyAderezo -= temp.aderezos;
        cartObj.cartPromo.splice(ind, 1);
        $rootScope.totalCart = cartObj.total_qty;
    };
    cartObj.cartPromo.add = function(promoPedido) {

        cartObj.cartPromo.push(promoPedido);
        cartObj.total_qty += promoPedido.cantidad;
        cartObj.total_amount += parseFloat(parseFloat(promoPedido.cantidad) * parseFloat(promoPedido.precioUnitario));
        cartObj.qtyAderezo += promoPedido.aderezos;
        $rootScope.totalCart = cartObj.total_qty;

    };


    cartObj.getQty = function() {
        return cartObj.total_qty;
    };
    return cartObj;
}]);
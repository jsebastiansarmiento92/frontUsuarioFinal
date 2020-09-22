"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.PedidoService = void 0;

var core_1 = require("@angular/core");

var PedidoService =
    /** @class */
    function() {
        function PedidoService(http) {
            this.http = http;
            this.pedidoURL = 'https://quickdomicilios.herokuapp.com/pedido';
        }

        PedidoService.prototype.createPedido = function(pedido) {
            //alert("nombre que se envia es "+ usuario.nombreUsuario)
            //console.log(pedido);
            return this.http.post(this.pedidoURL, pedido);
        };

        PedidoService.prototype.getPedidosFiltro = function(filtro) {
            return this.http.get(this.pedidoURL + ("/pedidosFiltro/" + filtro));
        };

        PedidoService.prototype.getPedidosCurso = function(filtro, idDomiciliario) {
            return this.http.get(this.pedidoURL + ("/pedidosCurso/" + filtro) + ("&" + idDomiciliario));
        };

        PedidoService.prototype.modificarPedidoDomiciliario = function(idPedido, idDomiciliario, pedido) {
            //console.log("el ide seleccionado es de modificarpeidoDom" + idDomiciliario);
            return this.http.put(this.pedidoURL + ("/modificarDomiciliario/" + idPedido) + ("&" + idDomiciliario), pedido);
        };

        PedidoService.prototype.getPedido = function(idPedido) {
            return this.http.get(this.pedidoURL + ("/" + idPedido));
        };

        PedidoService.prototype.getPedidosCliente = function(idCliente) {
            return this.http.get(this.pedidoURL + ("/getPedidoUsuarioFinal/" + idCliente));
        };

        PedidoService = __decorate([core_1.Injectable({
            providedIn: 'root'
        })], PedidoService);
        return PedidoService;
    }();

exports.PedidoService = PedidoService;
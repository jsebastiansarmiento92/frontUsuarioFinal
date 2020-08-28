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
exports.ConsignacionService = void 0;

var core_1 = require("@angular/core");

var ConsignacionService =
    /** @class */
    function() {
        function ConsignacionService(http) {
            this.http = http;
            this.consignacionURL = 'http://localhost:8080/consignaciones';
        }

        ConsignacionService.prototype.createConsignacion = function(consignacion) {
            //alert("nombre que se envia es "+ usuario.nombreUsuario)
            //console.log("consignacion lista para enviar por el endpoint");
            //console.log(consignacion);
            return this.http.post(this.consignacionURL + '/' + consignacion.caja.idCaja, consignacion);
        };

        ConsignacionService = __decorate([core_1.Injectable({
            providedIn: 'root'
        })], ConsignacionService);
        return ConsignacionService;
    }();

exports.ConsignacionService = ConsignacionService;
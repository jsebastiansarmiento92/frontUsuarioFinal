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
exports.CajaService = void 0;

var core_1 = require("@angular/core");

var http_1 = require("@angular/common/http");

var cabecera = {
    headers: new http_1.HttpHeaders({
        'Content-TYpe': 'application/json'
    })
};

var CajaService =
    /** @class */
    function() {
        function CajaService(http) {
            this.http = http;
            this.cajaURL = 'http://localhost:8080/cajas';
        }

        CajaService.prototype.createCaja = function(caja) {
            //alert("nombre que se envia es "+ usuario.nombreUsuario)
            //console.log(caja);
            return this.http.post(this.cajaURL, caja);
        };

        CajaService.prototype.getCajas = function() {
            //alert("nombre que se envia es "+ usuario.nombreUsuario)
            return this.http.get(this.cajaURL);
        };

        CajaService.prototype.getCajasAll = function() {
            //alert("nombre que se envia es "+ usuario.nombreUsuario)
            return this.http.get(this.cajaURL + "/all");
        };

        CajaService.prototype.getCajaId = function(id) {
            //console.log("el ide el usuario que asigna id es " + id);
            return this.http.get(this.cajaURL + "/" + id);
        };

        CajaService.prototype.getCajaUsuario = function(id) {
            //console.log("el ide el usuario que asigna id es " + id);
            return this.http.get(this.cajaURL + "/getCajaUsuario/" + id);
        };

        CajaService.prototype.updateCajaDar = function(caja, id, valor) {
            //console.log("el ide seleccionado es de dar" + id);
            return this.http.put(this.cajaURL + ("/modificarDar/" + id) + ("&" + valor), caja);
        };

        CajaService.prototype.updateCaja = function(caja, id) {
            //console.log("el ide seleccionado es solo update " + id);
            return this.http.put(this.cajaURL + ("/modificar/" + id), caja);
        };

        CajaService.prototype.updateCajaQuitar = function(caja, id, valor) {
            //console.log("el ide seleccionado es de quitar" + id);
            return this.http.put(this.cajaURL + ("/modificarQuitar/" + id) + ("&" + valor), caja);
        };

        CajaService = __decorate([core_1.Injectable({
            providedIn: 'root'
        })], CajaService);
        return CajaService;
    }();

exports.CajaService = CajaService;
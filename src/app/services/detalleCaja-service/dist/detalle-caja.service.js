"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetalleCajaService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var cabecera = { headers: new http_1.HttpHeaders({ 'Content-TYpe': 'application/json' }) };
var DetalleCajaService = /** @class */ (function () {
    function DetalleCajaService(http) {
        this.http = http;
        this.detalleCajaURL = 'https://quickdomicilios.herokuapp.com/detalleCajas';
    }
    DetalleCajaService.prototype.getCajas = function (id) {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        console.log("se busca la caja con id " + id);
        return this.http.get(this.detalleCajaURL + "/" + id);
    };
    DetalleCajaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DetalleCajaService);
    return DetalleCajaService;
}());
exports.DetalleCajaService = DetalleCajaService;
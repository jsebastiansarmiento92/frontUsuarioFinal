"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetalleServicioService = void 0;
var core_1 = require("@angular/core");
var DetalleServicioService = /** @class */ (function () {
    function DetalleServicioService(http) {
        this.http = http;
        this.detalleservicioURL = 'https://quickdomicilios.herokuapp.com/detalleServicio';
    }
    DetalleServicioService.prototype.createDetalleServicio = function (detalleServicio) {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        console.log(detalleServicio);
        return this.http.post(this.detalleservicioURL, detalleServicio);
    };
    DetalleServicioService.prototype.getServicio = function (idEmpresa, idCliente) {
        console.log("el id empresa es " + idEmpresa);
        console.log("el id cliente es " + idCliente);
        return this.http.get(this.detalleservicioURL + ("/getServicio/" + idEmpresa) + ("&" + idCliente));
    };
    DetalleServicioService.prototype.getDetalles = function (idPedido) {
        return this.http.get(this.detalleservicioURL + ("/getDetalles/" + idPedido));
    };
    DetalleServicioService.prototype.createDetalleServicioList = function (detalleServicioList) {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        console.log("la lista que se envia en detalle es:");
        console.log(detalleServicioList);
        return this.http.post(this.detalleservicioURL + '/insertarLista', detalleServicioList);
    };
    DetalleServicioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DetalleServicioService);
    return DetalleServicioService;
}());
exports.DetalleServicioService = DetalleServicioService;

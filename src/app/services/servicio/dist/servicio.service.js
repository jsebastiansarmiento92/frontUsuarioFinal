"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicioService = void 0;
var core_1 = require("@angular/core");
var ServicioService = /** @class */ (function () {
    function ServicioService(http) {
        this.http = http;
        this.servicioURL = 'http://localhost:8080/servicio';
    }
    ServicioService.prototype.updateServicio = function (servicio) {
        console.log("el ide seleccionado es " + servicio.id);
        return this.http.put(this.servicioURL + "/modificarEstado", servicio);
    };
    ServicioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServicioService);
    return ServicioService;
}());
exports.ServicioService = ServicioService;

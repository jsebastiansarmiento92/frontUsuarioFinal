"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductoServiceService = void 0;
var core_1 = require("@angular/core");
var ProductoServiceService = /** @class */ (function() {
    function ProductoServiceService(httpClient) {
        this.httpClient = httpClient;
        this.productoURL = 'http://localhost:8080/productos';
    }
    ProductoServiceService.prototype.creaProducto = function(producto) {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        console.log(producto);
        return this.httpClient.post(this.productoURL, producto);
    };
    ProductoServiceService.prototype.getProductos = function() {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        return this.httpClient.get(this.productoURL);
    };
    ProductoServiceService.prototype.getProductosEmpresa = function(empresa) {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        return this.httpClient.get(this.productoURL + '/listarPorEmpresa' + "/" + empresa.idEmpresa);
    };
    ProductoServiceService.prototype.listarUsuarioFinal = function() {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        return this.httpClient.get(this.productoURL + "/listarUsuarioFinal");
    };
    ProductoServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductoServiceService);
    return ProductoServiceService;
}());
exports.ProductoServiceService = ProductoServiceService;
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
exports.EmpresaService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var cabecera = { headers: new http_1.HttpHeaders({ 'Content-TYpe': 'application/json' }) };
var EmpresaService = /** @class */ (function() {
    function EmpresaService(http) {
        this.http = http;
        this.empresaURL = 'http://localhost:8080/empresas';
    }
    EmpresaService.prototype.createEmpresa = function(empresa) {
        //alert("nombre que se envia es "+ usuario.nombreUsuario)
        return this.http.post(this.empresaURL, empresa);
    };
    EmpresaService.prototype.getEmpresas = function() {
        return this.http.get(this.empresaURL);
    };
    EmpresaService.prototype.borrarEmpresaId = function(empresa) {
        //console.log("el ide seleccionado es " + empresa.idEmpresa);
        return this.http["delete"](this.empresaURL + "/" + empresa.idEmpresa);
    };
    EmpresaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EmpresaService);
    return EmpresaService;
}());
exports.EmpresaService = EmpresaService;
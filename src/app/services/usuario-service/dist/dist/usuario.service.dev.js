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
exports.UsuarioService = void 0;

var core_1 = require("@angular/core");

var http_1 = require("@angular/common/http");

var cabecera = {
    headers: new http_1.HttpHeaders({
        'Content-TYpe': 'application/json'
    })
};

var UsuarioService =
    /** @class */
    function() {
        function UsuarioService(http) {
            this.http = http;
            this.usuarioURL = 'https://quickdomicilios.herokuapp.com/usuarios';
        }

        UsuarioService.prototype.getUsuarios = function() {
            return this.http.get(this.usuarioURL);
        };

        UsuarioService.prototype.createUsuarios = function(usuario) {
            //alert("nombre que se envia es "+ usuario.nombreUsuario)
            return this.http.post(this.usuarioURL, usuario);
        };

        UsuarioService.prototype.updateUsuario = function(usuario, id) {
            console.log("el ide seleccionado es " + usuario.id);
            return this.http.put(this.usuarioURL + ("/" + id), usuario);
        };

        UsuarioService.prototype.updateUsuarioLugar = function(lugar, id) {
            //console.log("el ide seleccionado es " + usuario.id)
            return this.http.put(this.usuarioURL + ("/modificarLugar/" + id), lugar);
        };

        UsuarioService.prototype.getUsuarioId = function(id) {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.usuarioURL + "/" + id);
        };

        UsuarioService.prototype.borrarUsuarioId = function(usuario) {
            console.log("el ide seleccionado es " + usuario.id);
            return this.http["delete"](this.usuarioURL + "/" + usuario.id);
        };

        UsuarioService.prototype.getUsuariosRol = function(id) {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.usuarioURL + "/finalCaja/" + id);
        };

        UsuarioService.prototype.getDomiciliarios = function(estado) {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.usuarioURL + "/domiciliario/" + estado);
        };

        UsuarioService.prototype.getUserEmpresaNotifications = function(idEmpresa) {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.usuarioURL + "/userEmpresaNotifications/" + idEmpresa);
        };

        UsuarioService.prototype.getUserRepecionistaNotifications = function() {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.usuarioURL + "/userRepecionistaNotifications");
        };

        UsuarioService.prototype.getUserAdminNotifications = function() {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.usuarioURL + "/userAdminNotifications");
        };

        UsuarioService.prototype.getUserDomiciliarioNotifications = function() {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.usuarioURL + "/userDomiciliarioNotifications");
        };

        UsuarioService = __decorate([core_1.Injectable({
            providedIn: 'root'
        })], UsuarioService);
        return UsuarioService;
    }();

exports.UsuarioService = UsuarioService;
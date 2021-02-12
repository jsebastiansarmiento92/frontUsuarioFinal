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
exports.RolServiceService = void 0;

var core_1 = require("@angular/core");

var http_1 = require("@angular/common/http");

var cabecera = {
    headers: new http_1.HttpHeaders({
        'Content-TYpe': 'application/json'
    })
};

var RolServiceService =
    /** @class */
    function() {
        function RolServiceService(http) {
            this.http = http;
            this.rolURL = 'https://quickdomicilios.herokuapp.com/roles';
        }

        RolServiceService.prototype.getRoles = function() {
            return this.http.get(this.rolURL);
        };

        RolServiceService.prototype.createRol = function(rol) {
            return this.http.post(this.rolURL, rol);
        };

        RolServiceService.prototype.updateRol = function(rol) {
            console.log("el ide seleccionado es " + rol.id);
            return this.http.put(this.rolURL, rol);
        };

        RolServiceService.prototype.getRolId = function(id) {
            // console.log("el ide seleccionado es "+ id)
            return this.http.get(this.rolURL + "/" + id);
        };

        RolServiceService.prototype.borrarRolId = function(rol) {
            // console.log("el ide seleccionado es "+ id)
            return this.http["delete"](this.rolURL + "/" + rol.id);
        };

        RolServiceService = __decorate([core_1.Injectable({
            providedIn: 'root'
        })], RolServiceService);
        return RolServiceService;
    }();

exports.RolServiceService = RolServiceService;
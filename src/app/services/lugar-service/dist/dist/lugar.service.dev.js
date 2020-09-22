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
exports.LugarService = void 0;

var core_1 = require("@angular/core");

var LugarService =
    /** @class */
    function() {
        function LugarService(http) {
            this.http = http;
            this.lugarURL = 'https://quickdomicilios.herokuapp.com/lugar';
        }

        LugarService.prototype.createLugar = function(lugar) {
            //alert("nombre que se envia es "+ usuario.nombreUsuario)
            //console.log(lugar);
            return this.http.post(this.lugarURL, lugar);
        };

        LugarService.prototype.getLugarId = function(id) {
            // //console.log("el ide seleccionado es "+ id)
            return this.http.get(this.lugarURL + "/" + id);
        };

        LugarService.prototype.getLugaresIdUsuario1 = function(id) {
            // //console.log("el ide seleccionado es "+ id)
            return this.http.get(this.lugarURL + "/usuario/" + id);
        };

        LugarService.prototype.modificarLugar = function(lugar) {
            //console.log(lugar);
            return this.http.put(this.lugarURL + '/modificarLugar', lugar);
        };

        LugarService = __decorate([core_1.Injectable({
            providedIn: 'root'
        })], LugarService);
        return LugarService;
    }();

exports.LugarService = LugarService;
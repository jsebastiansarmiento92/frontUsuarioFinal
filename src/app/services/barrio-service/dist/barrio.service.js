"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BarrioService = void 0;
var core_1 = require("@angular/core");
var BarrioService = /** @class */ (function () {
    function BarrioService(http) {
        this.http = http;
        this.barrioURL = 'http://localhost:8080/barrios';
    }
    BarrioService.prototype.getBarrios = function () {
        return this.http.get(this.barrioURL);
    };
    BarrioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BarrioService);
    return BarrioService;
}());
exports.BarrioService = BarrioService;

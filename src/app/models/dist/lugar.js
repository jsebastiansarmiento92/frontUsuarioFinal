"use strict";
exports.__esModule = true;
exports.Lugar = void 0;
var barrio_1 = require("./barrio");
var Lugar = /** @class */ (function () {
    function Lugar() {
        this.barrio = new barrio_1.Barrio();
        this.direccionLugar = "sin guardar";
    }
    return Lugar;
}());
exports.Lugar = Lugar;

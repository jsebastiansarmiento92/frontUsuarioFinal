"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeadComponent = void 0;
var core_1 = require("@angular/core");
var lugar_1 = require("src/app/models/lugar");
var HeadComponent = /** @class */ (function () {
    function HeadComponent(tokenService, router, lugarService) {
        this.tokenService = tokenService;
        this.router = router;
        this.lugarService = lugarService;
        this.isLogin = false;
        this.refreshHead = false;
        this.nombreUsuario = "";
        this.telefono = "sin guardar";
    }
    HeadComponent.prototype.ngOnInit = function () {
        console.log("hay lugar guardado en el localstorage");
        this.lugar = JSON.parse(localStorage.getItem('lugar'));
        console.log(this.lugar);
        console.log("verificacion is login");
        this.lugar = new lugar_1.Lugar();
        this.mostrarNombreSesion();
        if (this.tokenService.getToken() == null) {
            console.log("se limpia el locar storage en inicio");
            localStorage.removeItem("isLoggedin");
        }
        if (localStorage.getItem("isLoggedin") && this.refreshHead) {
            if (localStorage.getItem("isLoggedin") == 'true') {
                this.guardarMidireccion();
                this.isLogin = true;
            }
        }
        this.refreshHead = false;
    };
    HeadComponent.prototype.mostrarNombreSesion = function () {
        this.nombreUsuario = window.sessionStorage.getItem("AuthUserName");
    };
    HeadComponent.prototype.guardarMidireccion = function () {
        var _this = this;
        this.lugarService.getLugarId(parseInt(sessionStorage.getItem("IdLugar"))).subscribe(function (data) {
            _this.lugar = data;
        });
    };
    HeadComponent.prototype.refresh = function () {
        this.refreshHead = true;
        this.ngOnInit();
    };
    HeadComponent.prototype.cambiar = function () {
        localStorage.removeItem("barrios");
        localStorage.setItem('cambioDireccion', 'false');
        this.router.navigate(['landing']);
    };
    HeadComponent.prototype.logOut = function () {
        if (confirm("desea cerrar sesion?")) {
            console.log("cerrar sesion");
            this.tokenService.logOut();
            this.isLogin = false;
            this.authority = '';
            this.nombreUsuario = "";
            //this.router.navigate([""]);
        }
        else {
        }
    };
    HeadComponent.prototype.login = function () {
        this.router.navigate(["login"]);
    };
    HeadComponent.prototype.privacyPolicy = function () {
        console.log("ingreso a politica de privacidad");
        this.router.navigate(["privacy-policy"]);
    };
    HeadComponent.prototype.inicio = function () {
        this.router.navigate(["inicio"]);
    };
    HeadComponent.prototype.onRegister = function () {
        this.router.navigate(['signup']);
    };
    HeadComponent.prototype.getIslogin = function () {
        if (localStorage.getItem("isLoggedin") == "true") {
            return true;
        }
        else
            return false;
    };
    HeadComponent = __decorate([
        core_1.Component({
            selector: 'app-head',
            templateUrl: './head.component.html',
            styleUrls: ['./head.component.css']
        })
    ], HeadComponent);
    return HeadComponent;
}());
exports.HeadComponent = HeadComponent;

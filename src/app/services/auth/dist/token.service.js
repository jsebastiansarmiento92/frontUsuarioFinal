"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenService = void 0;
var core_1 = require("@angular/core");
var TOKEN_KEY = 'AuthToken';
var USERNAME_KEY = 'AuthUserName';
var AUTHORITIES_KEY = 'rol';
var ID_SESION = 'IdSesion';
var ID_LUGAR = 'IdLugar';
var TELEFONO = 'Telefono';
var IMAGEURL = 'ImageUrl';
var TokenService = /** @class */ (function () {
    function TokenService() {
        this.roles = [];
    }
    TokenService.prototype.setLugar = function (idLugar) {
        window.sessionStorage.removeItem(ID_LUGAR);
        window.sessionStorage.setItem(ID_LUGAR, idLugar);
    };
    TokenService.prototype.getLugar = function () {
        return sessionStorage.getItem(ID_LUGAR);
    };
    TokenService.prototype.setToken = function (token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    };
    TokenService.prototype.setIdUser = function (idUser) {
        window.sessionStorage.removeItem(ID_SESION);
        window.sessionStorage.setItem(ID_SESION, idUser);
    };
    TokenService.prototype.getToken = function () {
        return sessionStorage.getItem(TOKEN_KEY);
    };
    TokenService.prototype.setUserName = function (userName) {
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USERNAME_KEY, userName);
    };
    TokenService.prototype.getUserName = function () {
        return sessionStorage.getItem(USERNAME_KEY);
    };
    TokenService.prototype.setTelefono = function (telefono) {
        window.sessionStorage.removeItem(TELEFONO);
        window.sessionStorage.setItem(TELEFONO, telefono);
    };
    TokenService.prototype.getTelefono = function () {
        return sessionStorage.getItem(TELEFONO);
    };
    TokenService.prototype.setImageUrl = function (imageUrl) {
        window.sessionStorage.removeItem(IMAGEURL);
        window.sessionStorage.setItem(IMAGEURL, imageUrl);
    };
    TokenService.prototype.getImageUrl = function () {
        return sessionStorage.getItem(IMAGEURL);
    };
    TokenService.prototype.getIdUser = function () {
        return window.sessionStorage.getItem(ID_SESION);
    };
    TokenService.prototype.setAuthorities = function (authorities) {
        window.sessionStorage.removeItem(AUTHORITIES_KEY);
        window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    };
    TokenService.prototype.getAuthorities = function () {
        this.roles = [];
        if (sessionStorage.getItem(AUTHORITIES_KEY)) {
            console.log(123455);
            console.log(sessionStorage.getItem(AUTHORITIES_KEY));
            this.roles.push(JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
        }
        return this.roles;
    };
    TokenService.prototype.logOut = function () {
        window.sessionStorage.clear();
        sessionStorage.clear();
        window.localStorage.clear();
        localStorage.clear();
    };
    TokenService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;

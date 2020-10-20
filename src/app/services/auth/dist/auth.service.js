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
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var cabecera = { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) };
var headers = new Headers({
    'Content-Type': 'application/json'
});
var AuthService = /** @class */ (function() {
    function AuthService(httpClient) {
        this.httpClient = httpClient;
        this.authURL = 'https://quickdomicilios.herokuapp.com/auth/';
    }
    AuthService.prototype.login = function(signupReq) {
        return this.httpClient.post(this.authURL + 'login', signupReq);
    };
    AuthService.prototype.registro = function(usuario) {
        return this.httpClient.post(this.authURL + 'nuevo', usuario, cabecera);
    };
    AuthService.prototype.googleLogin = function() {
        return this.httpClient.get(window.location.href = 'https://quickdomicilios.herokuapp.com/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup');
    };
    AuthService.prototype.getCurrentUser = function() {
        return this.httpClient.get('https://quickdomicilios.herokuapp.com/usuarios/user/me');
    };
    AuthService.prototype.onRegister = function(signupReq) {
        console.log("registro manual de usuario");
        return this.httpClient.post(this.authURL + 'signup', signupReq);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
        //https://quickdomicilios.herokuapp.com/
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
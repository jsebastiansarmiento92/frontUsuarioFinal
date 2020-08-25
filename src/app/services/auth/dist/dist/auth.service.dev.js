"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.AuthService = void 0;

var core_1 = require("@angular/core");

var http_1 = require("@angular/common/http");

var cabecera = {
  headers: new http_1.HttpHeaders({
    'Content-Type': 'application/json'
  })
};
var headers = new Headers({
  'Content-Type': 'application/json'
});

var AuthService =
/** @class */
function () {
  function AuthService(httpClient) {
    this.httpClient = httpClient;
    this.authURL = 'http://localhost:8080/auth/';
  }

  AuthService.prototype.login = function (signupReq) {
    return this.httpClient.post(this.authURL + 'login', signupReq);
  };

  AuthService.prototype.registro = function (usuario) {
    return this.httpClient.post(this.authURL + 'nuevo', usuario, cabecera);
  };

  AuthService.prototype.googleLogin = function () {
    return this.httpClient.get(window.location.href = 'http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/signup');
  };

  AuthService.prototype.getCurrentUser = function () {
    return this.httpClient.get('http://localhost:8080/usuarios/user/me');
  };

  AuthService.prototype.onRegister = function (signupReq) {
    console.log("registro manual de usuario");
    return this.httpClient.post(this.authURL + 'signup', signupReq);
  };

  AuthService = __decorate([core_1.Injectable({
    providedIn: 'root'
  }) //http://localhost:8080/
  ], AuthService);
  return AuthService;
}();

exports.AuthService = AuthService;
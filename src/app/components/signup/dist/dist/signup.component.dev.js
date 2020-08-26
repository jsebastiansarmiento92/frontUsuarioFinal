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
exports.SignupComponent = void 0;

var core_1 = require("@angular/core");

var sign_up_request_1 = require("src/app/models/sign-up-request");

var SignupComponent =
/** @class */
function () {
  function SignupComponent(authService, router, tokenService, serviceModal) {
    this.authService = authService;
    this.router = router;
    this.tokenService = tokenService;
    this.serviceModal = serviceModal;
    this.setState = false;
    this.isLogged = false;
    this.isLoginFail = false;
    this.roles = [];
    this.errorMsg = '';
    this.loader = false;
    this.signupRequest = new sign_up_request_1.SignUpRequest();
    this.msjErr = '';
    this.msjOK = '';
    this.autenticando = false;
  }

  ;

  SignupComponent.prototype.ngOnInit = function () {
    var _this = this;

    this.serviceModal.dismissAll(); // console.log("no hay token guardado");

    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.queryParams['token'];
    this.error = this.urlTree.queryParams['error'];

    if (this.token.length > 1) {
      window.sessionStorage.setItem('AuthToken', this.token);
      window.localStorage.setItem('AuthToken', this.token);
    }

    console.log("token llegando es:");
    console.log(this.token);
    console.log("error llegando es ");
    console.log(this.error);

    if (window.sessionStorage.getItem('AuthToken')) {
      this.serviceModal.open(this.autenticandoModal);
      console.log("hay tonken guardado porque ingresa al if");
      this.autenticando = true;
      this.authService.getCurrentUser().subscribe(function (data) {
        console.log(data); //this.tokenService.setToken(data.token);

        window.localStorage.setItem("idSesion", JSON.stringify(data));

        _this.tokenService.setUserName(data.name);

        _this.tokenService.setAuthorities(data.rol);

        _this.tokenService.setIdUser(data.id);

        _this.tokenService.setLugar(data.idLugar); //alert("id del usuario lopueado es "+data.id);
        //window.sessionStorage.setItem("idSesion",data.);


        _this.isLogged = true;
        _this.isLoginFail = false;
        _this.roles = _this.tokenService.getAuthorities();
        localStorage.setItem('isLoggedin', 'true'); //window.location.reload();

        _this.autenticando = false;

        _this.serviceModal.dismissAll();

        _this.router.navigate(['inicio']);

        _this.loader = false;
      });
    }
  };

  SignupComponent.prototype.getIslogin = function () {
    return false;
  };

  SignupComponent.prototype.logOut = function () {};

  SignupComponent.prototype.registerGoogle = function () {
    console.log("ingresoa registrer con google");
    window.location.href = "https://quickdomicilios.herokuapp.com/oauth2/authorize/google?redirect_uri=http://localhost:4200/signup";
  };

  SignupComponent.prototype.registerFacebook = function () {
    console.log("ingresoa registrer con facebook");
    window.location.href = "https://quickdomicilios.herokuapp.com/oauth2/authorize/facebook?redirect_uri=http://localhost:4200/signup";
  };

  SignupComponent.prototype.registerManual = function () {
    var _this = this;

    console.log("datos que se envian para el registro");
    console.log(this.signupRequest);
    this.authService.onRegister(this.signupRequest).subscribe(function (data) {
      console.log(data);
      alert("Registro completo por favor inicie sesion con sus datos para continuar");

      _this.router.navigate(['login']);
    }, function (err) {
      _this.creado = false;
      _this.failCreado = true;
      _this.msjErr = err.error.mensaje;
      console.log(err.error.mensaje);
    });
  };

  __decorate([core_1.ViewChild('autenticandoModal', {
    "static": false
  })], SignupComponent.prototype, "autenticandoModal");

  SignupComponent = __decorate([core_1.Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })], SignupComponent);
  return SignupComponent;
}();

exports.SignupComponent = SignupComponent;
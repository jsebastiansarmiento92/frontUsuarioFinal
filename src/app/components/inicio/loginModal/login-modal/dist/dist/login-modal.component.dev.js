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
exports.LoginModalComponent = void 0;

var core_1 = require("@angular/core");

var login_usuario_1 = require("src/app/models/login-usuario");

var sign_up_request_1 = require("src/app/models/sign-up-request");

var LoginModalComponent =
    /** @class */
    function() {
        function LoginModalComponent(authService, tokenService, router, serviceModal) {
            this.authService = authService;
            this.tokenService = tokenService;
            this.router = router;
            this.serviceModal = serviceModal;
            this.loader = false;
            this.logingIn = false;
            this.usuario = new login_usuario_1.LoginUsuario();
            this.isLogged = false;
            this.isLoginFail = false;
            this.roles = [];
            this.errorMsg = '';
            this.setState = false;
            this.signupReq = new sign_up_request_1.SignUpRequest();
        }

        LoginModalComponent.prototype.ngOnInit = function() {
            /**  if (this.tokenService.getToken()) {
               //console.log("usuario "+this.tokenService.getUserName());
               this.isLogged = true;
               this.isLoginFail = false;
               this.roles = this.tokenService.getAuthorities();
             }*/
            // //console.log("no hay token guardado");
            this.urlTree = this.router.parseUrl(this.router.url);
            this.token = this.urlTree.queryParams['token'];
            this.error = this.urlTree.queryParams['error'];

            if (this.token.length > 1) {
                window.sessionStorage.setItem('AuthToken', this.token);
                window.localStorage.setItem('AuthToken', this.token);
            }

            //console.log("token llegando es:");
            //console.log(this.token);
            //console.log("erro llegando es ");
            //console.log(this.error);

            if (window.sessionStorage.getItem('AuthToken')) {
                //console.log("hay tonken guardado porque ingresa al if");
                this.getUser();
            }
        };

        LoginModalComponent.prototype.onLoggedin = function() {
            var _this = this; // this.usuario = new LoginUsuario(this.usuario.nombreUsuario, this.usuario.password);


            this.logingIn = true;
            this.loader = true;
            this.authService.login(this.signupReq).subscribe(function(data) {
                //console.log("ingreso a la promesa de login");
                //console.log(data);

                _this.tokenService.setToken(data.accessToken);

                _this.isLogged = true;
                _this.isLoginFail = false;
                _this.roles = _this.tokenService.getAuthorities();
                localStorage.setItem('isLoggedin', 'true');

                _this.getUser(); //window.location.reload();


                _this.router.navigate(['']);

                _this.loader = false; //window.location.href = '';
            }, function(err) {
                _this.loader = false;
                _this.isLogged = false;
                _this.isLoginFail = true;
                _this.errorMsg = err.error.message; //this.router.navigate(['']);
                //console.log("error "+ err.error.message);
            });
        };

        LoginModalComponent.prototype.getUser = function() {
            var _this = this;

            this.authService.getCurrentUser().subscribe(function(data) {
                //console.log(data);
                window.localStorage.setItem("idSesion", JSON.stringify(data)); //this.tokenService.setToken(data.token);

                _this.tokenService.setUserName(data.name);

                _this.tokenService.setAuthorities(data.rol);

                _this.tokenService.setIdUser(data.id);

                _this.tokenService.setLugar(data.idLugar); //alert("id del usuario lopueado es "+data.id);
                //window.sessionStorage.setItem("idSesion",data.);
                //window.sessionStorage.setItem("AuthToken",this.tokenService.getToken());


                _this.isLogged = true;
                _this.isLoginFail = false;
                _this.roles = _this.tokenService.getAuthorities();
                localStorage.setItem('isLoggedin', 'true'); //window.location.reload();

                _this.router.navigate(['']);

                _this.loader = false;
            });
        };

        LoginModalComponent.prototype.onRegister = function() {
            // this.serviceModal.dismissAll();
            this.router.navigate(["signup"]);
        };

        LoginModalComponent.prototype.loginGoogle = function() {
            //console.log("ingresoa registrer con google");
            window.location.href = "https://quickdomicilios.herokuapp.com/oauth2/authorize/google?redirect_uri=http://localhost:4200/signup";
        };
        https: //quickdomicilios.herokuapp.com
            LoginModalComponent.prototype.loginFacebook = function() {
                //console.log("ingresoa registrer con facebook");
                window.location.href = "https://quickdomicilios.herokuapp.com/oauth2/authorize/facebook?redirect_uri=http://localhost:4200/signup";
            };
        https: //quickdomicilios.herokuapp.com
            __decorate([core_1.ViewChild('registroModal', {
                "static": false
            })], LoginModalComponent.prototype, "registroModal");

        LoginModalComponent = __decorate([core_1.Component({
            selector: 'app-login-modal',
            templateUrl: './login-modal.component.html',
            styleUrls: ['./login-modal.component.css']
        })], LoginModalComponent);
        return LoginModalComponent;
    }();

exports.LoginModalComponent = LoginModalComponent;
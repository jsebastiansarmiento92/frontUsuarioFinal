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
exports.LandingComponent = void 0;
var core_1 = require("@angular/core");
var lugar_1 = require("src/app/models/lugar");
var LandingComponent = /** @class */ (function() {
    function LandingComponent(router, barrioService, authService, tokenService, serviceLugar) {
        this.router = router;
        this.barrioService = barrioService;
        this.authService = authService;
        this.tokenService = tokenService;
        this.serviceLugar = serviceLugar;
        this.setState = false;
        this.isLogged = false;
        this.isLoginFail = false;
        this.roles = [];
        this.loader = false;
        this.barrios = [];
        this.cargaBarrios = false;
        this.tipoDirecciones = [];
        this.barrioSeleccionado = '0';
        this.tipoDireccionSeleccionado = '0';
        this.telefono = "";
        //busquedaBarrio="";
        this.searchText = "";
        /**
         * Shows or hide the search elements
         * @var {boolean} searching
         */
        this.searching = false;
    }
    LandingComponent.prototype.ngOnInit = function() {
        // this.autenticarToken();
        this.autenticar();
        console.log("ingreso metodo ngOninit landing");
        if (!localStorage.getItem('barrios')) {
            this.cargarBarrios();
        } else
            this.barrios = JSON.parse(localStorage.getItem('barrios'));
        this.llenarTipodirecciones();
    };
    LandingComponent.prototype.reanudarSesion = function() {
        if (localStorage.getItem("idSesion") != null) {
            var data = JSON.parse(localStorage.getItem('idSesion'));
            this.tokenService.setUserName(data.name);
            this.tokenService.setAuthorities(data.rol);
            this.tokenService.setIdUser(data.id);
            this.tokenService.setLugar(data.idLugar);
            this.tokenService.setEstadoUsuario(data.estado);
            //this.router.navigate(['inicio']);
        }
    };
    LandingComponent.prototype.autenticarToken = function() {
        var _this = this;
        this.urlTree = this.router.parseUrl(this.router.url);
        this.token = this.urlTree.queryParams['token'];
        this.error = this.urlTree.queryParams['error'];
        if (this.token == null) {
            console.log("no hay token guardado");
        } else if (this.token.length > 1) {
            window.sessionStorage.setItem('AuthToken', this.token);
            window.localStorage.setItem('AuthToken', this.token);
        }
        console.log("token llegando es:");
        console.log(this.token);
        console.log("error llegando es ");
        console.log(this.error);
        if (window.sessionStorage.getItem('AuthToken')) {
            console.log("hay tonken guardado porque ingresa al if");
            this.authService.getCurrentUser().subscribe(function(data) {
                console.log(data);
                //this.tokenService.setToken(data.token);
                window.localStorage.setItem("idSesion", JSON.stringify(data));
                _this.tokenService.setUserName(data.name);
                _this.tokenService.setAuthorities(data.rol);
                _this.tokenService.setIdUser(data.id);
                _this.tokenService.setLugar(data.idLugar);
                //alert("id del usuario lopueado es "+data.id);
                //window.sessionStorage.setItem("idSesion",data.);
                _this.isLogged = true;
                _this.isLoginFail = false;
                _this.roles = _this.tokenService.getAuthorities();
                localStorage.setItem('isLoggedin', 'true');
                //window.location.reload();
                _this.router.navigate(['inicio']);
                _this.loader = false;
            });
        }
    };
    LandingComponent.prototype.autenticar = function() {
        var _this = this;
        if (window.localStorage.getItem('AuthToken')) {
            window.sessionStorage.setItem('AuthToken', window.localStorage.getItem('AuthToken'));
            console.log("hay tonken guardado porque ingresa al if");
            this.authService.getCurrentUser().subscribe(function(data) {
                console.log(data);
                //this.tokenService.setToken(data.token);
                window.localStorage.setItem("idSesion", JSON.stringify(data));
                _this.tokenService.setUserName(data.name);
                _this.tokenService.setAuthorities(data.rol);
                _this.tokenService.setIdUser(data.id);
                _this.tokenService.setLugar(data.idLugar);
                //alert("id del usuario lopueado es "+data.id);
                //window.sessionStorage.setItem("idSesion",data.);
                _this.isLogged = true;
                _this.isLoginFail = false;
                _this.roles = _this.tokenService.getAuthorities();
                localStorage.setItem('isLoggedin', 'true');
                //window.location.reload();
                //this.router.navigate(['inicio']);
                _this.loader = false;
            });
        }
        this.reanudarSesion();
    };
    LandingComponent.prototype.inicio = function() {
        var _this = this;
        if (localStorage.getItem('cambioDireccion')) {
            if (localStorage.getItem('cambioDireccion') == 'false') {
                localStorage.setItem('cambioDireccion', 'true');
            }
        }
        var lugar = new lugar_1.Lugar();
        lugar.barrio = this.barrio;
        lugar.direccionLugar = this.tipoDireccionSeleccionado + " " + this.n1 + "#" + this.n2 + "-" + this.n3;
        lugar.idUsuario = parseInt(sessionStorage.getItem("IdSesion"));
        if (parseInt(sessionStorage.getItem("IdLugar")) != 0) {
            this.promesaModificarLugar(lugar);
            window.localStorage.setItem("lugar", JSON.stringify(lugar));
            window.sessionStorage.setItem("telefono", this.telefono);
            console.log("oprimidio inicio");
            this.router.navigate(["inicio"]);
        } else {
            this.serviceLugar.createLugar(lugar).subscribe(function(data) {
                console.log(data);
                _this.serviceLugar.getLugaresIdUsuario1(parseInt(sessionStorage.getItem("IdSesion"))).subscribe(function(data) {
                    sessionStorage.setItem("IdLugar", data[0].idLugar);
                });
            });
            window.localStorage.setItem("lugar", JSON.stringify(lugar));
            console.log("oprimidio inicio");
            this.router.navigate(["inicio"]);
        }
    };
    LandingComponent.prototype.promesaModificarTelefono = function() {};
    LandingComponent.prototype.cargarBarrios = function() {
        var _this = this;
        this.cargaBarrios = true;
        this.barrioService.getBarrios().subscribe(function(data) {
            for (var i = 0; i < data.length; i++) {
                _this.barrios.push(data[i]);
            }
            _this.barrios = data;
            console.log("barrios cargados");
            console.log(data);
            localStorage.setItem("barrios", JSON.stringify(data));
            _this.cargaBarrios = false;
            location.reload();
        });
    };
    LandingComponent.prototype.promesaModificarLugar = function(lugar) {
        var _this = this;
        console.log("id del lugar guadados son: ");
        console.log(sessionStorage.getItem('IdLugar'));
        localStorage.setItem("lugar", JSON.stringify(lugar));
        lugar.idLugar = parseInt(sessionStorage.getItem('IdLugar'));
        this.serviceLugar.modificarLugar(lugar).subscribe(function(data) {
            console.log("se ha modificado un lugar");
        }, function(err) {
            if (err.error.mensaje === undefined) {
                //alert("debe ingresar o registrarse");
                _this.router.navigate(["inicio"]);
            }
            console.log(err.error.mensaje);
        });
    };
    LandingComponent.prototype.llenarTipodirecciones = function() {
        this.tipoDirecciones.push("Carrera");
        this.tipoDirecciones.push("Avenida");
        this.tipoDirecciones.push("Avenida Carrera");
        this.tipoDirecciones.push("Avenida Calle");
        this.tipoDirecciones.push("Circular");
        this.tipoDirecciones.push("Circunvalar");
        this.tipoDirecciones.push("Diagonal");
        this.tipoDirecciones.push("Manzana");
        this.tipoDirecciones.push("Transversal");
    };
    LandingComponent.prototype.capturarBarrio = function() {
        this.getBarrio();
        console.log("barrio seleccionado ");
        console.log(this.barrio);
    };
    LandingComponent.prototype.getBarrio = function() {
        var _this = this;
        this.barrios.forEach(function(element) {
            if (element.nombreBarrio == _this.barrioSeleccionado) {
                _this.barrio = element;
            }
        });
    };
    /**
     * Show the search results based in the faqs
     * @function showSearchResults
     * @param {any} event
     * @return {void}
     */
    LandingComponent.prototype.showSearchResults = function(event) {
        if (event.target.value.length >= 2) {
            this.searching = true;
        } else {
            this.searching = false;
        }
    };
    LandingComponent = __decorate([
        core_1.Component({
            selector: 'app-landing',
            templateUrl: './landing.component.html',
            styleUrls: ['./landing.component.css']
        })
    ], LandingComponent);
    return LandingComponent;
}());
exports.LandingComponent = LandingComponent;
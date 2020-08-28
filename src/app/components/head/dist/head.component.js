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
var usuario_1 = require("src/app/models/usuario");
var HeadComponent = /** @class */ (function () {
    function HeadComponent(tokenService, router, lugarService, serviceModal, usuarioService, pedidoService, detalleServicioService) {
        this.tokenService = tokenService;
        this.router = router;
        this.lugarService = lugarService;
        this.serviceModal = serviceModal;
        this.usuarioService = usuarioService;
        this.pedidoService = pedidoService;
        this.detalleServicioService = detalleServicioService;
        this.isLogin = false;
        this.lugar = new lugar_1.Lugar();
        this.refreshHead = false;
        this.nombreUsuario = "";
        this.telefono = "sin guardar";
        this.mensajeTramitando = "";
    }
    HeadComponent.prototype.ngOnInit = function () {
        if (JSON.parse(localStorage.getItem('lugar'))) {
            console.log("hay lugar guardado en el localstorage");
            this.lugar = JSON.parse(localStorage.getItem('lugar'));
        }
        if (window.sessionStorage.getItem("Telefono")) {
            if (window.sessionStorage.getItem("Telefono") != "0") {
                this.telefono = window.sessionStorage.getItem("Telefono");
            }
        }
        if (window.sessionStorage.getItem("ImageUrl")) {
            if (window.sessionStorage.getItem("ImageUrl") != "") {
                this.imagePerfil = window.sessionStorage.getItem("ImageUrl");
            }
        }
        console.log(this.lugar);
        console.log("verificacion is login");
        //this.lugar=new Lugar();
        this.mostrarNombreSesion();
        if (this.tokenService.getToken() == null) {
            console.log("se limpia el locar storage en inicio");
            localStorage.removeItem("isLoggedin");
        }
        if (localStorage.getItem("isLoggedin") && this.refreshHead) {
            if (localStorage.getItem("isLoggedin") == 'true') {
                console.log("ingreso a guardar mi direccions");
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
        if (sessionStorage.getItem("IdLugar") == "0") {
            console.log("no se extrae lugar de ningun lado");
        }
        else {
            this.lugarService.getLugarId(parseInt(sessionStorage.getItem("IdLugar"))).subscribe(function (data) {
                _this.lugar = data;
            });
        }
    };
    HeadComponent.prototype.guardarTelefonoModalOpen = function (modal) {
        //this.telefono="";
        //alert("se recomienda ingresar numero de contacto ")
        this.serviceModal.open(modal);
    };
    HeadComponent.prototype.closeModal = function () {
        this.serviceModal.dismissAll();
    };
    HeadComponent.prototype.guardarUsuario = function () {
        var _this = this;
        var usuario = new usuario_1.Usuario();
        console.log("nombre de usuario: " + this.nombreUsuario);
        usuario.name = this.nombreUsuario;
        usuario.id = parseInt(window.sessionStorage.getItem("IdSesion"));
        usuario.telefono = this.telefono;
        if ((this.telefono + "").length > 6) {
            this.mensajeTramitando = "Guardando informacion";
            this.serviceModal.open(this.tramitandoModal);
            this.usuarioService.updateUsuario(usuario, parseInt(window.sessionStorage.getItem("IdSesion"))).subscribe(function (data) {
                alert(data.mensaje);
                window.sessionStorage.setItem("Telefono", _this.telefono + "");
                _this.serviceModal.dismissAll();
            }, function (err) {
                console.log(err.error.mensaje);
                _this.telefono = window.sessionStorage.getItem("Telefono");
            });
        }
        else
            alert("numero de contacto no valido");
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
    HeadComponent.prototype.cargarPedidosCliente = function () {
        var _this = this;
        this.mensajeTramitando = "cargando pedidos";
        this.serviceModal.open(this.tramitandoModal);
        this.pedidoService.getPedidosCliente(parseInt(window.sessionStorage.getItem("IdSesion"))).subscribe(function (data) {
            console.log("pedidos extraidos");
            console.log(data);
            _this.pedidos = data;
            _this.serviceModal.dismissAll();
        });
    };
    HeadComponent.prototype.detallePedido = function (pedido, modal) {
        var _this = this;
        this.pedido = pedido;
        this.serviceModal.open(modal);
        this.detalleServicioService.getDetalles(pedido.id).subscribe(function (data) {
            console.log("detalles encontrados son: ");
            console.log(data);
            _this.detalleServicios = data;
        });
    };
    __decorate([
        core_1.ViewChild('guardarTelefonoModal', { static: false })
    ], HeadComponent.prototype, "guardarTelefonoModal");
    __decorate([
        core_1.ViewChild('tramitandoModal', { static: false })
    ], HeadComponent.prototype, "tramitandoModal");
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

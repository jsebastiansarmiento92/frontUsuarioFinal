"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarritoComponent = void 0;
var core_1 = require("@angular/core");
var barrio_1 = require("src/app/models/barrio");
var pedido_1 = require("src/app/models/pedido");
var servicio_1 = require("src/app/models/servicio");
var lugar_1 = require("src/app/models/lugar");
var detalle_servicio_1 = require("src/app/models/detalle-servicio");
var CarritoComponent = /** @class */ (function () {
    function CarritoComponent(pedidoService, tokenService, detalleServicioService, servicioService, serviceModal, serviceBarrio, serviceLugar, serviceUsuario) {
        this.pedidoService = pedidoService;
        this.tokenService = tokenService;
        this.detalleServicioService = detalleServicioService;
        this.servicioService = servicioService;
        this.serviceModal = serviceModal;
        this.serviceBarrio = serviceBarrio;
        this.serviceLugar = serviceLugar;
        this.serviceUsuario = serviceUsuario;
        this.productos = [];
        this.barrios = [];
        this.barrio = new barrio_1.Barrio();
        this.pedido = new pedido_1.Pedido();
        this.servicio = new servicio_1.Servicio();
        this.lugar = new lugar_1.Lugar();
        this.lugares = [];
        this.loader = true;
        this.barrioSeleccionado = "";
        this.loaderPedido = false;
        this.isPrimeraVezLugar = false;
    }
    CarritoComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("get carrito en oinit");
        this.getCarrito();
        var idLugar = this.tokenService.getLugar();
        console.log("id de lugar de usuario es ");
        console.log(idLugar);
        if (idLugar != '0') {
            this.serviceLugar.getLugarId(parseInt(idLugar)).subscribe(function (data) {
                _this.lugar = data;
                _this.totalServicio = _this.getValorPedido();
            });
        }
    };
    CarritoComponent.prototype.getCarrito = function () {
        console.log(JSON.parse(localStorage.getItem('myCar')));
        this.productos = JSON.parse(localStorage.getItem('myCar'));
        console.log(this.productos);
        // console.log("carrito pendiente");
        // console.log('objetoObtenido: ', this.productos);
    };
    CarritoComponent.prototype.modalDetallePedido = function (modal) {
        console.log("detalle de modal activo");
        console.log(this.getidLugar());
        if (this.getidLugar() == 0) {
            if (confirm('No tiene direccion guardada de domicilio, ¿desea guardar una?')) {
                this.isPrimeraVezLugar = true;
                this.asignarLugarNuevo();
            }
        }
        else {
            console.log("detalle de modal despues de condicional");
            this.modalDetalle = modal;
            console.log("detalle del pedido es:");
            console.log(this.pedido);
            this.serviceModal.open(modal);
        }
    };
    CarritoComponent.prototype.confirmarPedido = function () {
        var _this = this;
        if (!confirm('¿Estás seguro desea confirmar el servicio?')) {
        }
        else {
            console.log("id lugar de la sesion es " + this.getidLugar());
            if (this.getidLugar() == 0) {
                if (confirm('No tiene direccion guardada de domicilio, ¿desea guardar una?')) {
                    this.asignarLugarNuevo();
                }
                else {
                }
            }
            else {
                this.serviceLugar.getLugarId(this.getidLugar()).subscribe(function (data) {
                    _this.lugar = data;
                    if (confirm('valor total del pedido: $' + _this.getValorPedido() + ' ¿Estás seguro desea confirmar el pedido?')) {
                        _this.confirmarTransaccion();
                    }
                });
            }
        }
    };
    CarritoComponent.prototype.getValorPedido = function () {
        var valor = 0;
        if (this.productos != null) {
            this.productos.forEach(function (element) {
                valor += (element.cantidad * element.valorProducto);
            });
        }
        if (this.lugar.barrio.tipoCosto == "COSTO1") {
            valor += 4000;
            this.ganancia = 4000;
        }
        else {
            valor += 7000;
            this.ganancia = 7000;
        }
        return valor;
    };
    CarritoComponent.prototype.confirmarTransaccion = function () {
        this.loaderPedido = true;
        this.pedido.idCliente = this.getidSesion();
        this.pedido.lugar = this.lugar;
        // this.pedido.idEmpresa = this.productos[0].empresa.idEmpresa;
        this.pedido.modoPagoPedido = "Efectivo";
        this.pedido.estadoPedido = "En proceso";
        this.pedido.valorComision = 0;
        this.pedido.valorGanancia = 0;
        this.pedido.valorTotalPedido = 0;
        this.serviceModal.dismissAll();
        console.log("valor gananacia " + this.ganancia);
        this.pedido.valorGanancia = this.ganancia;
        console.log("ingreso a crear el pedido");
        console.log(this.pedido);
        /** this.pedidoService.createPedido(this.pedido).subscribe(data => {
           this.detalleServicioService.getServicio(this.pedido.idEmpresa, this.pedido.idCliente).subscribe(data => {
             console.log("servicio extraido es");
             console.log(data);
             this.servicio = data;
             this.idservicio = data.id;
             console.log("id de servicio " + this.idservicio);
             this.llenarDetalle(this.idservicio);
             this.solicitarPedido();
           })
         }, (err: any) => {
           
           console.log(err.error.mensaje)
         }); */
    };
    CarritoComponent.prototype.solicitarPedido = function () {
        var _this = this;
        console.log("listo para extraer pedido ");
        console.log(this.servicio);
        this.pedidoService.getPedido(this.servicio.idPedido).subscribe(function (data) {
            // this.pedido=data;
            console.log("lugar obtenido es ");
            console.log(data);
            _this.tokenService.setLugar(data.lugar.idLugar + "");
            _this.loaderPedido = false;
        });
    };
    CarritoComponent.prototype.getidSesion = function () {
        return parseInt(this.tokenService.getIdUser());
    };
    CarritoComponent.prototype.getidLugar = function () {
        return parseInt(this.tokenService.getLugar());
    };
    CarritoComponent.prototype.llenarDetalle = function (idServicio) {
        var _this = this;
        var estadoServicio = "Activo";
        console.log(this.productos);
        this.productos.forEach(function (element) {
            var detalleServicio = new detalle_servicio_1.DetalleServicio();
            detalleServicio.idServicio = idServicio;
            detalleServicio.producto = element;
            detalleServicio.valorUnitario = element.valorProducto;
            detalleServicio.cantidad = element.cantidad;
            _this.detalleServicioService.createDetalleServicio(detalleServicio).subscribe(function (data) {
                console.log("detalle servicio agregado");
                //alert("Pedido guardado");
                //this.ngOnInit();
                localStorage.removeItem('myCar');
            }, function (err) {
                estadoServicio = "Error";
            });
        });
        this.servicio.estadoServicio = estadoServicio;
        this.servicioService.updateServicio(this.servicio).subscribe(function (data) {
            console.log(data.mensaje);
            alert(data.mensaje);
            _this.ngOnInit();
        }, function (err) {
            console.log(err.error.mensaje);
        });
    };
    CarritoComponent.prototype.cancelarCarrito = function () {
        if (confirm('¿Estás seguro desea cancelar el carrito?')) {
            localStorage.removeItem('myCar');
        }
    };
    CarritoComponent.prototype.asignarLugarNuevo = function () {
        var _this = this;
        //this.pedido = pedido;
        // this.getDomiciliariosDisponibles();
        // this.serviceModal.dismissAll();
        //this.getLugaresUsuario();
        this.serviceModal.open(this.agregarDireccionNueva);
        this.serviceBarrio.getBarrios().subscribe(function (data) {
            _this.barrios = data;
            console.log("barrios cargados");
            console.log(_this.barrios);
            _this.loader = false;
        });
    };
    CarritoComponent.prototype.capturar = function () {
        this.getBarrio();
        console.log("barrio seleccionado ");
        console.log(this.barrio);
    };
    CarritoComponent.prototype.getBarrio = function () {
        var _this = this;
        this.barrios.forEach(function (element) {
            if (element.nombreBarrio == _this.barrioSeleccionado) {
                _this.barrio = element;
            }
        });
    };
    CarritoComponent.prototype.confirmarDireccion = function () {
        var _this = this;
        this.lugar.barrio = this.barrio;
        this.lugar.direccionLugar = this.direccion;
        this.lugar.idUsuario = this.getidSesion();
        console.log("datos de lugar");
        console.log(this.lugar);
        this.totalServicio = this.getValorPedido();
        if (this.isPrimeraVezLugar) {
            this.serviceLugar.createLugar(this.lugar).subscribe(function (data) {
                if (confirm('valor total del pedido: $' + _this.getValorPedido() + '¿Estás seguro desea confirmar el pedido?')) {
                    _this.confirmarTransaccion();
                }
            }, function (err) {
                console.log(err.error.mensaje);
            });
            this.serviceModal.dismissAll();
            this.serviceModal.open(this.modalDetalle);
        }
        else {
            this.serviceLugar.createLugar(this.lugar).subscribe(function (data) {
                alert(data);
            }, function (err) {
                console.log(err.error.mensaje);
            });
            this.serviceModal.dismissAll();
            this.serviceModal.open(this.modalDetalle);
        }
    };
    CarritoComponent.prototype.getLugaresUsuario1 = function () {
        var _this = this;
        this.serviceLugar.getLugaresIdUsuario1(parseInt(this.tokenService.getIdUser())).subscribe(function (data) {
            console.log("listado de lugares del usuario");
            console.log(data);
            _this.lugares = data;
        });
    };
    __decorate([
        core_1.ViewChild('agregarDireccionNueva', { static: false })
    ], CarritoComponent.prototype, "agregarDireccionNueva");
    CarritoComponent = __decorate([
        core_1.Component({
            selector: 'app-carrito',
            templateUrl: './carrito.component.html',
            styleUrls: ['./carrito.component.css']
        })
    ], CarritoComponent);
    return CarritoComponent;
}());
exports.CarritoComponent = CarritoComponent;

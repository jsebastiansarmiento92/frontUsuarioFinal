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
exports.InicioComponent = void 0;
var core_1 = require("@angular/core");
var producto_1 = require("src/app/models/producto");
var barrio_1 = require("src/app/models/barrio");
var pedido_1 = require("src/app/models/pedido");
var servicio_1 = require("src/app/models/servicio");
var detalle_servicio_1 = require("src/app/models/detalle-servicio");
var empresa_1 = require("src/app/models/empresa");
var SockJS = require("sockjs-client");
var Stomp = require("stompjs");
var usuario_1 = require("src/app/models/usuario");
var InicioComponent = /** @class */ (function() {
    function InicioComponent(productosService, imagenService, serviceModal, router, categoriaService, tokenService, serviceBarrio, serviceLugar, pedidoService, detalleServicioService, servicioService, empresaService, socketService, usuarioService) {
        this.productosService = productosService;
        this.imagenService = imagenService;
        this.serviceModal = serviceModal;
        this.router = router;
        this.categoriaService = categoriaService;
        this.tokenService = tokenService;
        this.serviceBarrio = serviceBarrio;
        this.serviceLugar = serviceLugar;
        this.pedidoService = pedidoService;
        this.detalleServicioService = detalleServicioService;
        this.servicioService = servicioService;
        this.empresaService = empresaService;
        this.socketService = socketService;
        this.usuarioService = usuarioService;
        this.idEmpresa = 0;
        this.valorServicio = 0;
        this.tramitando = false;
        this.tipoDireccionSeleccionada = "";
        this.barrioSeleccionado = "";
        this.busquedaSeleccionada = "";
        this.barrio = new barrio_1.Barrio();
        this.pedido = new pedido_1.Pedido();
        this.servicio = new servicio_1.Servicio();
        this.producto = new producto_1.Producto();
        this.productoSeleccionado = "";
        this.telefono = "";
        this.show = false;
        this.loaderPedido = true;
        this.loader = false;
        this.empresaSelected = false;
        this.barrios = [];
        this.productosCarrito = [];
        this.categorias = [];
        this.tipoDirecciones = [];
        this.productos = [];
        this.empresas = [];
        this.empresasTemporal = [];
        this.totalPedido = 0;
        this.categoriaActual = " ";
        /**
         * Shows or hide the search elements
         * @var {boolean} searching
         */
        this.searching = false;
        this.serverUrl = 'https://quickdomicilios.herokuapp.com/' + 'socket';
        this.isLoaded = false;
        this.isCustomSocketOpened = false;
        this.messages = [];
        this.searchText = "";
    }
    InicioComponent.prototype.ngOnInit = function() {
        var _this = this;
        //this.llenarTipodirecciones();
        if (localStorage.getItem("reabrirCarrito")) {
            if (localStorage.getItem("reabrirCarrito") == 'true')
                this.showF();
        }
        this.cargarProductos();
        if (JSON.parse(localStorage.getItem('myCar')) != null) {
            this.getCarrito();
        }
        this.initializeWebSocketConnection();
        //console.log("verificacion variable de cambio de direccion");
        //console.log(localStorage.getItem('cambioDireccion') == 'true');
        if (window.localStorage.getItem('lugar')) {
            //console.log("hay lugar guardado en el localstorage");
            this.lugar = JSON.parse(window.localStorage.getItem('lugar'));
            this.barrio = this.lugar.barrio;
            this.direccionCompleta = this.lugar.direccionLugar;
            //console.log("lugar que llega es:");
            //console.log(this.lugar);
            this.asignarCosto();
            this.totalPedido = this.calcular();
            this.promesaModificarLugarHead();
        }
        //console.log("datos del telefono en el localstorage en ngoinit: ");
        //console.log(window.sessionStorage.getItem("Telefono"));
        if (window.sessionStorage.getItem("Telefono")) {
            this.telefono = window.sessionStorage.getItem("Telefono");
        }
        // //console.log("refreshpage es "+localStorage.getItem("refreshPage"));
        if (this.tokenService.getToken() == null) {
            // localStorage.clear();
            //console.log("se limpia el locar storage en inicio");
            localStorage.setItem("isLoggedin", "false");
        } else {
            localStorage.setItem('isLoggedin', 'true');
        }
        //console.log("id de lugar entrante es:");
        //console.log(parseInt(this.tokenService.getLugar()));
        if (localStorage.getItem('cambioDireccion') == 'true') {
            this.lugar = JSON.parse(window.localStorage.getItem('lugar'));
            this.barrio = this.lugar.barrio;
            this.direccionCompleta = this.lugar.direccionLugar;
            //console.log("lugar que llega es:");
            //console.log(this.lugar);
            this.asignarCosto();
            this.totalPedido = this.calcular();
        } else if (parseInt(this.tokenService.getLugar()) != 0) {
            //console.log("hay lugar guardado del usuario");
            //console.log("lugar guardado desde el landing");
            //console.log(this.lugar);
            this.serviceLugar.getLugarId(parseInt(this.tokenService.getLugar())).subscribe(function(data) {
                _this.totalPedido = _this.calcular();
                _this.barrio = data.barrio;
                _this.direccionCompleta = data.direccionLugar;
                _this.lugar = data;
                _this.asignarCosto();
            });
        } else {}
        //this.cargarProductos();
        this.cargarEmpresas();
        //this.cargarCategorias();
    };
    InicioComponent.prototype.initializeWebSocketConnection = function() {
        var ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        var that = this;
        this.stompClient.connect({}, function(frame) {
            that.isLoaded = true;
            //console.log("quiere decir qu ya hizo conexion con socket");
            that.openGlobalSocket();
            that.openSocket();
        });
    };
    InicioComponent.prototype.openGlobalSocket = function() {
        var _this = this;
        this.stompClient.subscribe("/socket-publisher", function(message) {
            _this.handleResult(message);
        });
    };
    InicioComponent.prototype.promesaModificarLugarHead = function() {
        //console.log("id del lugar guadados son: ");
        //console.log(sessionStorage.getItem('IdLugar'));
        this.lugar.idLugar = parseInt(sessionStorage.getItem('IdLugar'));
        this.serviceLugar.modificarLugar(this.lugar).subscribe(function(data) {}, function(err) {
            if (err.error.mensaje === undefined) {
                // alert("debe ingresar o registrarse");
                //this.serviceModal.open(this.loginModal);
                //this.router.navigate(["login"]);
            }
            //console.log(err.error.mensaje);
        });
    };
    InicioComponent.prototype.openSocket = function() {
        var _this = this;
        //console.log(this.isLoaded);
        //console.log("ingresa a estos metodos de sockets");
        if (this.isLoaded) {
            this.isCustomSocketOpened = true;
            //console.log("id de usuario actual listo para recibir mensajes es " + this.tokenService.getIdUser());
            this.stompClient.subscribe("/socket-publisher/" + this.tokenService.getIdUser(), function(message) {
                _this.handleResult(message);
            });
        }
    };
    InicioComponent.prototype.handleResult = function(message) {
        if (message.body) {
            var messageResult = JSON.parse(message.body);
            //console.log(messageResult);
            this.messages.push(messageResult);
            /**  this.toastr.success("new message recieved", null, {
               'timeOut': 3000
             });*/
            //this.showNotification("Notificación", messageResult.message);
            //this.showPushNotification("Notificación", "Mensaje recibido");
            //console.log("ingreso de vibracion");
            //Haptics.vibrate();
            //console.log("ingreso de notificacion local");
            /** const notifs =  LocalNotifications.schedule({
                 notifications: [
                   {
                     title: "Alerta de novedad",
                     body: messageResult.message,
                     id: 1,
                    // schedule: { at: new Date(Date.now() + 1000 * 5) },
                     sound: null,
                     attachments: null,
                     actionTypeId: "",
                     extra: null
                   }
                 ]
               });
               //console.log('scheduled notifications', notifs); */
            // Method called when tapping on a notification
        }
    };
    InicioComponent.prototype.conductor = function() {
        this.empresaSelected = false;
        this.empresas = this.empresasTemporal;
        //console.log("ingreso a conductor padre");
        var empresasSeleccion = [];
        this.empresas.forEach(function(element) {
            element.categorias.forEach(function(element2) {
                if (element2.dependencia.idCategoria == 9) {
                    empresasSeleccion.push(element);
                }
            });
        });
        this.empresas = empresasSeleccion;
        this.categoriaActual = "Conductor";
        this.cargarCategorias();
    };
    InicioComponent.prototype.domicilios = function() {
        this.empresaSelected = false;
        this.empresas = this.empresasTemporal;
        //console.log("ingreso a domicilios padre");
        var empresasSeleccion = [];
        this.empresas.forEach(function(element) {
            element.categorias.forEach(function(element2) {
                if (element2.dependencia.idCategoria == 8) {
                    empresasSeleccion.push(element);
                }
            });
        });
        this.empresas = empresasSeleccion;
        this.categoriaActual = "Domicilio";
        this.cargarCategorias();
    };
    InicioComponent.prototype.licores = function() {
        this.empresaSelected = false;
        this.empresas = this.empresasTemporal;
        //console.log("ingreso a licores padre");
        //console.log(this.empresas);
        var empresasSeleccion = [];
        this.empresas.forEach(function(element) {
            element.categorias.forEach(function(element2) {
                if (element2.dependencia.idCategoria == 7) {
                    empresasSeleccion.push(element);
                }
            });
        });
        this.empresas = empresasSeleccion;
        this.categoriaActual = "Licores";
        this.cargarCategorias();
    };
    InicioComponent.prototype.viveres = function() {
        this.empresaSelected = false;
        this.empresas = this.empresasTemporal;
        //console.log("ingreso a viveres padre");
        var empresasSeleccion = [];
        this.empresas.forEach(function(element) {
            element.categorias.forEach(function(element2) {
                if (element2.dependencia.idCategoria == 6) {
                    empresasSeleccion.push(element);
                }
            });
        });
        this.empresas = empresasSeleccion;
        this.categoriaActual = "Viveres";
        this.cargarCategorias();
    };
    InicioComponent.prototype.drogueria = function() {
        this.empresaSelected = false;
        //console.log("ingreso a drogueria padre");
        this.empresas = this.empresasTemporal;
        var empresasSeleccion = [];
        //console.log(this.empresas);
        this.empresas.forEach(function(element) {
            element.categorias.forEach(function(element2) {
                if (element2.dependencia.idCategoria == 4) {
                    empresasSeleccion.push(element);
                }
            });
        });
        this.empresas = empresasSeleccion;
        this.categoriaActual = "MEDICAMENTOS";
        this.cargarCategorias();
    };
    InicioComponent.prototype.restaurantes = function() {
        this.empresaSelected = false;
        //console.log("ingreso a restaurantes padre");
        this.empresas = this.empresasTemporal;
        var empresasSeleccion = [];
        this.empresas.forEach(function(element) {
            //console.log(element.razonSocial);
            var introIf = false;
            element.categorias.forEach(function(element2) {
                //console.log("cosas que tiene elemento 2");
                if (!introIf) {
                    if (element2.dependencia.idCategoria == 5) {
                        introIf = true;
                        empresasSeleccion.push(element);
                    }
                }
            });
        });
        this.empresas = empresasSeleccion;
        this.categoriaActual = "Restaurantes";
        this.cargarCategorias();
    };
    InicioComponent.prototype.cargarEmpresas = function() {
        var _this = this;
        this.empresaSelected = false;
        this.empresaService.getEmpresas().subscribe(function(data) {
            _this.empresas = data;
            //console.log("empresas cargadas");
            //console.log(_this.empresas);
            _this.empresasTemporal = data;
            _this.empresas.forEach(function(element) {
                //console.log("id de las imagenes de los productos" + element.imagen);
                _this.imagenService.getImageId(element.imagen).subscribe(function(data) {
                    _this.retrieveResonse = data;
                    //console.log(data);
                    _this.base64Data = _this.retrieveResonse.picByte;
                    //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                    element.retrievedImage = 'data:image/jpeg;base64,' + _this.base64Data;
                    //console.log(_this.retrievedImage);
                });
            });
        });
    };
    InicioComponent.prototype.llenarTipodirecciones = function() {
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
    InicioComponent.prototype.cargarProductos = function() {
        var _this = this;
        //console.log("metodo de listar productos oinit");
        this.productosService.listarUsuarioFinal().subscribe(function(data) {
            _this.productos = data;
            //console.log(_this.productos);
            _this.productos.forEach(function(element) {
                //console.log("id de las imagenes de los productos" + element.imagen);
                _this.imagenService.getImageId(element.imagen).subscribe(function(data) {
                    _this.retrieveResonse = data;
                    //console.log(data);
                    _this.base64Data = _this.retrieveResonse.picByte;
                    //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                    element.retrievedImage = 'data:image/jpeg;base64,' + _this.base64Data;
                    //console.log(_this.retrievedImage);
                });
            });
            // this.loader = false;
        });
    };
    InicioComponent.prototype.ordenarProducto = function(producto, modal) {
        if (localStorage.getItem("isLoggedin")) {
            this.producto = producto;
            this.serviceModal.open(modal);
        } else {
            this.router.navigate(["login"]);
        }
    };
    InicioComponent.prototype.confirmarAgregar = function() {
        if (this.idEmpresa == 0) {
            this.idEmpresa = this.producto.empresa.idEmpresa;
        } else if (this.idEmpresa != this.producto.empresa.idEmpresa) {
            alert("no es posible solicitar productos de dos empresas en un mismo servicio");
        } else {
            this.verificarRepetidos(this.producto);
            //console.log("agregando al local storage:");
            //console.log(this.productosCarrito);
            localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
            this.serviceModal.dismissAll();
            this.totalPedido = this.calcular();
        }
    };
    InicioComponent.prototype.verificarRepetidos = function(producto) {
        var isRepetido = false;
        this.productosCarrito.forEach(function(element) {
            if (element.nombreProducto == producto.nombreProducto) {
                //console.log("producto ya solicitado anteriormente");
                isRepetido = true;
            }
        });
        if (!isRepetido)
            this.productosCarrito.push(producto);
    };
    InicioComponent.prototype.cargarCategorias = function() {
        var _this = this;
        if (this.categoriaActual != "Todas las Categorias") {
            this.categoriaService.getCategoriasDependencia(this.categoriaActual).subscribe(function(data) {
                //console.log("ingreso de categoprias con dependencia");
                //console.log(data);
                _this.categorias = data;
            });
        }
        /**this.categoriaService.getCategoriasUsuarioFinal().subscribe(data => {
    
         // this.categorias = data;
          data.forEach(element => {
            if(element.dependencia!=null){
              this.categorias.push(element);
            }
          });
        })*/
    };
    InicioComponent.prototype.showF = function() {
        //console.log("ingreso de show");
        if (this.show) {
            this.show = false;
        } else {
            this.show = true;
        }
    };
    InicioComponent.prototype.getCarrito = function() {
        //console.log(JSON.parse(localStorage.getItem('myCar')));
        this.productosCarrito = JSON.parse(localStorage.getItem('myCar'));
        //console.log("carrito de local storage");
        //console.log(this.productosCarrito);
        if (this.productosCarrito.length <= 0) {
            //console.log("carrito vacio");
        } else
            this.idEmpresa = this.productosCarrito[0].empresa.idEmpresa;
        this.totalPedido = this.calcular();
    };
    InicioComponent.prototype.calcular = function() {
        var total = 0;
        this.productosCarrito.forEach(function(element) {
            total += (element.cantidad * element.valorProducto);
        });
        return total;
    };
    InicioComponent.prototype.quitarProducto = function(producto) {
        var i = this.productosCarrito.indexOf(producto);
        if (i !== -1) {
            this.productosCarrito.splice(i, 1);
            this.totalPedido = this.calcular();
        }
        //console.log("productos en mycar antes del if");
        if (this.verificarCarrito) {
            this.idEmpresa = 0;
        }
        localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
    };
    InicioComponent.prototype.sumarCantidad = function(producto) {
        producto.cantidad += 1;
        this.totalPedido = this.calcular();
        localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
    };
    InicioComponent.prototype.restarCantidad = function(producto) {
        producto.cantidad -= 1;
        this.totalPedido = this.calcular();
        if (this.verificarCarrito) {
            this.idEmpresa = 0;
        }
        localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
    };
    InicioComponent.prototype.verificarCarrito = function() {
        //console.log("productos en mycar");
        //console.log(localStorage.getItem('myCar'));
        if (this.productosCarrito.length <= 0) {
            return false;
        } else
            return false;
    };
    InicioComponent.prototype.agregarBarrio = function(modal) {
        var _this = this;
        //console.log("modal activo de barrio");
        //console.log(this.getidLugar());
        //console.log("datos de direccion son " + this.tipoDireccionSeleccionada + "-" + this.n1 + "-" + this.n2 + "-" + this.n3);
        if ((this.n1 <= 0 || this.n2 <= 0) || (this.n1 === undefined || this.n2 === undefined) || this.tipoDireccionSeleccionada === "") {
            if (this.tipoDireccionSeleccionada === "") {
                alert("Tipo de direccion no seleccionada");
            } else
                alert("campos vacios por favor validar");
        } else {
            this.direccionCompleta = this.tipoDireccionSeleccionada + " -" + this.n1 + "-" + this.n2 + "-" + this.n3;
            this.serviceModal.open(modal);
            this.serviceBarrio.getBarrios().subscribe(function(data) {
                _this.barrios = data;
                //console.log("barrios cargados");
                //console.log(_this.barrios);
                _this.loader = false;
            });
        }
    };
    InicioComponent.prototype.capturarTipoDireccion = function() {
        //this.getBarrio();
        //console.log("direccion seleccionado ");
        //console.log(this.tipoDireccionSeleccionada);
    };
    InicioComponent.prototype.getBarrio = function() {
        var _this = this;
        this.barrios.forEach(function(element) {
            if (element.nombreBarrio == _this.barrioSeleccionado) {
                _this.barrio = element;
            }
        });
    };
    InicioComponent.prototype.seleccionEmpresa = function(empresa) {
        var _this = this;
        this.empresaSelected = true;
        this.empresaSeleccionada = empresa;
        //console.log("empresa Seleccionada");
        //console.log(this.empresaSeleccionada);
        this.categorias = this.empresaSeleccionada.categorias;
        this.productosService.getProductosEmpresa(empresa).subscribe(function(data) {
            //console.log("productos de esa empresa son:");
            _this.productos = data;
            //console.log(_this.productos);
            _this.productos.forEach(function(element) {
                //console.log("id de las imagenes de los productos" + element.imagen);
                _this.imagenService.getImageId(element.imagen).subscribe(function(data) {
                    _this.retrieveResonse = data;
                    //console.log(data);
                    _this.base64Data = _this.retrieveResonse.picByte;
                    //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                    element.retrievedImage = 'data:image/jpeg;base64,' + _this.base64Data;
                    //console.log(_this.retrievedImage);
                });
            });
        });
    };
    InicioComponent.prototype.asignarCosto = function() {
        //console.log("barrio en sistema es");
        //console.log(this.barrio);
        if (this.barrio.tipoCosto == "COSTO1") {
            this.valorServicio = 4000;
        }
        if (this.barrio.tipoCosto == "COSTO2") {
            this.valorServicio = 5000;
        }
        if (this.barrio.tipoCosto == "COSTO3") {
            this.valorServicio = 6000;
        }
        if (this.barrio.tipoCosto == "COSTO4") {
            this.valorServicio = 7000;
        } else if (this.barrio.tipoCosto == "COSTO5") {
            this.valorServicio = 8000;
        } else if (this.barrio.tipoCosto == "COSTO6") {
            this.valorServicio = 10000;
        }
    };
    InicioComponent.prototype.guardarTelefonoModalOpen = function() {
        // this.telefono="";
        // alert("se recomienda ingresar numero de contacto ")
        // this.serviceModal.open(this.guardarTelefonoModal);
    };
    InicioComponent.prototype.guardarTelefono = function() {
        var _this = this;
        var usuario = new usuario_1.Usuario();
        usuario.id = parseInt(window.sessionStorage.getItem("IdSesion"));
        usuario.telefono = this.telefono;
        if ((this.telefono + "").length > 6) {
            this.usuarioService.updateUsuario(usuario, parseInt(window.sessionStorage.getItem("IdSesion"))).subscribe(function(data) {
                alert(data.mensaje);
                window.sessionStorage.setItem("Telefono", _this.telefono + "");
                _this.serviceModal.dismissAll();
            }, function(err) {
                //console.log(err.error.mensaje);
                _this.telefono = window.sessionStorage.getItem("Telefono");
            });
        } else
            alert("numero de contacto no valido");
    };
    InicioComponent.prototype.confirmarPedido = function() {
        // this.tramitando=true;
        // this.serviceModal.open(modal);
        //console.log("ingreso a confirmar pedido");
        //console.log("datos del lugar");
        //console.log(this.lugar);
        if (this.productosCarrito.length > 0) {
            if (this.lugar == null) {
                alert("no ha ingresado direccion de pedido");
                //window.scrollTo(0, 0 - 20);
                localStorage.removeItem("barrios");
                localStorage.setItem('cambioDireccion', 'false');
                this.router.navigate(['landing']);
            } else {
                this.guardarLugarLocal();
            }
        } else {
            alert("carrito vacio");
        }
    };
    InicioComponent.prototype.cambiarDireccion = function() {
        // window.scrollTo(0, 0 - 20);
        localStorage.removeItem("barrios");
        localStorage.setItem('cambioDireccion', 'false');
        this.router.navigate(['landing']);
    };
    InicioComponent.prototype.guardarLugarLocal = function() {
        //this.lugar.barrio = this.barrio;
        /// this.lugar.direccionLugar = this.direccionCompleta;
        //  this.lugar.idUsuario = this.getidSesion();
        if (parseInt(this.tokenService.getLugar()) == 0) {
            //console.log("ingreso antes de las validaciones de guardar lugar local");
            if (this.lugar != null && this.telefono != null) {
                //console.log("ingreso a condicional donde lugar es diferente de nulo y telefono tambien");
                if (this.telefono == "0") {
                    alert("no tiene telefono guardado le recomendamos");
                    this.guardarTelefonoModalOpen();
                }
                this.promesaCrearLugar();
            } else {
                this.router.navigate(['landing']);
            }
        } else {
            //console.log("tiene direccion guardada pero la va a modificar");
            //console.log("datos del telefono son:");
            //console.log(this.telefono);
            if (this.telefono == "0") {
                this.guardarTelefonoModalOpen();
            } else {
                this.promesaModificarLugar();
            }
        }
    };
    InicioComponent.prototype.promesaCrearLugar = function() {
        var _this = this;
        //console.log("id del lugar guadados son: ");
        // //console.log(sessionStorage.getItem('IdLugar'));
        //this.lugar.idLugar=parseInt(sessionStorage.getItem('IdLugar'));
        this.lugar.idUsuario = parseInt(this.tokenService.getIdUser());
        this.serviceModal.open(this.tramitandoModal);
        this.tramitando = true;
        this.serviceLugar.createLugar(this.lugar).subscribe(function(data) {
            //console.log("alerta antes de extraer el id del lugar por primera vez");
            //alert("pendiente id que llega del lugar es: "+data.idLugar);
            window.sessionStorage.setItem("IdLugar", (data.idLugar + ""));
            _this.lugar.idLugar = data.idLugar;
            if (confirm('valor total del pedido: $' + (_this.valorServicio + _this.totalPedido) + ' a la direccion ' + _this.direccionCompleta +
                    '\n barrio:' + _this.barrio.nombreBarrio + '¿Estás seguro que desea confirmar el pedido?')) {
                _this.confirmarTransaccion();
            }
        }, function(err) {
            //console.log(err.error.mensaje);
        });
    };
    InicioComponent.prototype.promesaModificarLugar = function() {
        var _this = this;
        //console.log("id del lugar guadados son: ");
        //console.log(sessionStorage.getItem('IdLugar'));
        this.lugar.idLugar = parseInt(sessionStorage.getItem('IdLugar'));
        this.serviceModal.open(this.tramitandoModal);
        this.tramitando = true;
        this.serviceLugar.modificarLugar(this.lugar).subscribe(function(data) {
            if (confirm('valor total del pedido: $' + (_this.valorServicio + _this.totalPedido) + ' a la direccion ' + _this.direccionCompleta +
                    '\n barrio:' + _this.barrio.nombreBarrio + '¿Estás seguro que desea confirmar el pedido?')) {
                _this.confirmarTransaccion();
            }
        }, function(err) {
            if (err.error.mensaje === undefined) {
                alert("debes ingresar o registrarse para poder confirmar pedido");
                localStorage.setItem("reabrirCarrito", "true");
                _this.serviceModal.open(_this.loginModal);
                // this.router.navigate(["login"]);
            }
            //console.log(err.error.mensaje);
        });
    };
    InicioComponent.prototype.getidSesion = function() {
        return parseInt(this.tokenService.getIdUser());
    };
    InicioComponent.prototype.getidLugar = function() {
        return parseInt(this.tokenService.getLugar());
    };
    InicioComponent.prototype.confirmarTransaccion = function() {
        var _this = this;
        this.serviceModal.open(this.tramitandoModal);
        this.tramitando = true;
        this.loaderPedido = true;
        this.pedido.idCliente = this.getidSesion();
        this.pedido.lugar = this.lugar;
        //alert(this.idEmpresa);
        var empresa = new empresa_1.Empresa();
        empresa.idEmpresa = this.idEmpresa;
        this.pedido.empresa = empresa;
        this.pedido.modoPagoPedido = "Efectivo";
        this.pedido.estadoPedido = "En proceso";
        this.pedido.valorComision = 0;
        this.pedido.valorGanancia = 0;
        this.pedido.valorTotalPedido = 0;
        this.serviceModal.dismissAll();
        //console.log("valor gananacia " + this.valorServicio);
        this.pedido.valorGanancia = this.valorServicio;
        //console.log("ingreso a crear el pedido");
        //console.log(this.pedido);
        this.serviceModal.open(this.tramitandoModal);
        this.tramitando = true;
        this.pedidoService.createPedido(this.pedido).subscribe(function(data) {
            _this.detalleServicioService.getServicio(_this.pedido.empresa.idEmpresa, _this.pedido.idCliente).subscribe(function(data) {
                //console.log("servicio extraido es");
                //console.log(data);
                _this.servicio = data;
                _this.idservicio = data.id;
                //console.log("id de servicio " + _this.idservicio);
                _this.llenarDetalleList(_this.idservicio);
                //this.llenarDetalle(this.idservicio);
            });
        }, function(err) {
            //console.log(err.error.mensaje);
        });
    };
    InicioComponent.prototype.llenarDetalleList = function(idServicio) {
        var _this = this;
        var estadoServicio = "Activo";
        //console.log(this.productosCarrito);
        var listDetalleServicio = [];
        this.productosCarrito.forEach(function(element) {
            var detalleServicio = new detalle_servicio_1.DetalleServicio();
            detalleServicio.idServicio = idServicio;
            detalleServicio.producto = element;
            detalleServicio.valorUnitario = element.valorProducto;
            detalleServicio.cantidad = element.cantidad;
            detalleServicio.valorTotal = element.valorProducto * element.cantidad;
            listDetalleServicio.push(detalleServicio);
        });
        this.detalleServicioService.createDetalleServicioList(listDetalleServicio).subscribe(function(data) {
            //console.log("mensaje de confirmacion de la lista de detalle");
            //console.log(data);
            _this.servicio.estadoServicio = estadoServicio;
            _this.servicioService.updateServicio(_this.servicio).subscribe(function(data) {
                _this.serviceModal.dismissAll();
                _this.tramitando = false;
                //console.log(data.mensaje);
                _this.solicitarPedido();
                _this.notificacionesGeneral();
                alert(data.mensaje);
                _this.idEmpresa = 0;
            }, function(err) {
                //console.log(err.error.mensaje);
            });
        });
    };
    InicioComponent.prototype.llenarDetalle = function(idServicio) {
        var _this = this;
        var estadoServicio = "Activo";
        //console.log("productos del carriot son:");
        //console.log(this.productosCarrito);
        this.productosCarrito.forEach(function(element) {
            var detalleServicio = new detalle_servicio_1.DetalleServicio();
            detalleServicio.idServicio = idServicio;
            detalleServicio.producto = element;
            detalleServicio.valorUnitario = element.valorProducto;
            detalleServicio.cantidad = element.cantidad;
            _this.detalleServicioService.createDetalleServicio(detalleServicio).subscribe(function(data) {
                //console.log("detalle servicio agregado");
                //this.ngOnInit();
                localStorage.removeItem('myCar');
                _this.asignarCosto();
                _this.tramitando = false;
            }, function(err) {
                estadoServicio = "Error";
            });
        });
        setTimeout(function() {
            //console.log("delay ingresando");
            _this.servicio.estadoServicio = estadoServicio;
            _this.servicioService.updateServicio(_this.servicio).subscribe(function(data) {
                _this.serviceModal.dismissAll();
                _this.tramitando = false;
                //console.log(data.mensaje);
                _this.solicitarPedido();
                _this.notificacionesGeneral();
                alert(data.mensaje);
                _this.idEmpresa = 0;
                _this.ngOnInit();
            }, function(err) {
                //console.log(err.error.mensaje);
            });
        }, 5000);
    };
    InicioComponent.prototype.notificacionesGeneral = function() {
        var _this = this;
        //console.log("enviando notificaciones a los usuarios empresa");
        this.usuarioService.getUserEmpresaNotifications(this.idEmpresa).subscribe(function(data) {
            //console.log("promesa de get usuarios empresa");
            data.forEach(function(element) {
                _this.enviarNotificaciones(element.id, "Tiene un pedido de su negocio");
            });
        });
        //console.log("enviando notificaciones a los usuarios recepcionista");
        this.usuarioService.getUserRepecionistaNotifications().subscribe(function(data) {
            //console.log("promesa de get usuarios recepcionista");
            data.forEach(function(element) {
                _this.enviarNotificaciones(element.id, "Tiene un pedido sin asignar");
            });
        });
        //console.log("enviando notificaciones a los usuarios admi");
        this.usuarioService.getUserAdminNotifications().subscribe(function(data) {
            //console.log("promesa de get usuarios admi");
            data.forEach(function(element) {
                _this.enviarNotificaciones(element.id, "Tiene un pedido sin asignar");
            });
        });
    };
    InicioComponent.prototype.enviarNotificaciones = function(id, mensaje) {
        var message = {
            message: mensaje,
            fromId: this.tokenService.getIdUser(),
            toId: id + ""
        };
        this.socketService.postMessage(message).subscribe(function(res) {
            //console.log(res);
        });
    };
    InicioComponent.prototype.solicitarPedido = function() {
        var _this = this;
        //console.log("listo para extraer pedido ");
        //console.log(this.servicio);
        this.pedidoService.getPedido(this.servicio.idPedido).subscribe(function(data) {
            // this.pedido=data;
            //console.log("pedido obtenido  es ");
            //console.log(data);
            _this.tokenService.setLugar(data.lugar.idLugar + "");
            _this.lugar.idLugar = data.lugar.idLugar;
            // alert("pedido solicitado");
            _this.clean();
        });
    };
    InicioComponent.prototype.clean = function() {
        localStorage.removeItem("myCar");
        this.productosCarrito = [];
        //this.valorServicio = 0;
        this.totalPedido = 0;
        this.showF();
    };
    InicioComponent.prototype.screen = function() {
        alert("tamaño de pantalla pequeño");
    };
    /**
     * Show the search results based in the faqs
     * @function showSearchResults
     * @param {any} event
     * @return {void}
     */
    InicioComponent.prototype.showSearchResults = function(event) {
        if (event.target.value.length >= 2) {
            this.searching = true;
        } else {
            this.searching = false;
        }
    };
    __decorate([
        core_1.ViewChild('tramitandoModal', { static: false })
    ], InicioComponent.prototype, "tramitandoModal");
    __decorate([
        core_1.ViewChild('loginModal', { static: false })
    ], InicioComponent.prototype, "loginModal");
    __decorate([
        core_1.ViewChild('guardarTelefonoModal', { static: false })
    ], InicioComponent.prototype, "guardarTelefonoModal");
    InicioComponent = __decorate([
        core_1.Component({
            selector: 'app-inicio',
            templateUrl: './inicio.component.html',
            styleUrls: ['./inicio.component.css']
        })
    ], InicioComponent);
    return InicioComponent;
}());
exports.InicioComponent = InicioComponent;
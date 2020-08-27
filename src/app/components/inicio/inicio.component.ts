import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoServiceService } from 'src/app/services/producto-service/producto-service.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { Producto } from 'src/app/models/producto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria-service/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { TokenService } from 'src/app/services/auth/token.service';
import { BarrioService } from 'src/app/services/barrio-service/barrio.service';
import { Barrio } from 'src/app/models/barrio';
import { Lugar } from 'src/app/models/lugar';
import { LugarService } from 'src/app/services/lugar-service/lugar.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido-service/pedido.service';
import { DetalleServicioService } from 'src/app/services/detalleServicio-service/detalle-servicio.service';
import { Servicio } from 'src/app/models/servicio';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { __await } from 'tslib';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa-service/empresa.service';
import { element } from 'protractor';
import { SocketService } from 'src/app/services/socket-service/socket.service';
import { Message } from 'src/app/models/message';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { runInThisContext } from 'vm';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  n1: number;
  n2: number;
  n3: number;

  idservicio: number;
  idEmpresa: number = 0;
  valorServicio = 0;
  direccionCompleta;
  direccion: string;

  tramitando = false;

  tipoDireccionSeleccionada: string = "";
  barrioSeleccionado: string = "";
  busquedaSeleccionada = "";
  barrio: Barrio = new Barrio();
  lugar: Lugar;
  pedido: Pedido = new Pedido();
  servicio: Servicio = new Servicio();
  producto: Producto = new Producto();
  empresaSeleccionada: Empresa;

  productoSeleccionado = "";

  telefono="";
  @ViewChild('tramitandoModal', { static: false }) tramitandoModal;
  @ViewChild('loginModal', { static: false }) loginModal;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;

  show: boolean = false;
  loaderPedido = true;
  loader = false;
  empresaSelected = false;

  barrios: Barrio[] = [];
  productosCarrito: Producto[] = [];
  categorias: Categoria[] = [];
  tipoDirecciones: String[] = [];
  productos: Producto[] = [];
  empresas: Empresa[] = [];
  empresasTemporal: Empresa[] = [];
  totalPedido = 0;
  categoriaActual = " ";

  /**
  * Shows or hide the search elements
  * @var {boolean} searching
  */
  public searching: boolean = false;




  private serverUrl = 'https://quickdomicilios.herokuapp.com/' + 'socket'
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;

  messages: Message[] = [];

  searchText = "";

  constructor(private productosService: ProductoServiceService,
    private imagenService: ImageService,
    private serviceModal: NgbModal,
    private router: Router,
    private categoriaService: CategoriaService,
    private tokenService: TokenService,
    private serviceBarrio: BarrioService,
    private serviceLugar: LugarService,
    private pedidoService: PedidoService,
    private detalleServicioService: DetalleServicioService,
    private servicioService: ServicioService,
    private empresaService: EmpresaService,
    private socketService: SocketService,
    private usuarioService: UsuarioService,

  ) { }

  ngOnInit() {
    //this.llenarTipodirecciones();
    if(localStorage.getItem("reabrirCarrito")){
      if(localStorage.getItem("reabrirCarrito")=='true') 
      this.showF();
    }
    this.cargarProductos();
    if (JSON.parse(localStorage.getItem('myCar')) != null) {
      this.getCarrito();
    }
    this.initializeWebSocketConnection();
    console.log("verificacion variable de cambio de direccion");
    console.log(localStorage.getItem('cambioDireccion') == 'true');

    if (window.localStorage.getItem('lugar')) {
      console.log("hay lugar guardado en el localstorage");
      this.lugar = JSON.parse(window.localStorage.getItem('lugar'));
      this.barrio = this.lugar.barrio;
      this.direccionCompleta = this.lugar.direccionLugar;
      console.log("lugar que llega es:");
      console.log(this.lugar);
      this.asignarCosto();
      this.totalPedido = this.calcular();
      this.promesaModificarLugarHead();
    }
    if(window.sessionStorage.getItem("telefono")){
     this.telefono=window.sessionStorage.getItem("telefono");
    }
    // console.log("refreshpage es "+localStorage.getItem("refreshPage"));
    if (this.tokenService.getToken() == null) {
      // localStorage.clear();
      console.log("se limpia el locar storage en inicio");
      localStorage.setItem("isLoggedin", "false");
    } else {
      localStorage.setItem('isLoggedin', 'true');
    }
    console.log("id de lugar entrante es:");
    console.log(parseInt(this.tokenService.getLugar()));

    if (localStorage.getItem('cambioDireccion') == 'true') {
      this.lugar = JSON.parse(window.localStorage.getItem('lugar'));
      this.barrio = this.lugar.barrio;
      this.direccionCompleta = this.lugar.direccionLugar;
      console.log("lugar que llega es:");
      console.log(this.lugar);
      this.asignarCosto();
      this.totalPedido = this.calcular();
    } else if (parseInt(this.tokenService.getLugar()) != 0) {
      console.log("hay lugar guardado del usuario");
      console.log("lugar guardado desde el landing");
      console.log(this.lugar);
      this.serviceLugar.getLugarId(parseInt(this.tokenService.getLugar())).subscribe(data => {
        this.totalPedido = this.calcular();
        this.barrio = data.barrio;
        this.direccionCompleta = data.direccionLugar;
        this.lugar = data;
        this.asignarCosto();
      })
    } else {
    }
    //this.cargarProductos();
    this.cargarEmpresas();
    //this.cargarCategorias();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.isLoaded = true;
      console.log("quiere decir qu ya hizo conexion con socket");
      that.openGlobalSocket()
      that.openSocket()
    });
  }
  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }
 promesaModificarLugarHead() {
    console.log("id del lugar guadados son: ");
    console.log(sessionStorage.getItem('IdLugar'));
  
    this.lugar.idLugar = parseInt(sessionStorage.getItem('IdLugar'));
    this.serviceLugar.modificarLugar(this.lugar).subscribe(data => {
      
    }, (err: any) => {
      if (err.error.mensaje === undefined) {
       // alert("debe ingresar o registrarse");
        //this.serviceModal.open(this.loginModal);
        //this.router.navigate(["login"]);
      }
      console.log(err.error.mensaje)
    })
  }
  openSocket() {
    console.log(this.isLoaded);
    console.log("ingresa a estos metodos de sockets");
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      console.log("id de usuario actual listo para recibir mensajes es " + this.tokenService.getIdUser());
      this.stompClient.subscribe("/socket-publisher/" + this.tokenService.getIdUser(), (message) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      /**  this.toastr.success("new message recieved", null, {
         'timeOut': 3000
       });*/
      //this.showNotification("Notificación", messageResult.message);
      //this.showPushNotification("Notificación", "Mensaje recibido");
      console.log("ingreso de vibracion");
      //Haptics.vibrate();
      console.log("ingreso de notificacion local");
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
         console.log('scheduled notifications', notifs); */

      // Method called when tapping on a notification

    }
  }

  conductor() {
    this.empresaSelected = false;
    this.empresas = this.empresasTemporal;
    console.log("ingreso a conductor padre");
    let empresasSeleccion: Empresa[] = [];
    this.empresas.forEach(element => {
      element.categorias.forEach(element2 => {
        if (element2.dependencia.idCategoria == 9) {
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas = empresasSeleccion;
    this.categoriaActual = "Conductor";
    this.cargarCategorias();
  }
  domicilios() {
    this.empresaSelected = false;
    this.empresas = this.empresasTemporal;
    console.log("ingreso a domicilios padre");
    let empresasSeleccion: Empresa[] = [];
    this.empresas.forEach(element => {
      element.categorias.forEach(element2 => {
        if (element2.dependencia.idCategoria == 8) {
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas = empresasSeleccion;
    this.categoriaActual = "Domicilio";
    this.cargarCategorias();
  }
  licores() {
    this.empresaSelected = false;
    this.empresas = this.empresasTemporal;
    console.log("ingreso a licores padre");
    console.log(this.empresas);
    let empresasSeleccion: Empresa[] = [];
    this.empresas.forEach(element => {
      element.categorias.forEach(element2 => {
        if (element2.dependencia.idCategoria == 7) {
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas = empresasSeleccion;
    this.categoriaActual = "Licores";
    this.cargarCategorias();
  }
  viveres() {
    this.empresaSelected = false;
    this.empresas = this.empresasTemporal;
    console.log("ingreso a viveres padre");
    let empresasSeleccion: Empresa[] = [];
    this.empresas.forEach(element => {
      element.categorias.forEach(element2 => {
        if (element2.dependencia.idCategoria == 6) {
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas = empresasSeleccion;
    this.categoriaActual = "Viveres";
    this.cargarCategorias();
  }
  drogueria() {
    this.empresaSelected = false;
    console.log("ingreso a drogueria padre");
    this.empresas = this.empresasTemporal;
    let empresasSeleccion: Empresa[] = [];
    console.log(this.empresas);
    this.empresas.forEach(element => {
      element.categorias.forEach(element2 => {
        if (element2.dependencia.idCategoria == 4) {
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas = empresasSeleccion;
    this.categoriaActual = "MEDICAMENTOS";
    this.cargarCategorias();
  }
  restaurantes() {
    this.empresaSelected = false;
    console.log("ingreso a restaurantes padre");
    this.empresas = this.empresasTemporal;
    let empresasSeleccion: Empresa[] = [];
    this.empresas.forEach(element => {
      console.log(element.razonSocial);
      let introIf = false;
      element.categorias.forEach(element2 => {
        console.log("cosas que tiene elemento 2");
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
  }
  cargarEmpresas() {
    this.empresaSelected = false;
    this.empresaService.getEmpresas().subscribe(data => {
      this.empresas = data;
      console.log("empresas cargadas");
      console.log(this.empresas);
      this.empresasTemporal = data;
      this.empresas.forEach(element => {
        console.log("id de las imagenes de los productos" + element.imagen);

        this.imagenService.getImageId(element.imagen).subscribe(data => {
          this.retrieveResonse = data;
          console.log(data);
          this.base64Data = this.retrieveResonse.picByte;
          //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          element.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrievedImage);

        })
      });
    })
  }

  llenarTipodirecciones() {
    this.tipoDirecciones.push("Carrera");
    this.tipoDirecciones.push("Avenida");
    this.tipoDirecciones.push("Avenida Carrera");
    this.tipoDirecciones.push("Avenida Calle");
    this.tipoDirecciones.push("Circular");
    this.tipoDirecciones.push("Circunvalar");
    this.tipoDirecciones.push("Diagonal");
    this.tipoDirecciones.push("Manzana");
    this.tipoDirecciones.push("Transversal");

  }
  cargarProductos() {

    console.log("metodo de listar productos oinit");
    this.productosService.listarUsuarioFinal().subscribe(data => {
      this.productos = data;
      console.log(this.productos);
      this.productos.forEach(element => {
        console.log("id de las imagenes de los productos" + element.imagen);

        this.imagenService.getImageId(element.imagen).subscribe(data => {
          this.retrieveResonse = data;
          console.log(data);
          this.base64Data = this.retrieveResonse.picByte;
          //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          element.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrievedImage);

        })
      });
      // this.loader = false;
    });

  }
  ordenarProducto(producto: Producto, modal) {
    if (localStorage.getItem("isLoggedin")) {
      this.producto = producto;
      this.serviceModal.open(modal);
    } else {
      this.router.navigate(["login"]);
    }

  }
  confirmarAgregar() {
    if (this.idEmpresa == 0) {
      this.idEmpresa = this.producto.empresa.idEmpresa;
    } else if (this.idEmpresa != this.producto.empresa.idEmpresa) {
      alert("no es posible solicitar productos de dos empresas en un mismo servicio");
    } else {
      this.verificarRepetidos(this.producto);

      console.log("agregando al local storage:");
      console.log(this.productosCarrito);
      localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
      this.serviceModal.dismissAll();
      this.totalPedido = this.calcular();
    }

  }
  verificarRepetidos(producto) {
    let isRepetido = false;
    this.productosCarrito.forEach(element => {
      if (element.nombreProducto == producto.nombreProducto) {
        console.log("producto ya solicitado anteriormente");
        isRepetido = true;
      }
    });
    if (!isRepetido) this.productosCarrito.push(producto);
  }
  cargarCategorias() {
    if (this.categoriaActual != "Todas las Categorias") {
      this.categoriaService.getCategoriasDependencia(this.categoriaActual).subscribe(data => {
        console.log("ingreso de categoprias con dependencia");
        console.log(data);
        this.categorias = data;
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

  }

  showF() {
    console.log("ingreso de show")
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
  getCarrito() {

    console.log(JSON.parse(localStorage.getItem('myCar')));
    this.productosCarrito = JSON.parse(localStorage.getItem('myCar'));
    console.log("carrito de local storage");
    console.log(this.productosCarrito);

    if (this.productosCarrito.length <= 0) {
      console.log("carrito vacio")
    } else this.idEmpresa = this.productosCarrito[0].empresa.idEmpresa;
    this.totalPedido = this.calcular();

  }
  calcular(): number {
    let total: number = 0;
    this.productosCarrito.forEach(element => {
      total += (element.cantidad * element.valorProducto);
    });
    return total;
  }
  quitarProducto(producto) {
    var i = this.productosCarrito.indexOf(producto);
    if (i !== -1) {
      this.productosCarrito.splice(i, 1);
      this.totalPedido = this.calcular();
    }
    console.log("productos en mycar antes del if");
    if (this.verificarCarrito) {
      this.idEmpresa = 0;
    }
    localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
  }

  sumarCantidad(producto) {

    producto.cantidad += 1;
    this.totalPedido = this.calcular();
    localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
  }
  restarCantidad(producto) {

    producto.cantidad -= 1;
    this.totalPedido = this.calcular();
    if (this.verificarCarrito) {
      this.idEmpresa = 0;
    }
    localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
  }
  verificarCarrito(): boolean {


    console.log("productos en mycar");
    console.log(localStorage.getItem('myCar'));
    if (this.productosCarrito.length <= 0) {
      return false;
    } else
      return false;
  }
  agregarBarrio(modal) {
    console.log("modal activo de barrio");
    //console.log(this.getidLugar());
    console.log("datos de direccion son " + this.tipoDireccionSeleccionada + "-" + this.n1 + "-" + this.n2 + "-" + this.n3);
    if ((this.n1 <= 0 || this.n2 <= 0) || (this.n1 === undefined || this.n2 === undefined) || this.tipoDireccionSeleccionada === "") {
      if (this.tipoDireccionSeleccionada === "") {
        alert("Tipo de direccion no seleccionada");
      } else
        alert("campos vacios por favor validar");
    }

    else {
      this.direccionCompleta = this.tipoDireccionSeleccionada + " -" + this.n1 + "-" + this.n2 + "-" + this.n3;
      this.serviceModal.open(modal);
      this.serviceBarrio.getBarrios().subscribe(data => {
        this.barrios = data;
        console.log("barrios cargados");
        console.log(this.barrios);
        this.loader = false;

      });
    }

  }

  capturarTipoDireccion() {
    //this.getBarrio();
    console.log("direccion seleccionado ");
    console.log(this.tipoDireccionSeleccionada);
  }
  getBarrio() {

    this.barrios.forEach(element => {
      if (element.nombreBarrio == this.barrioSeleccionado) {
        this.barrio = element;
      }
    });

  }
  seleccionEmpresa(empresa) {
    this.empresaSelected = true;
    this.empresaSeleccionada = empresa;
    console.log("empresa Seleccionada");
    console.log(this.empresaSeleccionada);
    this.categorias = this.empresaSeleccionada.categorias;
    this.productosService.getProductosEmpresa(empresa).subscribe(data => {
      console.log("productos de esa empresa son:");
      this.productos = data;
      console.log(this.productos);
      this.productos.forEach(element => {
        console.log("id de las imagenes de los productos" + element.imagen);

        this.imagenService.getImageId(element.imagen).subscribe(data => {
          this.retrieveResonse = data;
          console.log(data);
          this.base64Data = this.retrieveResonse.picByte;
          //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          element.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrievedImage);

        })
      });
    });

  }

  asignarCosto() {
    console.log("barrio en sistema es");
    console.log(this.barrio);
    if (this.barrio.tipoCosto == "COSTO1") {
      this.valorServicio = 4000;
    } if (this.barrio.tipoCosto == "COSTO2") {
      this.valorServicio = 5000;
    } if (this.barrio.tipoCosto == "COSTO3") {
      this.valorServicio = 6000;
    } if (this.barrio.tipoCosto == "COSTO4") {
      this.valorServicio = 7000;
    } else if (this.barrio.tipoCosto == "COSTO5") {
      this.valorServicio = 8000;
    } else if (this.barrio.tipoCosto == "COSTO6") {
      this.valorServicio = 10000;
    }

  }
  confirmarPedido() {
    // this.tramitando=true;
    // this.serviceModal.open(modal);
    console.log("ingreso a confirmar pedido");
    console.log("datos del lugar");
    console.log(this.lugar);

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

  }
  cambiarDireccion() {
    // window.scrollTo(0, 0 - 20);
    localStorage.removeItem("barrios");
    localStorage.setItem('cambioDireccion', 'false');
    this.router.navigate(['landing']);
  }
  guardarLugarLocal() {
    //this.lugar.barrio = this.barrio;
    /// this.lugar.direccionLugar = this.direccionCompleta;
    //  this.lugar.idUsuario = this.getidSesion();
    
    if (parseInt(this.tokenService.getLugar()) == 0) {
      if (this.lugar != null) {
        this.promesaCrearLugar();
      } else {
        this.router.navigate(['landing']);
      }

    } else {
      console.log("tiene direccion guardada pero la va a modificar");
      this.promesaModificarLugar();
    }

  }
  promesaCrearLugar() {
    //console.log("id del lugar guadados son: ");
    // console.log(sessionStorage.getItem('IdLugar'));
    //this.lugar.idLugar=parseInt(sessionStorage.getItem('IdLugar'));
    this.lugar.idUsuario = parseInt(this.tokenService.getIdUser());
    this.serviceModal.open(this.tramitandoModal);
    this.tramitando = true;
    this.serviceLugar.createLugar(this.lugar).subscribe(data => {
      console.log("alerta antes de extraer el id del lugar por primera vez");
        //alert("pendiente id que llega del lugar es: "+data.idLugar);
        window.sessionStorage.setItem("IdLugar",(data.idLugar+""));
        this.lugar.idLugar=data.idLugar;
     


      if (confirm('valor total del pedido: $' + (this.valorServicio + this.totalPedido) + ' a la direccion ' + this.direccionCompleta
        + '\n barrio:' + this.barrio.nombreBarrio + '¿Estás seguro que desea confirmar el pedido?')) {
        
        this.confirmarTransaccion();
      }
    }, (err: any) => {

      console.log(err.error.mensaje)
    })
  }
  promesaModificarLugar() {
    console.log("id del lugar guadados son: ");
    console.log(sessionStorage.getItem('IdLugar'));
    this.lugar.idLugar = parseInt(sessionStorage.getItem('IdLugar'));
    this.serviceModal.open(this.tramitandoModal);
    this.tramitando = true;
    this.serviceLugar.modificarLugar(this.lugar).subscribe(data => {
      
      if (confirm('valor total del pedido: $' + (this.valorServicio + this.totalPedido) + ' a la direccion ' + this.direccionCompleta
        + '\n barrio:' + this.barrio.nombreBarrio + '¿Estás seguro que desea confirmar el pedido?')) {
        this.confirmarTransaccion();
      }
    }, (err: any) => {
      if (err.error.mensaje === undefined) {
        alert("debes ingresar o registrarse para poder confirmar pedido");
        localStorage.setItem("reabrirCarrito","true");
        this.serviceModal.open(this.loginModal);
       // this.router.navigate(["login"]);
      }
      console.log(err.error.mensaje)
    })
  }
  getidSesion(): number {
    return parseInt(this.tokenService.getIdUser());

  }
  getidLugar(): number {
    return parseInt(this.tokenService.getLugar());

  }
  confirmarTransaccion() {
    this.serviceModal.open(this.tramitandoModal);
    this.tramitando = true;
    this.loaderPedido = true;
    this.pedido.idCliente = this.getidSesion();
    this.pedido.lugar = this.lugar;
    //alert(this.idEmpresa);
    this.pedido.idEmpresa = this.idEmpresa;
    this.pedido.modoPagoPedido = "Efectivo";
    this.pedido.estadoPedido = "En proceso";
    this.pedido.valorComision = 0;
    this.pedido.valorGanancia = 0;
    this.pedido.valorTotalPedido = 0;
    this.serviceModal.dismissAll();
    console.log("valor gananacia " + this.valorServicio);
    this.pedido.valorGanancia = this.valorServicio;
    console.log("ingreso a crear el pedido");
    console.log(this.pedido);
    this.serviceModal.open(this.tramitandoModal);
    this.tramitando = true;
    this.pedidoService.createPedido(this.pedido).subscribe(data => {
      this.detalleServicioService.getServicio(this.pedido.idEmpresa, this.pedido.idCliente).subscribe(data => {
        console.log("servicio extraido es");
        console.log(data);
        this.servicio = data;
        this.idservicio = data.id;
        console.log("id de servicio " + this.idservicio);
        this.llenarDetalle(this.idservicio);
        

      })
    }, (err: any) => {

      console.log(err.error.mensaje)
    });

  }v
  llenarDetalleList(idServicio: number) {
    let estadoServicio = "Activo";

    console.log(this.productosCarrito);
    let listDetalleServicio: DetalleServicio[] = [];

    this.productosCarrito.forEach(element => {
      let detalleServicio = new DetalleServicio();
      detalleServicio.idServicio = idServicio;
      detalleServicio.idProducto = element.idProducto;
      detalleServicio.valorUnitario = element.valorProducto;
      detalleServicio.cantidad = element.cantidad;
      listDetalleServicio.push(detalleServicio);
    });
    this.detalleServicioService.createDetalleServicioList(listDetalleServicio).subscribe(data => {
      console.log("mensaje de confirmacion de la lista de detalle");
      console.log(data);

    })
  }
  llenarDetalle(idServicio: number) {
    let estadoServicio = "Activo";

    console.log(this.productosCarrito);

    this.productosCarrito.forEach(element => {
      let detalleServicio: DetalleServicio = new DetalleServicio();
      detalleServicio.idServicio = idServicio;
      detalleServicio.idProducto = element.idProducto;
      detalleServicio.valorUnitario = element.valorProducto;
      detalleServicio.cantidad = element.cantidad;
      this.detalleServicioService.createDetalleServicio(detalleServicio).subscribe(data => {
        console.log("detalle servicio agregado");

        //this.ngOnInit();
        localStorage.removeItem('myCar');

        this.asignarCosto();
      this.tramitando = false;
      }, (err: any) => {
        estadoServicio = "Error";
      });

    });

    setTimeout(() => { /*Your Code*/
      console.log("delay ingresando");
      this.servicio.estadoServicio = estadoServicio;
      this.servicioService.updateServicio(this.servicio).subscribe(data => {
        this.serviceModal.dismissAll();
    this.tramitando = false;
        console.log(data.mensaje);
        this.solicitarPedido();
        this.notificacionesGeneral();
        alert(data.mensaje);
        this.idEmpresa = 0;
        this.ngOnInit();
      }, (err: any) => {
        console.log(err.error.mensaje);
      })
    }, 5000);
  }

  notificacionesGeneral() {
    console.log("enviando notificaciones a los usuarios empresa");
    this.usuarioService.getUserEmpresaNotifications(this.idEmpresa).subscribe(data => {
      console.log("promesa de get usuarios empresa");
      data.forEach(element => {
        this.enviarNotificaciones(element.id, "Tiene un pedido de su negocio");
      });
    });
    console.log("enviando notificaciones a los usuarios recepcionista");
    this.usuarioService.getUserRepecionistaNotifications().subscribe(data => {
      console.log("promesa de get usuarios recepcionista");
      data.forEach(element => {
        this.enviarNotificaciones(element.id, "Tiene un pedido sin asignar");
      });
    });
    console.log("enviando notificaciones a los usuarios admi");
    this.usuarioService.getUserAdminNotifications().subscribe(data => {
      console.log("promesa de get usuarios admi");
      data.forEach(element => {
        this.enviarNotificaciones(element.id, "Tiene un pedido sin asignar");
      });
    });
  }
  enviarNotificaciones(id: number, mensaje: string) {
    let message: Message = {
      message: mensaje,
      fromId: this.tokenService.getIdUser(),
      toId: id + ""
    };
    this.socketService.postMessage(message).subscribe(res => {
      console.log(res);
    })
  }
  solicitarPedido() {
    console.log("listo para extraer pedido ");
    console.log(this.servicio);
    this.pedidoService.getPedido(this.servicio.idPedido).subscribe(data => {
      // this.pedido=data;
      console.log("pedido obtenido  es ");
      console.log(data);
      this.tokenService.setLugar(data.lugar.idLugar + "");
      this.lugar.idLugar = data.lugar.idLugar;
      // alert("pedido solicitado");
      this.clean();
    })
  }
  clean() {
    localStorage.removeItem("myCar");
    this.productosCarrito = [];
    //this.valorServicio = 0;
    this.totalPedido = 0;
    this.showF();
  }

  screen() {
    alert("tamaño de pantalla pequeño");
  }
  /**
    * Show the search results based in the faqs
    * @function showSearchResults
    * @param {any} event
    * @return {void}
    */
  public showSearchResults(event: any): void {
    if (event.target.value.length >= 2) {
      this.searching = true;
    } else {
      this.searching = false;
    }
  }
}

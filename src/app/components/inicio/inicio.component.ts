import { Component, OnInit } from '@angular/core';
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
  valorServicio;
  direccionCompleta;
  direccion: string;


  tipoDireccionSeleccionada: string = "";
  barrioSeleccionado: string = "";
  barrio: Barrio = new Barrio();
  lugar: Lugar = new Lugar();
  pedido: Pedido = new Pedido();
  servicio: Servicio = new Servicio();
  producto: Producto = new Producto();
  empresaSeleccionada:Empresa;


  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;

  show: boolean = false;
  loaderPedido = true;
  loader = false;
  empresaSelected=false;

  barrios: Barrio[] = [];
  productosCarrito: Producto[] = [];
  categorias: Categoria[] = [];
  tipoDirecciones: String[] = [];
  productos: Producto[] = [];
  empresas:Empresa[]=[];
  empresasTemporal:Empresa[]=[];
  totalPedido = 0;


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
    private empresaService:EmpresaService) { }

  ngOnInit() {
    this.llenarTipodirecciones();
   // console.log("refreshpage es "+localStorage.getItem("refreshPage"));
    if(localStorage.getItem("refreshPage")==null){
     
        setTimeout(() => {
          localStorage.setItem("refreshPage",'1');
        location.reload();
        }, 100);
      
    }else if(localStorage.getItem("refreshPage")=='1'){
      
      
      console.log("refreshpage es "+localStorage.getItem("refreshPage"));
    }

    if (this.tokenService.getToken() == null) {
      localStorage.clear();
      console.log("se limpia el locar storage en inicio");
      localStorage.setItem("isLoggedin","false");
    } else {
      localStorage.setItem('isLoggedin', 'true');
    } 
    if (parseInt(this.tokenService.getLugar())!=0){
      this.serviceLugar.getLugarId(parseInt(this.tokenService.getLugar())).subscribe(data => {
        console.log("barrio es");
        console.log(data.barrio);
        this.lugar = data;
        this.barrio=this.lugar.barrio;
        this.barrioSeleccionado=this.lugar.barrio.nombreBarrio;
        this.direccionCompleta=this.lugar.direccionLugar;
        this.totalPedido = this.calcular();
        this.asignarCosto();

      });
    }
     
    
    //this.cargarProductos();
    this.cargarEmpresas();
    this.cargarCategorias();
    if (JSON.parse(localStorage.getItem('myCar')) != null) {
      this.getCarrito();
    }

  }
  conductor(){
    this.empresaSelected=false;
    this.empresas=this.empresasTemporal;
    console.log("ingreso a conductor padre");
    let empresasSeleccion:Empresa[]=[];
    this.empresas.forEach(element=>{
      element.categorias.forEach(element2=>{
        if(element2.dependencia.idCategoria==9){
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas=empresasSeleccion;
  }
  domicilios(){
    this.empresaSelected=false;
    this.empresas=this.empresasTemporal;
    console.log("ingreso a domicilios padre");
    let empresasSeleccion:Empresa[]=[];
    this.empresas.forEach(element=>{
      element.categorias.forEach(element2=>{
        if(element2.dependencia.idCategoria==8){
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas=empresasSeleccion;
  }
  licores(){
    this.empresaSelected=false;
    this.empresas=this.empresasTemporal;
    console.log("ingreso a licores padre");
    let empresasSeleccion:Empresa[]=[];
    this.empresas.forEach(element=>{
      element.categorias.forEach(element2=>{
        if(element2.dependencia.idCategoria==7){
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas=empresasSeleccion;
  }
  viveres(){
    this.empresaSelected=false;
    this.empresas=this.empresasTemporal;
    console.log("ingreso a viveres padre");
    let empresasSeleccion:Empresa[]=[];
    this.empresas.forEach(element=>{
      element.categorias.forEach(element2=>{
        if(element2.dependencia.idCategoria==6){
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas=empresasSeleccion;
  }
  drogueria(){
    this.empresaSelected=false;
    console.log("ingreso a drogueria padre");
    this.empresas=this.empresasTemporal;
    let empresasSeleccion:Empresa[]=[];
    this.empresas.forEach(element=>{
      element.categorias.forEach(element2=>{
        if(element2.dependencia.idCategoria==4){
          empresasSeleccion.push(element);
        }
      });
    });
    this.empresas=empresasSeleccion;
  }
  restaurantes(){
    this.empresaSelected=false;
    console.log("ingreso a restaurantes padre");
    this.empresas=this.empresasTemporal;
    let empresasSeleccion:Empresa[]=[];
    this.empresas.forEach(element=>{
      console.log(element.razonSocial);
      let introIf=false;
      element.categorias.forEach(element2=>{
        console.log("cosas que tiene elemento 2");
        if(!introIf){
          if(element2.dependencia.idCategoria==5){
            introIf=true;
            empresasSeleccion.push(element);         
          }
        }
       
      });
      
    });
    this.empresas=empresasSeleccion;
  }
  cargarEmpresas(){
    this.empresaSelected=false;
    this.empresaService.getEmpresas().subscribe(data=>{
      this.empresas=data;
      console.log("empresas cargadas");
      console.log(this.empresas);
      this.empresasTemporal=data;
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
      alert("no puede solicitar productos de dos empresas en un mismo servicio");
    }else{
      this.productosCarrito.push(this.producto);
      console.log("agregando al local storage:");
      console.log(this.productosCarrito);
      localStorage.setItem('myCar', JSON.stringify(this.productosCarrito));
      this.serviceModal.dismissAll();
      this.totalPedido = this.calcular();
    }
    
  }
  cargarCategorias() {
    this.categoriaService.getCategoriasUsuarioFinal().subscribe(data => {
      this.categorias = data;
    })
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
    this.idEmpresa = this.productosCarrito[0].empresa.idEmpresa;
    this.totalPedido = this.calcular();
    // console.log("carrito pendiente");
    // console.log('objetoObtenido: ', this.productos);
  }
  calcular(): number {
    let total: number = 0;
    this.productosCarrito.forEach(element => {
      total += (element.cantidad * element.valorProducto);
    });
    return total;
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
  capturar() {
    this.getBarrio();
    console.log("barrio seleccionado ");
    console.log(this.barrio);

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
  seleccionEmpresa(empresa){
    this.empresaSelected=true;
    this.empresaSeleccionada=empresa;
    console.log("empresa Seleccionada");
    console.log(this.empresaSeleccionada);
    this.categorias=this.empresaSeleccionada.categorias;
    this.productosService.getProductosEmpresa(empresa).subscribe(data=>{
      console.log("productos de esa empresa son:");
      this.productos=data;
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
  confirmarDireccion() {
    this.serviceModal.dismissAll();
    console.log("tipo de costo cambio" + this.barrio.tipoCosto)

    this.asignarCosto();
  }
  asignarCosto(){
    console.log("barrio en sistema es");
    console.log(this.barrio);
    if (this.barrio.tipoCosto == "COSTO1") {
      this.valorServicio = 4000;
    } else {
      this.valorServicio = 7000;
    }
  }
  confirmarPedido() {
    console.log("ingreso a confirmar pedido");
    if (this.direccionCompleta === undefined) {
      alert("no ha ingresado direccion de pedido");
      window.scrollTo(0, 0 - 20);
    } else {
      this.guardarLugarLocal();
    }
  }
  guardarLugarLocal() {
    this.lugar.barrio = this.barrio;
    this.lugar.direccionLugar = this.direccionCompleta;
    this.lugar.idUsuario = this.getidSesion();
    console.log("datos de lugar");
    console.log(this.lugar);

    if(parseInt(this.tokenService.getLugar())==0){
      this.promesaCrearLugar();
    }else{
      console.log("tiene direccio guardada pero la va a modificar");
      this.promesaModificarLugar();
    }
    
  }
  promesaCrearLugar() {
    this.serviceLugar.createLugar(this.lugar).subscribe(data => {
      if (confirm('valor total del pedido: $' + (this.valorServicio + this.totalPedido) +' a la direccion '+this.direccionCompleta
      +'\n barrio:'+this.barrioSeleccionado + '¿Estás seguro desea confirmar el pedido?')) {

        this.confirmarTransaccion();
        
      }
    }, (err: any) => {

      console.log(err.error.mensaje)
    })
  }
  promesaModificarLugar() {

    this.serviceLugar.modificarLugar(this.lugar).subscribe(data => {
      if (confirm('valor total del pedido: $' + (this.valorServicio + this.totalPedido) +' a la direccion '+this.direccionCompleta
      +'\n barrio:'+this.barrioSeleccionado + '¿Estás seguro desea confirmar el pedido?')) {
        this.confirmarTransaccion();
      }
    }, (err: any) => {

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

  }
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
      }, (err: any) => {
        estadoServicio = "Error";
      });

    });

    setTimeout(() => { /*Your Code*/
      console.log("delay ingresando");
      this.servicio.estadoServicio = estadoServicio;
      this.servicioService.updateServicio(this.servicio).subscribe(data => {
        console.log(data.mensaje);
        alert(data.mensaje);
        this.solicitarPedido();
        this.ngOnInit();

      }, (err: any) => {
        console.log(err.error.mensaje);
      })
    }, 5000);



  }
  solicitarPedido() {
    console.log("listo para extraer pedido ");
    console.log(this.servicio);
    this.pedidoService.getPedido(this.servicio.idPedido).subscribe(data => {
      // this.pedido=data;
      console.log("pedido obtenido  es ");
      console.log(data);
      this.tokenService.setLugar(data.lugar.idLugar + "");
      this.lugar.idLugar=data.lugar.idLugar;
     // alert("pedido solicitado");
      this.clean();
    })
  }
  clean() {
    localStorage.removeItem("myCar");
    this.productosCarrito = [];
    this.valorServicio = 0;
    this.totalPedido = 0;
    this.showF();
  }

  screen(){
    alert("tamaño de pantalla pequeño");
  }

}

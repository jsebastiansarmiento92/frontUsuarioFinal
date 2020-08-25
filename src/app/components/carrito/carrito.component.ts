import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Barrio } from 'src/app/models/barrio';
import { Pedido } from 'src/app/models/pedido';
import { Servicio } from 'src/app/models/servicio';
import { Lugar } from 'src/app/models/lugar';
import { PedidoService } from 'src/app/services/pedido-service/pedido.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { DetalleServicioService } from 'src/app/services/detalleServicio-service/detalle-servicio.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarrioService } from 'src/app/services/barrio-service/barrio.service';
import { LugarService } from 'src/app/services/lugar-service/lugar.service';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { DetalleServicio } from 'src/app/models/detalle-servicio';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = [];
  barrios:Barrio[]=[];
  barrio:Barrio=new Barrio();
  pedido: Pedido = new Pedido();
  servicio: Servicio = new Servicio();
  lugar:Lugar=new Lugar();
  lugares:Lugar[]=[];
  @ViewChild('agregarDireccionNueva', {static: false}) agregarDireccionNueva;
  modalDetalle;
  loader=true;
  direccion:string;
  barrioSeleccionado:string="";
  ganancia:number;
  idservicio: number;
  totalServicio:number;
  loaderPedido=false;
  isPrimeraVezLugar=false;

  constructor(private pedidoService: PedidoService,
    private tokenService: TokenService,
    private detalleServicioService: DetalleServicioService,
    private servicioService: ServicioService,
    private serviceModal:NgbModal,
    private serviceBarrio:BarrioService,
    private serviceLugar:LugarService,
    private serviceUsuario:UsuarioService) { }

  ngOnInit() {
    console.log("get carrito en oinit");
    this.getCarrito();
    let idLugar=this.tokenService.getLugar();
    console.log("id de lugar de usuario es ");
    console.log(idLugar);
    if(idLugar!='0'){
      this.serviceLugar.getLugarId(parseInt(idLugar)).subscribe(data=>{
        this.lugar=data;
        this.totalServicio=this.getValorPedido()
      })
    }
  }
  getCarrito() {
    console.log(JSON.parse(localStorage.getItem('myCar')));
    this.productos = JSON.parse(localStorage.getItem('myCar'));
    console.log(this.productos);
   // console.log("carrito pendiente");
   // console.log('objetoObtenido: ', this.productos);
  }
  modalDetallePedido(modal){
    console.log("detalle de modal activo");
    console.log(this.getidLugar());
    if (this.getidLugar()==0){
      if (confirm('No tiene direccion guardada de domicilio, ¿desea guardar una?')) {
        this.isPrimeraVezLugar=true;
        this.asignarLugarNuevo();
      }
    }else{
      console.log("detalle de modal despues de condicional");
      this.modalDetalle=modal;
      console.log("detalle del pedido es:");
      console.log(this.pedido);
      this.serviceModal.open(modal);
    }
  }
  confirmarPedido() {
    if (!confirm('¿Estás seguro desea confirmar el servicio?')) {
    } else {
      console.log("id lugar de la sesion es "+ this.getidLugar());
      if (this.getidLugar()==0){
        if (confirm('No tiene direccion guardada de domicilio, ¿desea guardar una?')) {
          this.asignarLugarNuevo();
        }else{

        }
      }else{
        this.serviceLugar.getLugarId(this.getidLugar()).subscribe(data=>{
          
          this.lugar=data;
          if (confirm('valor total del pedido: $'+this.getValorPedido()+ ' ¿Estás seguro desea confirmar el pedido?')) {
            this.confirmarTransaccion();

          } 
        });
       
        
      }
      
    }
  }
  getValorPedido():number{
    let valor=0;
    if(this.productos!=null){
      this.productos.forEach(element => {
        valor+=(element.cantidad*element.valorProducto);
      });
    }
    
    if(this.lugar.barrio.tipoCosto=="COSTO1"){
      valor+=4000;
      this.ganancia=4000;
    }else{
      valor+=7000;
      this.ganancia=7000;
    }
    return valor;
  }
  confirmarTransaccion(){
    this.loaderPedido=true;
      this.pedido.idCliente = this.getidSesion();
      this.pedido.lugar=this.lugar;
      this.pedido.idEmpresa = this.productos[0].empresa.idEmpresa;
      this.pedido.modoPagoPedido = "Efectivo";
      this.pedido.estadoPedido = "En proceso";
      this.pedido.valorComision = 0;
      this.pedido.valorGanancia = 0;
      this.pedido.valorTotalPedido = 0;
      this.serviceModal.dismissAll();
      console.log("valor gananacia "+ this.ganancia);
      this.pedido.valorGanancia=this.ganancia;
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
          this.solicitarPedido();
        })
      }, (err: any) => {
        
        console.log(err.error.mensaje)
      });
     
      
  }
  solicitarPedido(){
    console.log("listo para extraer pedido ");
    console.log(this.servicio);
    this.pedidoService.getPedido(this.servicio.idPedido).subscribe(data=>{
     // this.pedido=data;
     console.log("lugar obtenido es ");
    console.log(data);
      this.tokenService.setLugar(data.lugar.idLugar+"");
      this.loaderPedido=false;
    })
  }
  getidSesion(): number {
    return parseInt(this.tokenService.getIdUser());

  }
  getidLugar(): number {
    return parseInt(this.tokenService.getLugar());

  }
  llenarDetalle(idServicio: number) {
    let estadoServicio = "Activo";
    console.log(this.productos);
    this.productos.forEach(element => {
      let detalleServicio: DetalleServicio = new DetalleServicio();
      detalleServicio.idServicio = idServicio;
      detalleServicio.idProducto = element.idProducto;
      detalleServicio.valorUnitario = element.valorProducto;
      detalleServicio.cantidad = element.cantidad;
      this.detalleServicioService.createDetalleServicio(detalleServicio).subscribe(data => {
        console.log("detalle servicio agregado");
        //alert("Pedido guardado");
        //this.ngOnInit();
        localStorage.removeItem('myCar');
        
      }, (err: any) => {
        estadoServicio = "Error";
      })
    });
    
    this.servicio.estadoServicio = estadoServicio;
    this.servicioService.updateServicio(this.servicio).subscribe(data => {
      console.log(data.mensaje);
      alert(data.mensaje);
      this.ngOnInit();
    }, (err: any) => {
      console.log(err.error.mensaje);
    })
    
  }
  cancelarCarrito() {
    if (confirm('¿Estás seguro desea cancelar el carrito?')) {
      localStorage.removeItem('myCar');
    }
  }

  asignarLugarNuevo() {
    //this.pedido = pedido;
   // this.getDomiciliariosDisponibles();
  // this.serviceModal.dismissAll();
    //this.getLugaresUsuario();
    this.serviceModal.open(this.agregarDireccionNueva);
    this.serviceBarrio.getBarrios().subscribe(data=>{
      this.barrios=data;
      console.log("barrios cargados");
      console.log(this.barrios);
      this.loader=false;
    });
  }

  capturar(){
    this.getBarrio();
    console.log("barrio seleccionado ");
    console.log(this.barrio);
  }
  getBarrio(){
    
    this.barrios.forEach(element => {
      if(element.nombreBarrio==this.barrioSeleccionado){
        this.barrio=element;
      }
    });
    
  }
  confirmarDireccion(){
    this.lugar.barrio=this.barrio;
    this.lugar.direccionLugar=this.direccion;
    this.lugar.idUsuario=this.getidSesion();
    console.log("datos de lugar");
    console.log(this.lugar);
    this.totalServicio=this.getValorPedido()
    
      if(this.isPrimeraVezLugar){
        this.serviceLugar.createLugar(this.lugar).subscribe(data=>{
          if (confirm('valor total del pedido: $'+this.getValorPedido()+ '¿Estás seguro desea confirmar el pedido?')) {
            this.confirmarTransaccion();
          }
        },(err: any) => {
          
          console.log(err.error.mensaje)
        })
        this.serviceModal.dismissAll()
        this.serviceModal.open(this.modalDetalle);
      }else{
        this.serviceLugar.createLugar(this.lugar).subscribe(data=>{
          alert(data);
        },(err: any) => {
          console.log(err.error.mensaje)
        })
        this.serviceModal.dismissAll()
        this.serviceModal.open(this.modalDetalle);
      }
      
  
    
  }
  getLugaresUsuario1(){
    this.serviceLugar.getLugaresIdUsuario1(parseInt(this.tokenService.getIdUser())).subscribe(data=>{
      console.log("listado de lugares del usuario");
      console.log(data);
      this.lugares=data;
    })
  }
}

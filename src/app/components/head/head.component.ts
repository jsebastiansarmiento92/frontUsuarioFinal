import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';
import { Router } from '@angular/router';
import { Lugar } from 'src/app/models/lugar';
import { LugarService } from 'src/app/services/lugar-service/lugar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuario';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido-service/pedido.service';
import { DetalleServicioService } from 'src/app/services/detalleServicio-service/detalle-servicio.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isLogin = false;
  roles: string[];
  authority: string;
  lugar:Lugar=new Lugar();
  refreshHead=false;
  nombreUsuario="";
  telefono="sin guardar";
  pedidos:Pedido[];
  mensajeTramitando="";
  @ViewChild('guardarTelefonoModal', { static: false }) guardarTelefonoModal;
  @ViewChild('tramitandoModal', { static: false }) tramitandoModal;
  detalleServicios:DetalleServicio[];
  pedido:Pedido;
  imagePerfil='';
  isImagePerfil=false;
  passwordNueva="";
  confirmacionPassword="";
  usuario:Usuario=new Usuario();
  isLogged;
  isLoginFail
  constructor(private tokenService: TokenService,
    private router: Router,
    private lugarService:LugarService,
    private serviceModal:NgbModal,
    private usuarioService:UsuarioService,
    private pedidoService:PedidoService,
    private detalleServicioService:DetalleServicioService,
    private modalService:NgbModal,
    private authService:AuthService) { }

  ngOnInit() {
    console.log("ingreso a ngoinit de head");
    if(JSON.parse(localStorage.getItem('lugar'))){
      console.log("hay lugar guardado en el localstorage");
      this.lugar = JSON.parse(localStorage.getItem('lugar'));
    }

    if(window.sessionStorage.getItem("Telefono")){
      if(window.sessionStorage.getItem("Telefono")!="0"){
        console.log("telefono es "+window.sessionStorage.getItem("Telefono"));
        this.telefono=window.sessionStorage.getItem("Telefono");
      }
    }
    if(window.sessionStorage.getItem("ImageUrl")){
      if(window.sessionStorage.getItem("ImageUrl")!=""){
        console.log(window.sessionStorage.getItem("ImageUrl"));
        this.imagePerfil=window.sessionStorage.getItem("ImageUrl");
        this.isImagePerfil=true;
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
    if(localStorage.getItem("isLoggedin")&&this.refreshHead){
      if (localStorage.getItem("isLoggedin")=='true') {
        console.log("ingreso a guardar mi direccions");
        this.guardarMidireccion();
        this.isLogin = true;
      }
    }
    this.refreshHead=false;
    this.pedidoService.getPedidosCurso("Solicitado",parseInt(this.tokenService.getIdUser())).subscribe(data=>{
      console.log("pedidos extraidos");
      this.pedidos=data;
      console.log(data);
    });
    this.getUser();
  }


  mostrarNombreSesion(){
    this.nombreUsuario=window.sessionStorage.getItem("AuthUserName");
  }
  guardarMidireccion(){
    if(sessionStorage.getItem("IdLugar")=="0"){
      console.log("no se extrae lugar de ningun lado");
    }else{
      this.lugarService.getLugarId(parseInt(sessionStorage.getItem("IdLugar"))).subscribe(data=>{
        this.lugar=data;
      });
    }
   
  }
  guardarTelefonoModalOpen(modal){
    //this.telefono="";
    //alert("se recomienda ingresar numero de contacto ")
    this.serviceModal.open(modal);

  }

  closeModal(){
    this.serviceModal.dismissAll();
  }

  guardarUsuario(){
    let usuario:Usuario= new Usuario();
    console.log("nombre de usuario: "+ this.nombreUsuario);
        usuario.name=this.nombreUsuario;
        usuario.id=parseInt(window.sessionStorage.getItem("IdSesion"));
      usuario.telefono=this.telefono;
            if((this.telefono+"").length>6){
              this.mensajeTramitando="Guardando informacion";
              this.serviceModal.open(this.tramitandoModal);
              
        this.usuarioService.updateUsuario(usuario,parseInt(window.sessionStorage.getItem("IdSesion"))).subscribe(data=>{
          alert(data.mensaje);
          window.sessionStorage.setItem("Telefono",this.telefono+"");
          this.serviceModal.dismissAll();
        }, (err: any) => {
          console.log(err.error.mensaje)
          this.telefono=window.sessionStorage.getItem("Telefono");
        });
      }else alert("numero de contacto no valido");
  }
  refresh(){
    this.refreshHead=true;
    this.ngOnInit();
  }
  cambiar(){
    localStorage.removeItem("barrios");
    localStorage.setItem('cambioDireccion', 'false');
    this.router.navigate(['landing']);
  }
  logOut(): void {

    if (confirm("desea cerrar sesion?")) {
      console.log("cerrar sesion");
      this.tokenService.logOut();
      this.isLogin = false;
      this.authority = '';
      this.nombreUsuario="";
      
      //this.router.navigate([""]);
    } else {

    }
  }
  login() {
    
    this.router.navigate(["login"]);

  }
  privacyPolicy() {
    console.log("ingreso a politica de privacidad");
    this.router.navigate(["privacy-policy"]);

  }
  inicio() {
    this.router.navigate(["inicio"]);

  }
  onRegister(){
    this.router.navigate(['signup']);
  }
  getIslogin() {
    if(localStorage.getItem("isLoggedin")=="true"){
      return true;
    }else
    return false;

  }

  cargarPedidosCliente(){ 
    this.mensajeTramitando="cargando pedidos";
    this.serviceModal.open(this.tramitandoModal);
    this.pedidoService.getPedidosCliente(parseInt(this.tokenService.getIdUser())).subscribe(data=>{
      console.log("pedidos extraidos");
      console.log(data);
      console.log(this.pedidos);
     /** data.forEach(element => {
        console.log(element.estadoPedido+"=="+"Solicitado");

        if(element.estadoPedido=="Solicitado"){
          this.pedidos.push(element);
        }
      });*/
      this.pedidos=data;
      this.serviceModal.dismissAll();
    })
  }

  detallePedido(pedido,modal){
    this.pedido=pedido;
    this.serviceModal.open(modal);
    
    this.detalleServicioService.getDetalles(pedido.id).subscribe(data=>{
      console.log("detalles encontrados son: ")
      console.log(data);
      this.detalleServicios=data;
    });
  }

  modificarObservacion(modal){

this.serviceModal.open(modal);
  }
  confirmarObservacion(){
    this.mensajeTramitando="cambiando obseraciones";
    this.serviceModal.open(this.tramitandoModal);
    this.pedidoService.modificarPedidoObservaciones(this.pedido.id,this.pedido).subscribe(data=>{
      alert("observacion modificada");
      this.serviceModal.dismissAll();
    });
  }

  openChangePass(modal){
    this.modalService.open(modal);
}
confirmarPassw(){
  console.log("contraseña nueva es:"+this.confirmacionPassword);
  if(this.passwordNueva===this.confirmacionPassword){
      this.usuario.password=this.confirmacionPassword;
      this.usuario.name=this.tokenService.getUserName();
      this.usuario.id=parseInt(this.tokenService.getIdUser());
      if (confirm('confirma cambio de contraseña para el usuario '+this.usuario.name+'?')) {
        this.usuarioService.updateContraseñaPerfil(this.usuario,this.usuario.id).subscribe(data=>{
          alert(data.mensaje);
         // this.caja.dineroRecibido-=consignacion.valor;
          this.modalService.dismissAll();
          this.logOut();
        },(err: any) =>{
          alert(err.error);
        })
      }
    }else{
      alert("contraseña no coincide");
    }

}
getUser() {

  this.authService.getCurrentUser().subscribe(data => {
    console.log("ingreso de metodo de get currentuser")
    console.log(data);
    window.localStorage.setItem("idSesion", JSON.stringify(data));
    //window.localStorage.setItem("AuthToken", data.token);
   // window.sessionStorage.setItem("AuthToken", data.token);
    //this.tokenService.setToken(data.token);
    this.tokenService.setUserName(data.name);
    this.tokenService.setAuthorities(data.rol);
    this.tokenService.setIdUser(data.id);
    this.tokenService.setLugar(data.idLugar);
    this.tokenService.setTelefono(data.telefono);
    this.tokenService.setEstadoUsuario(data.estado);
    this.tokenService.setEmailVerified(data.emailVerified);
    //window.sessionStorage.setItem("idSesion",data.);
    //window.sessionStorage.setItem("AuthToken",this.tokenService.getToken());
    this.isLogged = true;
    this.isLoginFail = false;
    this.roles = this.tokenService.getAuthorities();
    localStorage.setItem('isLoggedin', 'true');
    //window.location.reload();
    //this.router.navigate(['/inicio']);
    //this.loader = false;
    //this.cerrarModal();
  });
}
}

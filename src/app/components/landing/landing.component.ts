import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarrioService } from 'src/app/services/barrio-service/barrio.service';
import { Barrio } from 'src/app/models/barrio';
import { Lugar } from 'src/app/models/lugar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { LugarService } from 'src/app/services/lugar-service/lugar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  urlTree;
  token:string;
  error:string;
  setState=false;
  currentUser:any;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  loader=false;

  n1: number;
  n2: number;
  n3: number;

  barrio:Barrio;
  barrios:Barrio[]=[];
  cargaBarrios=false;
  tipoDirecciones: String[] = [];
  barrioSeleccionado: string = '0';
  tipoDireccionSeleccionado: string = '0';
  @ViewChild('tramitandoModal', { static: false }) cargandoModal;

  telefono="";
  //busquedaBarrio="";
  searchText="";
 /**
  * Shows or hide the search elements
  * @var {boolean} searching
  */
 public searching: boolean = false;
 


  constructor(private router:Router,private barrioService:BarrioService,
    private serviceModal : NgbModal,
    private authService:AuthService,
    private tokenService:TokenService,
    private serviceLugar:LugarService) { }

  ngOnInit() {
    //this.autenticarToken();
    //this.autenticar();
    console.log("ingreso metodo ngOninit landing");
    if(!localStorage.getItem('barrios')){
      this.cargarBarrios();
    }else
    this.barrios=JSON.parse(localStorage.getItem('barrios'))


    this.llenarTipodirecciones();
    
  }
  

  /**reanudarSesion(){

    if(localStorage.getItem("idSesion")!=null){
      let data=JSON.parse(localStorage.getItem('idSesion'));
      this.tokenService.setUserName(data.name);
    this.tokenService.setAuthorities(data.rol);
    this.tokenService.setIdUser(data.id);
    this.tokenService.setLugar(data.idLugar);
    this.tokenService.setEstadoUsuario(data.estado);
    }
  }*/
  /**autenticarToken(){
    this.serviceModal.open(this.cargandoModal);
    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.queryParams['token'];
    this.error = this.urlTree.queryParams['error'];
    if(this.token==null){
      console.log("no hay token guardado");
    }else
    if(this.token.length>1){
      window.sessionStorage.setItem('AuthToken', this.token);
      window.localStorage.setItem('AuthToken', this.token);
     }
    console.log("token llegando es:");
    console.log(this.token);
    console.log("error llegando es ");
    console.log(this.error);
  if(window.sessionStorage.getItem('AuthToken')){

    console.log("hay tonken guardado porque ingresa al if");

    this.authService.getCurrentUser().subscribe(data=>{
      console.log(data);
 
    window.localStorage.setItem("idSesion",JSON.stringify(data));
    this.tokenService.setUserName(data.name);
    this.tokenService.setAuthorities(data.rol);
    this.tokenService.setIdUser(data.id);
    this.tokenService.setLugar(data.idLugar);
    this.tokenService.setTelefono(data.telefono);
    this.tokenService.setEstadoUsuario(data.estado);
    this.isLogged = true;
    this.isLoginFail = false;
    this.roles = this.tokenService.getAuthorities();
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['inicio']);

    this.loader=false;

    });
  }
  }*/
  
  /**autenticar(){
 
  if(window.localStorage.getItem('AuthToken')){
    window.sessionStorage.setItem('AuthToken',window.localStorage.getItem('AuthToken'));
    console.log("hay tonken guardado porque ingresa al if");
    this.authService.getCurrentUser().subscribe(data=>{
      console.log(data);

    window.localStorage.setItem("idSesion",JSON.stringify(data));
    this.tokenService.setUserName(data.name);
    this.tokenService.setAuthorities(data.rol);
    this.tokenService.setIdUser(data.id);
    this.tokenService.setLugar(data.idLugar);
    this.tokenService.setTelefono(data.telefono);
    this.tokenService.setEstadoUsuario(data.estado);
    this.isLogged = true;
    this.isLoginFail = false;
    this.roles = this.tokenService.getAuthorities();
    localStorage.setItem('isLoggedin', 'true');
    this.loader=false;
    });
  } 
    this.reanudarSesion();
  
  }*/
  inicio(modal){
    this.serviceModal.open(modal);
    if(localStorage.getItem('cambioDireccion')){
      if(localStorage.getItem('cambioDireccion')=='false'){
        localStorage.setItem('cambioDireccion','true');
      }
    }
    let lugar:Lugar=new Lugar();
    lugar.barrio=this.barrio;
    lugar.direccionLugar=this.tipoDireccionSeleccionado+" "+this.n1+"#"+this.n2+"-"+this.n3;
    lugar.idUsuario=parseInt(sessionStorage.getItem("IdSesion"));
    if(parseInt(sessionStorage.getItem("IdLugar"))!=0){
      this.promesaModificarLugar(lugar);
      
      window.localStorage.setItem("lugar", JSON.stringify(lugar));
      window.sessionStorage.setItem("Telefono",this.telefono);
      console.log("oprimidio inicio")
      this.router.navigate(["inicio"]);
      this.serviceModal.dismissAll();
    }else{
      this.serviceLugar.createLugar(lugar).subscribe(data=>{
        console.log(data);
        this.serviceLugar.getLugaresIdUsuario1(parseInt(sessionStorage.getItem("IdSesion"))).subscribe(data=>{
          sessionStorage.setItem("IdLugar",data[0].idLugar);
        })
      });
     
      window.localStorage.setItem("lugar", JSON.stringify(lugar));
      console.log("oprimidio inicio")
      this.serviceModal.dismissAll();
      this.router.navigate(["inicio"]);
    }
  }

 
  cargarBarrios(){
    this.cargaBarrios=true;
    this.barrioService.getBarrios().subscribe(data=>{
      for (var i = 0; i < data.length; i++) {
        this.barrios.push(data[i]);
      }
      
      this.barrios=data;
      console.log("barrios cargados");
      console.log(data);
      localStorage.setItem("barrios", JSON.stringify(data))
      this.cargaBarrios=false;
      location.reload();
    })
    alert("ingresa direccion");
  }

  promesaModificarLugar(lugar:Lugar) {
    console.log("id del lugar guadados son: ");
    console.log(sessionStorage.getItem('IdLugar'));
   
    localStorage.setItem("lugar", JSON.stringify(lugar));
    lugar.idLugar = parseInt(sessionStorage.getItem('IdLugar'));
    this.serviceLugar.modificarLugar(lugar).subscribe(data => {
      console.log("se ha modificado un lugar");
    }, (err: any) => {
      if (err.error.mensaje === undefined) {
        //alert("debe ingresar o registrarse");
        this.router.navigate(["inicio"]);
      }
      console.log(err.error.mensaje)
    });
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
  capturarBarrio() {
    this.getBarrio();
    console.log("barrio seleccionado ");
    console.log(this.barrio);
  }
  
  getBarrio() {

    this.barrios.forEach(element => {
      if (element.nombreBarrio == this.barrioSeleccionado) {
        this.barrio = element;
      }
    });

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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarrioService } from 'src/app/services/barrio-service/barrio.service';
import { Barrio } from 'src/app/models/barrio';
import { Lugar } from 'src/app/models/lugar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { LugarService } from 'src/app/services/lugar-service/lugar.service';

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

  constructor(private router:Router,private barrioService:BarrioService,
    private authService:AuthService,
    private tokenService:TokenService,
    private serviceLugar:LugarService) { }

  ngOnInit() {

    this.autenticar();
    console.log("ingreso metodo ngOninit lanfing")
    if(!localStorage.getItem('barrios')){
      this.cargarBarrios();
    }else
    this.barrios=JSON.parse(localStorage.getItem('barrios'))


    this.llenarTipodirecciones();
    
  }
  reanudarSesion(){

    if(localStorage.getItem("idSesion")!=null){
      let data=JSON.parse(localStorage.getItem('idSesion'));
      this.tokenService.setUserName(data.name);
    this.tokenService.setAuthorities(data.rol);
    this.tokenService.setIdUser(data.id);
    this.tokenService.setLugar(data.idLugar);
    //this.router.navigate(['inicio']);
    }
  }
  autenticar(){
 
  if(window.localStorage.getItem('AuthToken')){
    window.sessionStorage.setItem('AuthToken',window.localStorage.getItem('AuthToken'));
    console.log("hay tonken guardado porque ingresa al if");
    this.authService.getCurrentUser().subscribe(data=>{
      console.log(data);
    //this.tokenService.setToken(data.token);
    window.localStorage.setItem("idSesion",JSON.stringify(data));
    this.tokenService.setUserName(data.name);
    this.tokenService.setAuthorities(data.rol);
    this.tokenService.setIdUser(data.id);
    this.tokenService.setLugar(data.idLugar);
    //alert("id del usuario lopueado es "+data.id);
    //window.sessionStorage.setItem("idSesion",data.);
    this.isLogged = true;
    this.isLoginFail = false;
    this.roles = this.tokenService.getAuthorities();
    localStorage.setItem('isLoggedin', 'true');
    //window.location.reload();
    //this.router.navigate(['inicio']);
    this.loader=false;
    });
  } 
    this.reanudarSesion();
  
  }
  inicio(){
    if(localStorage.getItem('cambioDireccion')){
      if(localStorage.getItem('cambioDireccion')=='false'){
        localStorage.setItem('cambioDireccion','true');
      }
    }
    let lugar:Lugar=new Lugar();
    lugar.barrio=this.barrio;
    lugar.direccionLugar=this.tipoDireccionSeleccionado+" "+this.n1+"#"+this.n2+"-"+this.n3;
    this.promesaModificarLugar(lugar);
    localStorage.setItem("lugar", JSON.stringify(lugar));
    console.log("oprimidio inicio")
    
    this.router.navigate(["inicio"]);
  }

  cargarBarrios(){
    this.cargaBarrios=true;
    this.barrioService.getBarrios().subscribe(data=>{
      this.barrios=data;
      console.log("barrios cargados");
      console.log(data);
      localStorage.setItem("barrios", JSON.stringify(data))
      this.cargaBarrios=false;
      location.reload();
    })
  }

  promesaModificarLugar(lugar:Lugar) {
    

    console.log("id del lugar guadados son: ");
    console.log(sessionStorage.getItem('IdLugar'));
    lugar.idLugar = parseInt(sessionStorage.getItem('IdLugar'));
    this.serviceLugar.modificarLugar(lugar).subscribe(data => {
      
    }, (err: any) => {
      if (err.error.mensaje === undefined) {
        alert("debe ingresar o registrarse");
        this.router.navigate(["login"]);
      }
      console.log(err.error.mensaje)
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
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarrioService } from 'src/app/services/barrio-service/barrio.service';
import { Barrio } from 'src/app/models/barrio';
import { Lugar } from 'src/app/models/lugar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';

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
    private tokenService:TokenService) { }

  ngOnInit() {
    this.autenticar();
    console.log("ingreso metodo ngOninit lanfing")
    if(!localStorage.getItem('barrios')){
      this.cargarBarrios();
    }else
    this.barrios=JSON.parse(localStorage.getItem('barrios'))


    this.llenarTipodirecciones();
    
  }
  autenticar(){
    console.log("no hay token guardado");
    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.queryParams['token'];
    this.error = this.urlTree.queryParams['error'];
    window.sessionStorage.setItem('AuthToken', this.token);
    console.log("token llegando es:");
    console.log(this.token);
    console.log("error llegando es ");
    console.log(this.error);
  if(window.sessionStorage.getItem('AuthToken')){

    console.log("hay tonken guardado porque ingresa al if");

    this.authService.getCurrentUser().subscribe(data=>{
      console.log(data);
    //this.tokenService.setToken(data.token);
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
    this.router.navigate(['inicio']);
    this.loader=false;
    });
  }
  }

  inicio(){
    
    let lugar:Lugar=new Lugar();
    lugar.barrio=this.barrio;
    lugar.direccionLugar=this.tipoDireccionSeleccionado+" "+this.n1+"#"+this.n2+"-"+this.n3;
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

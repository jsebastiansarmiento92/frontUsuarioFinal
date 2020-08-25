import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';
import { Router } from '@angular/router';
import { Lugar } from 'src/app/models/lugar';
import { LugarService } from 'src/app/services/lugar-service/lugar.service';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isLogin = false;
  roles: string[];
  authority: string;
  lugar:Lugar;
  refreshHead=false;
  nombreUsuario="";
  telefono="sin guardar";
  constructor(private tokenService: TokenService,
    private router: Router,
    private lugarService:LugarService) { }

  ngOnInit() {
    console.log("hay lugar guardado en el localstorage");
    
    this.lugar = JSON.parse(localStorage.getItem('lugar'));
    console.log(this.lugar);
    console.log("verificacion is login");

    this.lugar=new Lugar();
    this.mostrarNombreSesion();
    if (this.tokenService.getToken() == null) {
      console.log("se limpia el locar storage en inicio");
      localStorage.removeItem("isLoggedin");
      
    }
    if(localStorage.getItem("isLoggedin")&&this.refreshHead){
      if (localStorage.getItem("isLoggedin")=='true') {
       
        this.guardarMidireccion();
        this.isLogin = true;
      
       
      }
    }
    this.refreshHead=false;
  }
  mostrarNombreSesion(){
    this.nombreUsuario=window.sessionStorage.getItem("AuthUserName");

  }
  guardarMidireccion(){
    this.lugarService.getLugarId(parseInt(sessionStorage.getItem("IdLugar"))).subscribe(data=>{
      this.lugar=data;
    })
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

  

}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { Router } from '@angular/router';
import { SignUpRequest } from 'src/app/models/sign-up-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import {UsuarioService} from 'src/app/services/usuario-service/usuario.service'

import { RecaptchaErrorParameters } from "ng-recaptcha";
import { flatten } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  recapcha: boolean = false;
  menjRecapcha: boolean = false;
  loader = false;
  logingIn = false;
  usuario: LoginUsuario = new LoginUsuario();
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';
  urlTree;
  token: string;
  error: string;
  setState = false;
  currentUser: any;
  urlgoogle=environment.url+"/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup";
  urlfacebook=environment.url+"/oauth2/authorize/facebook?redirect_uri=https://quickdomicilios.com/signup";
  signupReq: SignUpRequest = new SignUpRequest();
  @ViewChild('iframe',{ static: true }) iframe: ElementRef;
  urlSafe;

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private ngModal:NgbModal,
    private sanitizer: DomSanitizer,
    private usuarioService:UsuarioService
    ) { }

  ngOnInit() {

    /**  if (this.tokenService.getToken()) {
       //console.log("usuario "+this.tokenService.getUserName());
       this.isLogged = true;
       this.isLoginFail = false;
       this.roles = this.tokenService.getAuthorities();
     }*/
    // //console.log("no hay token guardado");
    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.queryParams['token'];
    this.error = this.urlTree.queryParams['error'];
    if(this.token!=null){
      if(this.token.length>1){
        window.sessionStorage.setItem('AuthToken', this.token);
        //window.localStorage.setItem('AuthToken', this.token);
       }
      
      //console.log("token llegando es:");
      //console.log(this.token);
      //console.log("erro llegando es ");
      //console.log(this.error);
      
      if (window.sessionStorage.getItem('AuthToken')) {
  
        //console.log("hay tonken guardado porque ingresa al if");
  
        this.getUser();
      }
  
  
    }
   

  }

  mjRecapcha(){
    if (this.recapcha) {
      this.menjRecapcha=false;
      return true;
    } else {
      this.menjRecapcha = true;
      return false;
  
    }
    
  }

  cerrarModal(){
    this.ngModal.dismissAll();
  }
  solicitarPass(){
    if (this.recapcha) {
      var valor = prompt("ingresa numero de telefono", "");
      this.usuarioService.updateContraseñaTel(valor).subscribe(data=>{
      alert(data.mensaje);
      this.menjRecapcha = false;
    });
    } else {
      this.menjRecapcha =true;
    }
    
  }
  onLoggedin(modal) {
    this.ngModal.open(modal);
    // this.usuario = new LoginUsuario(this.usuario.nombreUsuario, this.usuario.password);
    
    this.logingIn = true;
    this.loader = true;
    this.authService.login(this.signupReq).subscribe(data => {
      //console.log("ingreso a la promesa de login");
      //console.log(data);
      this.tokenService.setToken(data.accessToken);
      window.localStorage.setItem("AuthToken", data.accessToken);
      //window.sessionStorage.setItem("AuthToken", data.accessToken);
      this.isLogged = true;
      this.isLoginFail = false;
     // this.roles = this.tokenService.getAuthorities();
      localStorage.setItem('isLoggedin', 'true');
      this.getUser();
      //window.location.reload();
      this.router.navigate(['']);
      this.loader = false;
      this.cerrarModal();
      //window.location.href = '';
    },
      (err: any) => {
        this.loader = false;
        this.cerrarModal();
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = err.error.message;
        //this.router.navigate(['']);
        //console.log("error "+ err.error.message);
      }
    );
    
  }
  
  getUser() {

    this.authService.getCurrentUser().subscribe(data => {
      //console.log("ingreso de metodo de get currentuser")
      //console.log(data);
      window.localStorage.setItem("idSesion", JSON.stringify(data));
      //window.localStorage.setItem("AuthToken", data.token);
      //this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.name);
      this.tokenService.setAuthorities(data.rol);
      this.tokenService.setIdUser(data.id);
      this.tokenService.setLugar(data.idLugar);
      this.tokenService.setTelefono(data.telefono);
      this.tokenService.setEstadoUsuario(data.estado);
      this.tokenService.setEmailVerified(data.emailVerified)
      //alert("id del usuario lopueado es "+data.id);
      //window.sessionStorage.setItem("idSesion",data.);
      //window.sessionStorage.setItem("AuthToken",this.tokenService.getToken());
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      localStorage.setItem('isLoggedin', 'true');
      //window.location.reload();
      this.router.navigate(['/inicio']);
      this.loader = false;
      this.cerrarModal();
    });
  }
  
  onRegister() {
    this.router.navigate(['signup']);
  }
  
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  loginGoogle(modal) {
    //this.urlSafe= (this.url);
    
    //this.ngModal.open(modal);
   // //console.log("ingresoa registrer con google");
    window.location.href = environment.url+"/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup";
 // this.iframe.nativeElement.setAttribute('src', "http://localhost:8080/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup&output=embed");
    
  }

  loginFacebook(modal){
    //this.ngModal.open(modal);
    //console.log("ingresoa registrer con facebook")
    location.href=environment.url+"/oauth2/authorize/facebook?redirect_uri=https://quickdomicilios.com/signup";
  }
  public resolved(captchaResponse: string): void {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse == null){
      this.recapcha= false;
    } else{
      this.recapcha =  true;
    }
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    this.recapcha =  false;
    //console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}

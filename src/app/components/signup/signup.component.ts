import { Component, OnInit ,Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { SignUpRequest } from 'src/app/models/sign-up-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  urlTree;
  token:string;
  error:string;
  setState=false;
  currentUser:any;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';
  loader=false;
  signupRequest:SignUpRequest=new SignUpRequest();
  creado ;
  failCreado;
  msjErr= ''; ;
  msjOK = '';
  checkTErminos=false;
  autenticando=false;
  @ViewChild('autenticandoModal',{static:false})autenticandoModal;

  constructor(private authService:AuthService,
    private router:Router,
    private tokenService:TokenService,
    private serviceModal:NgbModal) { 

    }

  ngOnInit(): void {
      this.serviceModal.dismissAll();
     // console.log("no hay token guardado");
      this.urlTree = this.router.parseUrl(this.router.url);
      this.token = this.urlTree.queryParams['token'];
      this.error = this.urlTree.queryParams['error'];
      if(this.token==undefined){

      }else{
        if(this.token.length>1){
          window.sessionStorage.setItem('AuthToken', this.token);
          window.localStorage.setItem('AuthToken', this.token);
         }
        console.log("token llegando es:");
        console.log(this.token);
        console.log("error llegando es ");
        console.log(this.error);
      if(window.sessionStorage.getItem('AuthToken')){
        this.serviceModal.open(this.autenticandoModal);
        console.log("hay tonken guardado porque ingresa al if");
        this.autenticando=true;
       
  
        this.authService.getCurrentUser().subscribe(data=>{
         
          console.log(data);
        //this.tokenService.setToken(data.token);
        window.localStorage.setItem("idSesion",JSON.stringify(data));
        this.tokenService.setUserName(data.name);
        this.tokenService.setAuthorities(data.rol);
        this.tokenService.setIdUser(data.id);
        this.tokenService.setLugar(data.idLugar);
        this.tokenService.setTelefono(data.telefono);
        this.tokenService.setImageUrl(data.imageUrl);
        //alert("telefono es:"+data.telefono);
        //alert("id del usuario lopueado es "+data.id);
        //window.sessionStorage.setItem("idSesion",data.);
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
        localStorage.setItem('isLoggedin', 'true');
        //window.location.reload();
        this.autenticando=false;
        this.serviceModal.dismissAll();
        this.router.navigate(['inicio']);
        this.loader=false;
        
        });
      }
      }
      
    
  }
  guardarTelefono(){
  if(window.sessionStorage.getItem("telefono")){
    if(window.sessionStorage.getItem("telefono").length>=7){
      console.log("telefono valido");
    //  this.
    } else alert("telefono invalido se recomienda modifica en menu cuenta");
  }
  }
  getIslogin():boolean{
    return false
  }
  logOut(){
    
  }
  registerGoogle(){
   // console.log("ingresoa registrer con google");
    location.href="http://localhost:8080/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup";
  }
  registerFacebook(){
    console.log("ingresoa registrer con facebook");
    location.href="http://localhost:8080/oauth2/authorize/facebook?redirect_uri=https://quickdomicilios.com/signup";
  }


  registerManual(modal){
    this.serviceModal.open(modal);
    console.log("datos que se envian para el registro");
    console.log(this.signupRequest);
    if(this.checkTErminos){
      this.authService.onRegister(this.signupRequest).subscribe(data=>{
        console.log(data);
        alert("Registro completo por favor inicie sesion con sus datos para continuar");
        this.router.navigate(['login']);
        this.serviceModal.dismissAll();
      },(err: any) => {
        this.creado = false;
        this.failCreado = true;
        this.msjErr = err.error.mensaje;
        this.serviceModal.dismissAll();
        console.log(err.error.mensaje)
      });
    }else{
      console.log("no registro porque no acepto terminos y condicieones");
      this.creado = false;
      this.failCreado = true;
      this.msjErr = "para continuar con el registro es necesario que acepte terminos y condiciones";
      this.serviceModal.dismissAll();
    }
    
  }
  capturarCheck(){
    this.checkTErminos=!this.checkTErminos;
    
    console.log("primir"+this.checkTErminos);

  }
}

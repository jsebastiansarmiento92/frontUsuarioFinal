import { Component, OnInit ,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { SignUpRequest } from 'src/app/models/sign-up-request';


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

  constructor(private authService:AuthService,
    private router:Router,
    private tokenService:TokenService) { 

    }

  ngOnInit(): void {
    
     // console.log("no hay token guardado");
      this.urlTree = this.router.parseUrl(this.router.url);
      this.token = this.urlTree.queryParams['token'];
      this.error = this.urlTree.queryParams['error'];
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
      this.router.navigate(['inicio']);
      this.loader=false;
      });
    }
    
  }

  getIslogin():boolean{
    return false
  }
  logOut(){
    
  }
  registerGoogle(){
    console.log("ingresoa registrer con google")
    window.location.href="https://quickdomicilios.herokuapp.com/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup";
  }
  registerFacebook(){
    console.log("ingresoa registrer con facebook")
    window.location.href="https://quickdomicilios.herokuapp.com/oauth2/authorize/facebook?redirect_uri=https://quickdomicilios.com/signup";
  }
  registerManual(){
    console.log("datos que se envian para el registro");
    console.log(this.signupRequest);
    this.authService.onRegister(this.signupRequest).subscribe(data=>{
      console.log(data);
      alert("Registro completo por favor inicie sesion con sus datos para continuar");
      this.router.navigate(['login']);
    },(err: any) => {
      this.creado = false;
      this.failCreado = true;
      this.msjErr = err.error.mensaje;
      console.log(err.error.mensaje)
    });
  }

}

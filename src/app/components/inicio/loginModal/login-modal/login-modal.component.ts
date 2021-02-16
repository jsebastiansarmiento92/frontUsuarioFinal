import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { SignUpRequest } from 'src/app/models/sign-up-request';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

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
  signupReq: SignUpRequest = new SignUpRequest();
  @ViewChild('registroModal') registroModal;
  
  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router,
    private serviceModal: NgbModal) { }

  ngOnInit() {

    /**  if (this.tokenService.getToken()) {
       console.log("usuario "+this.tokenService.getUserName());
       this.isLogged = true;
       this.isLoginFail = false;
       this.roles = this.tokenService.getAuthorities();
     }*/
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
    console.log("erro llegando es ");
    console.log(this.error);
    if (window.sessionStorage.getItem('AuthToken')) {

      console.log("hay tonken guardado porque ingresa al if");

      this.getUser();
    }



  }

  onLoggedin() {
    // this.usuario = new LoginUsuario(this.usuario.nombreUsuario, this.usuario.password);
    this.logingIn = true;
    this.loader = true;
    this.authService.login(this.signupReq).subscribe(data => {
      console.log("ingreso a la promesa de login");
      console.log(data);
      this.tokenService.setToken(data.accessToken);
      this.isLogged = true;
      this.isLoginFail = false;
     // this.roles = this.tokenService.getAuthorities();
      localStorage.setItem('isLoggedin', 'true');
      this.getUser();
      //window.location.reload();
      this.router.navigate(['']);
      this.loader = false;
      //window.location.href = '';
    },
      (err: any) => {
        this.loader = false;
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = err.error.message;
        //this.router.navigate(['']);
        console.log("error "+ err.error.message);
      }
    );
  }
  
  getUser() {
    console.log("get user");
    this.authService.getCurrentUser().subscribe(data => {
      console.log(data);
      //window.localStorage.setItem("idSesion", JSON.stringify(data));
      //window.localStorage.setItem("AuthToken", data.token);
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.name);
      this.tokenService.setAuthorities(data.rol);
      this.tokenService.setIdUser(data.id);
      this.tokenService.setLugar(data.idLugar);
      this.tokenService.setTelefono(data.telefono);
      this.tokenService.setEstadoUsuario(data.estado);
      this.tokenService.setEmailVerified(data.emailVerified);
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
    });
  }
  onRegister() {

   // this.serviceModal.dismissAll();
    this.router.navigate(["signup"]);

  }
  loginGoogle() {
    console.log("ingresoa registrer con google");
    location.href = "https://quickdomicilios.herokuapp.com/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup";
  }
  loginFacebook(){
    console.log("ingresoa registrer con facebook");
    location.href = "https://quickdomicilios.herokuapp.com/oauth2/authorize/facebook?redirect_uri=https://quickdomicilios.com/signup";
  }

}

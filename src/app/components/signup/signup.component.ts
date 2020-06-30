import { Component, OnInit ,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';


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
  constructor(private authService:AuthService,
    private router:Router,
    private tokenService:TokenService) { 

    }

  ngOnInit(): void {
    
     // console.log("no hay token guardado");
      this.urlTree = this.router.parseUrl(this.router.url);
      this.token = this.urlTree.queryParams['token'];
      this.error = this.urlTree.queryParams['error'];
      window.sessionStorage.setItem('AuthToken', this.token);
      console.log("token llegando es:");
      console.log(this.token);
      console.log("erro llegando es ");
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
      this.router.navigate(['']);
      this.loader=false;
      });
    }
    
  }
 /** getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(this.props.location.search);
    console.log("resultado de results en el gerParemeter");
    console.log(results);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};*/
  getIslogin():boolean{
    return false
  }
  logOut(){
    
  }
  register(){
    console.log("ingresoa registrer con google")
    window.location.href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/signup";
  }
}

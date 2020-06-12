import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader=false;
  logingIn = false;
  usuario: LoginUsuario = new LoginUsuario();
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';



  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      console.log("usuario "+this.tokenService.getUserName());
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

  }

  onLoggedin() {
    // this.usuario = new LoginUsuario(this.usuario.nombreUsuario, this.usuario.password);
    this.logingIn=true;
    this.loader=true;
    this.authService.login(this.usuario).subscribe(data => {
      console.log(data);    
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
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
      //window.location.href = '';
    },
      (err: any) => {
        this.loader=false;
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = err.error.message;
        //this.router.navigate(['']);
        //console.log("error "+ err.error.message);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario } from '../../models/login-usuario';
import { Observable } from 'rxjs';
import { JwtModel } from '../../models/jwt-model';
import { NuevoUsuario } from '../../models/nuevo-usuario';
import { SignUpRequest } from 'src/app/models/sign-up-request';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };



const headers = new Headers({
  'Content-Type': 'application/json',
})

@Injectable({
  providedIn: 'root'
})
//https://quickdomicilios-client.herokuapp.com/

export class AuthService {
  private authURL = 'https://quickdomicilios-client.herokuapp.com/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(signupReq: SignUpRequest): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', signupReq);
  }

  public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', usuario, cabecera);
  }
  googleLogin(): Observable<any> {
    
    return this.httpClient.get<any>(window.location.href='https://quickdomicilios-client.herokuapp.com/oauth2/authorize/google?redirect_uri=http://quickdomicilios.com/signup');
  
  }

  getCurrentUser(): Observable<any>{
    
    return  this.httpClient.get<any>('https://quickdomicilios-client.herokuapp.com/user/me');
  }

  onRegister(signupReq:SignUpRequest): Observable<any>{
    console.log("registro manual de usuario");
    return  this.httpClient.post<any>(this.authURL+'signup',signupReq);
  }
  
}

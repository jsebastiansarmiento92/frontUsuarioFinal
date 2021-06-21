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
//http://localhost:8080/

export class AuthService {
  private authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }
  
  public login(signupReq: SignUpRequest): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', signupReq);
  }

  public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', usuario, cabecera);
  }

  googleLogin(): Observable<any> {
    return this.httpClient.get<any>(window.location.href='http://localhost:8080/oauth2/authorize/google?redirect_uri=https://quickdomicilios.com/signup');
  }

  getCurrentUser(): Observable<any>{
    return  this.httpClient.get<any>('http://localhost:8080/usuarios/user/me');
  }


  onRegister(signupReq:SignUpRequest): Observable<any>{
    return  this.httpClient.post<any>(this.authURL+'signup',signupReq);
  }
  
}

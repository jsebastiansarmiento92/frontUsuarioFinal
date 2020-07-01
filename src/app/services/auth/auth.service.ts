import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario } from '../../models/login-usuario';
import { Observable } from 'rxjs';
import { JwtModel } from '../../models/jwt-model';
import { NuevoUsuario } from '../../models/nuevo-usuario';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };



const headers = new Headers({
  'Content-Type': 'application/json',
})

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private authURL = 'https://quickdomicilios-client.herokuapp.com/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL + 'login', usuario, cabecera);
  }

  public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', usuario, cabecera);
  }
  googleLogin(): Observable<any> {
    
    return this.httpClient.get<any>(window.location.href='https://quickdomicilios-client.herokuapp.com/oauth2/authorize/google?redirect_uri=http://localhost:4200/signup');
    
    /**(environment.baseUrl + '/oauth2/authorization/google')
      .pipe(tap(response => {
        localStorage.setItem('access_token', response.accessToken);
      }));*/
  }
  getCurrentUser(): Observable<any>{
    
    return  this.httpClient.get<any>('https://quickdomicilios-client.herokuapp.com/user/me');
  }


  
}

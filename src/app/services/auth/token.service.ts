import { Injectable } from '@angular/core';



const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'rol';
const ID_SESION = 'IdSesion';
const ID_LUGAR = 'IdLugar';
const TELEFONO = 'Telefono';
const IMAGEURL='ImageUrl';
const ESTADO_USUARIO="EstadoUsuario";
const EMAIL_VERIFIED="emailVerified";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = [];
  
  constructor() { }

  public setLugar(idLugar: string): void {
    sessionStorage.removeItem(ID_LUGAR);
    sessionStorage.setItem(ID_LUGAR, idLugar);
  }
  public setEmailVerified(verified: string): void {
    window.sessionStorage.removeItem(EMAIL_VERIFIED);
    window.sessionStorage.setItem(EMAIL_VERIFIED, verified);
  }
  public getEmailVerified(): string {
    return window.sessionStorage.getItem(EMAIL_VERIFIED);
  }

  public getLugar(): string {
    return sessionStorage.getItem(ID_LUGAR);
  }
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public setIdUser(idUser: string): void {
    window.sessionStorage.removeItem(ID_SESION);
    window.sessionStorage.setItem(ID_SESION, idUser);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public getTokenAuth(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public setUserName(userName: string): void {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public setTelefono(telefono: string): void {
    sessionStorage.removeItem(TELEFONO);
    sessionStorage.setItem(TELEFONO, telefono);
  }
  public setEstadoUsuario(estado: string): void {
    sessionStorage.removeItem(ESTADO_USUARIO);
    sessionStorage.setItem(ESTADO_USUARIO, estado);
  }
  public getEstadoUsuario(): string {
    return sessionStorage.getItem(ESTADO_USUARIO);
  }
  public getTelefono(): string {
    return sessionStorage.getItem(TELEFONO);
  }
  public setImageUrl(imageUrl: string): void {
    sessionStorage.removeItem(IMAGEURL);
    sessionStorage.setItem(IMAGEURL, imageUrl);
  }
  public getImageUrl(): string {
    return sessionStorage.getItem(IMAGEURL);
  }



  public  getIdUser(): string {

    return  sessionStorage.getItem(ID_SESION);
  }
  public setAuthorities(authorities: string[]): void {
    sessionStorage.removeItem(AUTHORITIES_KEY);
    sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      //console.log(123455);
       //console.log(sessionStorage.getItem(AUTHORITIES_KEY));
        
        this.roles.push(JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
      
    }
    return this.roles;
  }

  public logOut(): void {
    sessionStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.clear();
    localStorage.clear();
  }

}

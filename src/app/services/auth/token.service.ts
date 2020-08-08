import { Injectable } from '@angular/core';



const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'rol';
const ID_SESION = 'IdSesion';
const ID_LUGAR = 'IdLugar';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = [];
  
  constructor() { }

  public setLugar(idLugar: string): void {
    window.sessionStorage.removeItem(ID_LUGAR);
    window.sessionStorage.setItem(ID_LUGAR, idLugar);
  }

  public getLugar(): string {
    return sessionStorage.getItem(ID_LUGAR);
  }
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public setIdUser(idUser: string): void {
    window.sessionStorage.removeItem(ID_SESION);
    window.sessionStorage.setItem(ID_SESION, idUser);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public  getIdUser(): string {

    return  window.sessionStorage.getItem(ID_SESION);
  }
  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      console.log(123455);
       console.log(sessionStorage.getItem(AUTHORITIES_KEY));
        
        this.roles.push(JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
      
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    
  }

}

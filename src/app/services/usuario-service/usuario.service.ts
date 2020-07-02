import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs';
import { Lugar } from 'src/app/models/lugar';

const cabecera = { headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  usuarioURL = 'http://localhost:8080/usuarios';


  constructor(private http: HttpClient) {
  }
  getUsuarios() {
    return this.http.get<Usuario[]>(this.usuarioURL);
  }
  createUsuarios(usuario: Usuario): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.http.post<Usuario>(this.usuarioURL, usuario);
  }

  updateUsuario(usuario: Usuario, id: number): Observable<any> {
    console.log("el ide seleccionado es " + usuario.id)
    return this.http.put<any>(this.usuarioURL + `/${id}`, usuario);
  }
  updateUsuarioLugar(lugar: Lugar, id: number): Observable<any> {
    //console.log("el ide seleccionado es " + usuario.id)
    return this.http.put<any>(this.usuarioURL + `/modificarLugar/${id}`, lugar);
  }

  getUsuarioId(id: number): Observable<Usuario> {
    // console.log("el ide seleccionado es "+ id)
    return this.http.get<Usuario>(this.usuarioURL + "/" + id);
  }
  borrarUsuarioId(usuario: Usuario): Observable<any> {
    console.log("el ide seleccionado es " + usuario.id);
    return this.http.delete<Usuario>(this.usuarioURL + "/" + usuario.id);
  }

  getUsuariosRol(id: number) {
    // console.log("el ide seleccionado es "+ id)
    return this.http.get<Usuario[]>(this.usuarioURL + "/finalCaja/" + id);
  }


  getDomiciliarios(estado: String) {
    // console.log("el ide seleccionado es "+ id)
    return this.http.get<Usuario[]>(this.usuarioURL + "/domiciliario/" + estado);
  }

}

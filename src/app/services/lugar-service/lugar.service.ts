import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lugar } from 'src/app/models/lugar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  lugarURL = 'http://localhost:8080/lugar';
  constructor(private http: HttpClient) { }


  createLugar(lugar:Lugar): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    console.log(lugar);
    return this.http.post<Lugar>(this.lugarURL, lugar);
  }

  getLugarId(id: number): Observable<Lugar> {
    // console.log("el ide seleccionado es "+ id)
    return this.http.get<Lugar>(this.lugarURL + "/" + id);
  }
  getLugarIdUsuario(id: number): Observable<Lugar> {
    // console.log("el ide seleccionado es "+ id)
    return this.http.get<Lugar>(this.lugarURL + "/usuario/" + id);
  }
}

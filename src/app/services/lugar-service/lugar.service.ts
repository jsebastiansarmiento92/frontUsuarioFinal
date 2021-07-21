import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lugar } from 'src/app/models/lugar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  url=environment.url;
  lugarURL = this.url+'/lugar';
  constructor(private http: HttpClient) { }


  createLugar(lugar:Lugar): Observable<Lugar> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    //console.log(lugar);
    return this.http.post<Lugar>(this.lugarURL, lugar);
  }

  getLugarId(id: number): Observable<Lugar> {
    // //console.log("el ide seleccionado es "+ id)
    return this.http.get<Lugar>(this.lugarURL + "/" + id);
  }
  getLugaresIdUsuario1(id: number): Observable<any> {
    // //console.log("el ide seleccionado es "+ id)
    return this.http.get<Lugar[]>(this.lugarURL + "/usuario/" + id);
  }
  modificarLugar(lugar:Lugar): Observable<any>{
    //console.log(lugar);
    return this.http.put<Lugar>(this.lugarURL+'/modificarLugar', lugar);
  }
}

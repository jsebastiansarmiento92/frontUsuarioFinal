import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Caja } from '../../models/caja';
import { Observable } from 'rxjs';

const cabecera = { headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})


export class CajaService {
  cajaURL = 'https://quickdomicilios.herokuapp.com/cajas';

  constructor(private http: HttpClient) { }

  createCaja(caja:Caja): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    //console.log(caja);
    return this.http.post<Caja>(this.cajaURL, caja);
  }
  getCajas(): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.http.get<Caja[]>(this.cajaURL);
  }
  getCajasAll(): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.http.get<Caja[]>(this.cajaURL+"/all");
  }
  getCajaId(id:number): Observable<Caja>{
     //console.log("el ide el usuario que asigna id es "+ id)
     return this.http.get<Caja>(this.cajaURL+"/"+id);
   }
   getCajaUsuario(id:number): Observable<Caja>{
    //console.log("el ide el usuario que asigna id es "+ id)
    return this.http.get<Caja>(this.cajaURL+"/getCajaUsuario/"+id);
  }
   updateCajaDar(caja:Caja, id: number,valor:number): Observable<any>{
    //console.log("el ide seleccionado es de dar"+ id)
    return this.http.put<any>(this.cajaURL+`/modificarDar/${id}`+`&${valor}`,caja); 
  }
  updateCaja(caja:Caja, id: number): Observable<any>{
    //console.log("el ide seleccionado es solo update "+ id)
    return this.http.put<any>(this.cajaURL+`/modificar/${id}`,caja); 
  }
  updateCajaQuitar(caja:Caja, id: number,valor:number): Observable<any>{
    //console.log("el ide seleccionado es de quitar"+ id)
    return this.http.put<any>(this.cajaURL+`/modificarQuitar/${id}`+`&${valor}`,caja); 
  }

}

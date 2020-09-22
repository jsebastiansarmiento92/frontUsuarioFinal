import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleCaja } from 'src/app/models/detalle-caja';

const cabecera = { headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class DetalleCajaService {
  detalleCajaURL = 'https://quickdomicilios.herokuapp.com/detalleCajas';
  constructor(private http: HttpClient) { }


  getCajas(id:number): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    //console.log("se busca la caja con id "+id);
    return this.http.get<DetalleCaja[]>(this.detalleCajaURL+"/"+id);
  }
}

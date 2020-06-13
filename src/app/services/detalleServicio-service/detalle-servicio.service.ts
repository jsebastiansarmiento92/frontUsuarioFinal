import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleServicioService {

  detalleservicioURL = 'http://localhost:8080/QuickDomiciliosCrud-0.0.1-SNAPSHOT/detalleServicio';

  constructor(private http: HttpClient) {

   }
   createDetalleServicio(detalleServicio:DetalleServicio): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    console.log(detalleServicio);
    return this.http.post<DetalleServicio>(this.detalleservicioURL, detalleServicio);
  }
  getServicio(idEmpresa: number,idCliente:number): Observable<any>{
   console.log("el id empresa es "+ idEmpresa);
   console.log("el id cliente es "+ idCliente);
   return this.http.get<any>(this.detalleservicioURL+`/getServicio/${idEmpresa}`+`&${idCliente}`); 
  }
}

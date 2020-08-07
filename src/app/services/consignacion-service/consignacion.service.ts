import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consignacion } from 'src/app/models/consignacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsignacionService {
  consignacionURL = 'https://quickdomicilios.herokuapp.com/consignaciones';

  
  constructor(private http: HttpClient) { }


  createConsignacion(consignacion: Consignacion): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    //console.log("consignacion lista para enviar por el endpoint");
    //console.log(consignacion);
    return this.http.post<Consignacion>(this.consignacionURL+'/'+consignacion.caja.idCaja, consignacion);
    
  }

}

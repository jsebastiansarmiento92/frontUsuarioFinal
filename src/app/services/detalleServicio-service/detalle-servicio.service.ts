import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleServicioService {

  url=environment.url;
  detalleservicioURL = this.url+'/detalleServicio';

  constructor(private http: HttpClient) {

   }
   createDetalleServicio(detalleServicio:DetalleServicio): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    //console.log(detalleServicio);
    return this.http.post<DetalleServicio>(this.detalleservicioURL, detalleServicio);
  }
  getServicio(idEmpresa: number,idCliente:number): Observable<any>{
   //console.log("el id empresa es "+ idEmpresa);
   //console.log("el id cliente es "+ idCliente);
   return this.http.get<any>(this.detalleservicioURL+`/getServicio/${idEmpresa}`+`&${idCliente}`); 
  }

  getDetalles(idPedido: number): Observable<any>{
 
    return this.http.get<DetalleServicio[]>(this.detalleservicioURL+`/getDetalles/${idPedido}`); 
   }


  createDetalleServicioList(detalleServicioList:DetalleServicio[]): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    //console.log("la lista que se envia en detalle es:");
    //console.log(detalleServicioList);

    return this.http.post<DetalleServicio[]>(this.detalleservicioURL+'/insertarLista', detalleServicioList);
  }

}

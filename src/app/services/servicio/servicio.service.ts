import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url=environment.url;
  servicioURL = this.url+'/servicio';
  constructor(private http: HttpClient) { }

  updateServicio(servicio:Servicio): Observable<any>{
    //console.log("el ide seleccionado es "+ servicio.id)
    return this.http.put<any>(this.servicioURL+"/modificarEstado",servicio); 
  }
}

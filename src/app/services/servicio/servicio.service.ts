import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  servicioURL = 'http://localhost:8080/QuickDomiciliosCrud-0.0.1-SNAPSHOT/servicio';
  constructor(private http: HttpClient) { }

  updateServicio(servicio:Servicio): Observable<any>{
    console.log("el ide seleccionado es "+ servicio.id)
    return this.http.put<any>(this.servicioURL+"/modificarEstado",servicio); 
  }
}

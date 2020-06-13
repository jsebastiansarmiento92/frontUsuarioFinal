import { Injectable } from '@angular/core';
import { Barrio } from 'src/app/models/barrio';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {
  barrioURL = 'http://localhost:8080/QuickDomiciliosCrud-0.0.1-SNAPSHOT/barrios';
  constructor(private http: HttpClient) { }

  getBarrios() {
    return this.http.get<Barrio[]>(this.barrioURL);
  }

}

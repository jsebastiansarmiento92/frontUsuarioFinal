import { Injectable } from '@angular/core';
import { Barrio } from 'src/app/models/barrio';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {
  url=environment.url;
  barrioURL = this.url+'/barrios';
  constructor(private http: HttpClient) { }

  getBarrios() {
    return this.http.get<Barrio[]>(this.barrioURL);
  }

}

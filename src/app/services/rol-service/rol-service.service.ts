import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from '../../models/rol';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})



export class RolServiceService {

 

  rolURL = 'https://quickdomicilios.herokuapp.com/roles';



  constructor(private http: HttpClient) {
   }
   getRoles() : Observable<Rol[]>{
    return this.http.get<Rol[]>(this.rolURL);
  }
  createRol(rol: Rol) {
    return this.http.post<Rol>(this.rolURL, rol);
  }

  updateRol(rol:Rol){
    //console.log("el ide seleccionado es "+ rol.id)
    return this.http.put<Rol>(this.rolURL,rol); 
  }

  getRolId(id:number){
   // //console.log("el ide seleccionado es "+ id)
    return this.http.get<Rol>(this.rolURL+"/"+id);
  }
  borrarRolId(rol:Rol){
    // //console.log("el ide seleccionado es "+ id)
     return this.http.delete<Rol>(this.rolURL+"/"+rol.id);
   }
}

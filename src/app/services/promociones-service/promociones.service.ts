import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promociones } from 'src/app/models/promociones';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  
  productoURL = 'http://localhost:8080/promociones';
  constructor(private httpClient: HttpClient) { }
  
  listarUsuarioFinal() : Observable<any>{
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.httpClient.get<Promociones[]>(this.productoURL+"/listarUsuarioFinal");
 }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promociones } from 'src/app/models/promociones';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  url=environment.url;
  productoURL =  this.url+'/promociones';
  constructor(private httpClient: HttpClient) { }
  
  listarUsuarioFinal() : Observable<any>{
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.httpClient.get<Promociones[]>(this.productoURL+"/listarUsuarioFinal");
 }
}
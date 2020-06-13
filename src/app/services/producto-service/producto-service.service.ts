import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {
  productoURL = 'http://localhost:8080/QuickDomiciliosCrud-0.0.1-SNAPSHOT/productos';
  constructor(private httpClient: HttpClient) { }

  creaProducto(producto: Producto): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    console.log(producto);
    return this.httpClient.post<Producto>(this.productoURL, producto);
  }
  getProductos() : Observable<any>{
     //alert("nombre que se envia es "+ usuario.nombreUsuario)
     return this.httpClient.get<Producto[]>(this.productoURL);
  }
  listarUsuarioFinal() : Observable<any>{
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.httpClient.get<Producto[]>(this.productoURL+"/listarUsuarioFinal");
 }
}

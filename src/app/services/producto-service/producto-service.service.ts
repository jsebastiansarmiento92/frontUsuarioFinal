import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { Empresa } from 'src/app/models/empresa';



@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {
  productoURL = 'http://localhost:8080/productos';
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
  getProductosEmpresa(empresa:Empresa) : Observable<any>{
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.httpClient.get<Producto[]>(this.productoURL+'/listarPorEmpresa'+"/"+empresa.idEmpresa);
 }
  listarUsuarioFinal() : Observable<any>{
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.httpClient.get<Producto[]>(this.productoURL+"/listarUsuarioFinal");
 }
}

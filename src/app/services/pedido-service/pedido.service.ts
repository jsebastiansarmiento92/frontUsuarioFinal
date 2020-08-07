import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from 'src/app/models/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  pedidoURL = 'https://quickdomicilios.herokuapp.com/pedido';

  constructor(private http: HttpClient) {

   }
   createPedido(pedido:Pedido): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    console.log(pedido);
    return this.http.post<Pedido>(this.pedidoURL, pedido);
  }

  getPedidosFiltro(filtro:string): Observable<any> {
    
    return this.http.get<Pedido[]>(this.pedidoURL+`/pedidosFiltro/${filtro}`);
  }
  getPedidosCurso(filtro:string,idDomiciliario:number): Observable<any> {
    
    return this.http.get<Pedido[]>(this.pedidoURL+`/pedidosCurso/${filtro}`+`&${idDomiciliario}`);
  }

  modificarPedidoDomiciliario(idPedido:number, idDomiciliario: number,pedido:Pedido): Observable<any>{
    console.log("el ide seleccionado es de modificarpeidoDom"+ idDomiciliario)
    return this.http.put<any>(this.pedidoURL+`/modificarDomiciliario/${idPedido}`+`&${idDomiciliario}`,pedido); 
  }
  getPedido(idPedido:number): Observable<any> {
    
    return this.http.get<Pedido>(this.pedidoURL+`/${idPedido}`);
  }
}

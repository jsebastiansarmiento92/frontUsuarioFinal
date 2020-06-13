import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


import { Image } from 'src/app/models/image';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageURL = 'https://quick-domicilio-uno.herokuapp.com/image/';

  constructor(private httpClient: HttpClient) { }

  onUpload(image:FormData,id:number): Observable<any>{
    return this.httpClient.post(this.imageURL + 'upload'+"/"+id, image);
  }
  getImage(nombre:any): Observable<any>{
    return this.httpClient.get<Object>(this.imageURL+'get/'+nombre);
  }
  getImageId(id:number): Observable<any>{
    return this.httpClient.get<Object>(this.imageURL+'getId/'+id);
  }
  getImageIdUsuario(id:number): Observable<any[]>{
    return this.httpClient.get<Object[]>(this.imageURL+'getIdImagenUser/'+id);
  }
  
  getIdImage(nombre:any,idUsuario:number): Observable<any>{
    return this.httpClient.get<Object>(this.imageURL+`getIdImage/${nombre}`+`&${idUsuario}`);
  }
  
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message';

//3.21.247.61
@Injectable()
export class SocketService {
  url: string = 'https://quickdomiciliosadmin.herokuapp.com/' + "api/socket";

  constructor(private http: HttpClient) { }
  
  
  
  postMessage(data: Message): Observable<any>{
    return this.http.post<Message>(this.url, data);
  }
}

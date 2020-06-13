import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../../models/empresa';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  empresaURL = 'http://localhost:8080/QuickDomiciliosCrud-0.0.1-SNAPSHOT/empresas';
  constructor(private http: HttpClient) { }

  createEmpresa(empresa: Empresa): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.http.post<Empresa>(this.empresaURL, empresa);
  }

  getEmpresas(){
      return this.http.get<Empresa[]>(this.empresaURL);

  }

  borrarEmpresaId(empresa:Empresa):Observable<any>{
    console.log("el ide seleccionado es "+ empresa.idEmpresa);
    return this.http.delete<Empresa>(this.empresaURL+"/"+empresa.idEmpresa);
  }
}

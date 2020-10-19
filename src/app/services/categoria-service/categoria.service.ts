import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from 'src/app/models/categoria';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaURL = 'https://quickdomicilios.herokuapp.com/categorias';

  constructor(private http: HttpClient) { }

  createCategoria(categoria: Categoria): Observable<any> {
    //alert("nombre que se envia es "+ usuario.nombreUsuario)
    return this.http.post<Categoria>(this.categoriaURL, categoria);
  }

  getCategorias(){
      return this.http.get<Categoria[]>(this.categoriaURL);

  }
  getCategoriasEmpresa(empresa:Empresa): Observable<any>{
    return this.http.get<Categoria[]>(this.categoriaURL+"/catEmpresa/"+empresa.idEmpresa);

}
  borrarEmpresaId(categoria:Categoria):Observable<any>{
    console.log("el ide seleccionado es "+ categoria.idCategoria);
    return this.http.delete<Categoria>(this.categoriaURL+"/"+categoria.idCategoria);
  }

  getCategoriasDependencia(nombreDependencia: string): Observable<any> {
    return this.http.get<Categoria[]>(this.categoriaURL + "/getCategoria/" +nombreDependencia);

  }

  getCategoriasUsuarioFinal(){
    return this.http.get<Categoria[]>(this.categoriaURL+"/listarUsuarioFinal");

}
}

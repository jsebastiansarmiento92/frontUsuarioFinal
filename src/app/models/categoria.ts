import { Empresa } from './empresa';

export class Categoria {
    idCategoria:number;
    nombreCategoria:string;
    empresa=new Empresa();
    descripcion:String;
    dependencia:Categoria;
}

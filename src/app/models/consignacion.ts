import { Caja } from './caja';

export class Consignacion {

    idConsignacion:number;
    descripcion:string;
    valor:number;
    idUsuario:number;
    caja:Caja=new Caja();
}

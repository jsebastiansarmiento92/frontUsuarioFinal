import { Categoria } from './categoria';

export class Empresa {

    idEmpresa:number;
    estadoEmpresa: string;
    nitEmpresa: number;
    categorias:Categoria[];
    email: string;
    razonSocial: string;
    telefonoEmpresa:string;
    idLugar: number;
    imagen: number;

    retrievedImage: any;

}

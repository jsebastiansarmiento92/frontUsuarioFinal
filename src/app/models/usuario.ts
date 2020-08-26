import { Rol } from './rol';
import { Empresa } from './empresa';

export class Usuario{
    id: number;
    cc_usuario: number;
    nombreUsuario:string;
    email: string;
    confirmacionCuenta:Date;
    password:String;
    fecha_creacion:Date=null;
    rol:Rol;
    idLugar:number;
    estadoDomiciliario:String;
    estadoRecepcionista:String;
    roles: string[]=[];
    estado: string;
    empresa:Empresa;
    telefono:string="sin guardar";
}
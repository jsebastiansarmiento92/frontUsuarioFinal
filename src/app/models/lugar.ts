import { Barrio } from './barrio';

export class Lugar {
    idLugar:number;
    idEmpresa:number;
    idUsuario:number;
    barrio:Barrio=new Barrio();
    direccionLugar:string="sin guardar";
}

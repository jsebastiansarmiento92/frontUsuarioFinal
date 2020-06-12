import { Lugar } from './lugar';

export class Pedido {
    id:number;
    idEmpresa:number;
    idCliente:number;
    idDomiciliario:number;
    lugar:Lugar;
    estadoPedido:string;
    modoPagoPedido:string;
    valorTotalPedido:number;
    valorComision:number;
    valorGanancia:number;
    id_caja:number;

}

import { Lugar } from './lugar';
import { Empresa } from './empresa';

export class Pedido {
    id:number;
    empresa:Empresa;
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

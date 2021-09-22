import { Producto } from "./producto";

export class Promociones {
    idPromociones:number;
    nombrePromocion:string;
    descripcion:string;
    imagen:number;
    producto: Producto;

    retrieveResonse: any;
    base64Data: any;
    retrievedImage: any;
}
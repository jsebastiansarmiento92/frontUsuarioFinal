import { Categoria } from './categoria';
import { Image } from './image';
import { Empresa } from './empresa';


export class Producto {

    retrieveResonse: any;
    base64Data: any;
    retrievedImage: any;
    idProducto: number;
    categoria: Categoria;
    empresa: Empresa;
    nombreProducto: string;
    descripcion: string;
    estadoProducto: string;
    stockProducto: number;
    valorProducto: number;
    imagen: number;
    cantidad: number;

   // constructor(){
   //     console.log("ingreso a constructor de producto")
    //    this.retrieveResonse = this.imagen;
  //      this.base64Data = this.retrieveResonse.picByte;
  //     this.retrievedImage='data:image/jpeg;base64,' + this.base64Data;
  //  }
    getImage() :any{
        this.retrieveResonse = this.imagen;
        this.base64Data = this.retrieveResonse.picByte;
        return 'data:image/jpeg;base64,' + this.base64Data;
        //console.log(this.retrievedImage);

    }
    getPrueba(){
        console.log("prueba de impresion desde la clase producto")
    }
}

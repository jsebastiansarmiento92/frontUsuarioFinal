import { Component, OnInit } from '@angular/core';
import { ProductoServiceService } from 'src/app/services/producto-service/producto-service.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { Producto } from 'src/app/models/producto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  productos:Producto[]=[];
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;

  producto:Producto=new Producto();
  productosCarrito:Producto[]=[];
  constructor(private productosService:ProductoServiceService,
  private imagenService:ImageService,
  private serviceModal: NgbModal) { }

  ngOnInit() {
    this.cargarProductos();
  }
cargarProductos() {
    console.log("metodo de listar productos oinit");
    this.productosService.listarUsuarioFinal().subscribe(data => {
      this.productos = data;
      console.log(this.productos);
      this.productos.forEach(element => {
        console.log("id de las imagenes de los productos" + element.imagen);
        
        this.imagenService.getImageId(element.imagen).subscribe(data=>{
          this.retrieveResonse = data;
          console.log(data);
          this.base64Data = this.retrieveResonse.picByte;
          //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          element.retrievedImage='data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrievedImage);
        })
      });
     // this.loader = false;
    });
    
  }
  ordenarProducto(producto: Producto, modal) {
    this.producto = producto;
    this.serviceModal.open(modal);
  }
  confirmarAgregar(){
    this.productosCarrito.push(this.producto);
    console.log("agregando al local storage:");
    console.log(this.productosCarrito);
    localStorage.setItem('myArray', JSON.stringify(this.productosCarrito));
    this.serviceModal.dismissAll();
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductoServiceService } from 'src/app/services/producto-service/producto-service.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { Producto } from 'src/app/models/producto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria-service/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { TokenService } from 'src/app/services/auth/token.service';

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
  categorias:Categoria[]=[];
  tipoDirecciones:String[]=[];

  constructor(private productosService:ProductoServiceService,
  private imagenService:ImageService,
  private serviceModal: NgbModal,
  private router:Router,
  private categoriaService:CategoriaService,
  private tokenService:TokenService) { }

  ngOnInit() {
    
    if(this.tokenService.getToken()==null){
      localStorage.clear();
      console.log("se limpia el locar storage en inicio");
    }else{
      localStorage.setItem('isLoggedin', 'true');
    }
    this.llenarTipodirecciones();
    this.cargarProductos();
    this.cargarCategorias();
  }
  llenarTipodirecciones(){
    this.tipoDirecciones.push("Carrera");
    this.tipoDirecciones.push("Avenida");
    this.tipoDirecciones.push("Avenida Carrera");
    this.tipoDirecciones.push("Avenida Calle");
    this.tipoDirecciones.push("Circular");
    this.tipoDirecciones.push("Circunvalar");
    this.tipoDirecciones.push("Diagonal");
    this.tipoDirecciones.push("Manzana");
    this.tipoDirecciones.push("Transversal");

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
    if(localStorage.getItem("isLoggedin")){
      this.producto = producto;
      this.serviceModal.open(modal);
    }else{
      this.router.navigate(["login"]);
    }
   
  }
  confirmarAgregar(){
    this.productosCarrito.push(this.producto);
    console.log("agregando al local storage:");
    console.log(this.productosCarrito);
    localStorage.setItem('myArray', JSON.stringify(this.productosCarrito));
    this.serviceModal.dismissAll();
  }
  cargarCategorias(){
    this.categoriaService.getCategoriasUsuarioFinal().subscribe(data=>{
      this.categorias=data;
    })
  }
  
}

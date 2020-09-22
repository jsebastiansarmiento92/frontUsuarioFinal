import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-carrito',
  templateUrl: './popup-carrito.component.html',
  styleUrls: ['./popup-carrito.component.css']
})
export class PopupCarritoComponent implements OnInit {

  show: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showF(){
    //console.log("ingreso de show")
    if (this.show) {
      this.show=false;
    } else {
      this.show= true;
    }
  }

}

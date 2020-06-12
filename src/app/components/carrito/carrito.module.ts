import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoRoutingModule } from './carrito-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CarritoComponent } from './carrito.component';



@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
      CarritoRoutingModule,
     FormsModule,
     NgbModalModule
     
  ],
  declarations: [CarritoComponent]
})
export class CarritoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PopupCarritoComponent } from './popup-carrito.component';

const routes: Routes = [
  {
      path: '',
      component: PopupCarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupCarritoRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';


const routes: Routes = [
  {
      path: '',
      component: LandingComponent,
      children: [
          { path: '', redirectTo: 'landing', pathMatch: 'prefix' }
          
    //      { path: 'carrito', loadChildren: () => import('../carrito/carrito.module').then(m => m.CarritoModule)}
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { GuardService as guard} from '../../services/guard.service';


const routes: Routes = [
  {
      path: '',
      component: InicioComponent,
      children: [
          { path: '', redirectTo: 'inicio', pathMatch: 'prefix' }
          
    //      { path: 'carrito', loadChildren: () => import('../carrito/carrito.module').then(m => m.CarritoModule)}
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }

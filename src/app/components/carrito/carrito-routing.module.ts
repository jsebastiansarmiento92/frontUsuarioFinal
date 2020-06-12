import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarritoComponent } from './carrito.component';
import { GuardService as guard} from '../../services/guard.service';
const routes: Routes = [
  {path: '',component: CarritoComponent,
  children: [
    {path: '', redirectTo: '', pathMatch: 'prefix'},
 // { path: 'listar', loadChildren: () => import('./listar/listar.module').then(m => m.ListarModule)},
  { path: 'carrito', loadChildren: () => import('./carrito.module').then(m => m.CarritoModule),
  canActivate:[guard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarritoRoutingModule { }

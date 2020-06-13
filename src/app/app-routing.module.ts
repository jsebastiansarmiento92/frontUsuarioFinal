import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AppComponent } from './app.component';
import { GuardService as guard} from './services/guard.service';

const routes: Routes = [
    { path: '', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule),
    canActivate:[guard]},
    { path: 'inicio', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule) },
    { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
    { path: 'head', loadChildren: () => import('./components/head/head.module').then(m => m.HeadModule),
    canActivate:[guard] },
    { path: 'carrito', loadChildren: () => import('./components/carrito/carrito.module').then(m => m.CarritoModule),
    canActivate:[guard]},
   // { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
   // { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
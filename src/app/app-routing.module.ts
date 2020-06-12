import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AppComponent } from './app.component';
//import { AuthGuard } from './shared';
import { GuardService as guard} from '../app/services/guard.service';

const routes: Routes = [
    { path: '', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule),
    canActivate:[guard]},
    { path: 'inicio', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule) ,
    canActivate:[guard]},
    { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    canActivate:[guard] },
    { path: 'head', loadChildren: () => import('./components/head/head.module').then(m => m.HeadModule),
    canActivate:[guard] },
   // { path: 'error', loadChildren: () => import('./server-error/server-error.module').then(m => m.ServerErrorModule) },
   // { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
   // { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
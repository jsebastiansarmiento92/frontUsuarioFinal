import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AppComponent } from './app.component';
import { GuardService as guard} from './services/guard.service';

const routes: Routes = [
    { path: '', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule)},
    { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'inicio', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule) },
    { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
    { path: 'signup', loadChildren: () => import('./components/signup/signup.module').then(m => m.SignupModule)},
    { path: 'head', loadChildren: () => import('./components/head/head.module').then(m => m.HeadModule)},
    { path: 'privacy-policy', loadChildren: () => import('./components/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)},
    { path: 'carrito', loadChildren: () => import('./components/carrito/carrito.module').then(m => m.CarritoModule),
    canActivate:[guard]},
   // { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
   // { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    //imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { InicioComponent } from './components/inicio/inicio.component';
import { HeadComponent } from './components/head/head.component';
//import { FooterComponent } from './components/footer/footer.component';
//import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeadRoutingModule } from './components/head/head-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared';
import { AuthService } from './services/auth/auth.service';
import { interceptorProvider } from './interceptors/usuario-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SocketService } from './services/socket-service/socket.service';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



//import { CarritoComponent } from './components/carrito/carrito.component';
//import { CarritoRoutingModule } from './components/carrito/carrito-routing.module';
@NgModule({
  declarations: [
    AppComponent,
   // InicioComponent,
     HeadComponent,
   TerminosCondicionesComponent,
   // FooterComponent,
    //LoginComponent,
   // SignupComponent,
   //LandingComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeadRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModalModule
   // ToastrModule.forRoot()
  ],
  //providers: [AuthGuard,interceptorProvider,SocketService,AuthService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [AuthGuard,interceptorProvider,SocketService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

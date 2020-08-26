"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
//import { InicioComponent } from './components/inicio/inicio.component';
var head_component_1 = require("./components/head/head.component");
var head_routing_module_1 = require("./components/head/head-routing.module");
var http_1 = require("@angular/common/http");
var shared_1 = require("./shared");
var auth_service_1 = require("./services/auth/auth.service");
var usuario_interceptor_service_1 = require("./interceptors/usuario-interceptor.service");
var socket_service_1 = require("./services/socket-service/socket.service");
var terminos_condiciones_component_1 = require("./components/terminos-condiciones/terminos-condiciones.component");
var forms_1 = require("@angular/forms");
//import { CarritoComponent } from './components/carrito/carrito.component';
//import { CarritoRoutingModule } from './components/carrito/carrito-routing.module';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                // InicioComponent,
                head_component_1.HeadComponent,
                terminos_condiciones_component_1.TerminosCondicionesComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                head_routing_module_1.HeadRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule
                // ToastrModule.forRoot()
            ], entryComponents: [head_component_1.HeadComponent],
            //providers: [AuthGuard,interceptorProvider,SocketService,AuthService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
            providers: [shared_1.AuthGuard, usuario_interceptor_service_1.interceptorProvider, socket_service_1.SocketService, auth_service_1.AuthService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

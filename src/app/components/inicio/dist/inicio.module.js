"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InicioModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var inicio_routing_module_1 = require("./inicio-routing.module");
var forms_1 = require("@angular/forms");
var inicio_component_1 = require("./inicio.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var pipe_search_pipe_1 = require("./pipe/pipe-search.pipe");
var login_modal_component_1 = require("./loginModal/login-modal/login-modal.component");
var InicioModule = /** @class */ (function () {
    function InicioModule() {
    }
    InicioModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                //TranslateModule,
                inicio_routing_module_1.InicioRoutingModule,
                forms_1.FormsModule,
                ng_bootstrap_1.NgbModalModule
            ],
            declarations: [inicio_component_1.InicioComponent, pipe_search_pipe_1.PipeSearchPipe, login_modal_component_1.LoginModalComponent]
        })
    ], InicioModule);
    return InicioModule;
}());
exports.InicioModule = InicioModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LandingModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var landing_routing_module_1 = require("./landing-routing.module");
var landing_component_1 = require("./landing.component");
var forms_1 = require("@angular/forms");
var search_pipe_1 = require("./pipe/search.pipe");
var LandingModule = /** @class */ (function () {
    function LandingModule() {
    }
    LandingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                //TranslateModule,
                landing_routing_module_1.LandingRoutingModule,
                forms_1.FormsModule
            ],
            declarations: [landing_component_1.LandingComponent, search_pipe_1.SearchPipe]
        })
    ], LandingModule);
    return LandingModule;
}());
exports.LandingModule = LandingModule;

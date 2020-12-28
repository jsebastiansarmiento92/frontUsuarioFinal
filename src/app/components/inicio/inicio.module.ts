import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import {FormsModule}from '@angular/forms';
import { InicioComponent } from './inicio.component';
import { NgbDropdownModule, NgbTabsetModule, NgbDatepickerModule, NgbModalModule  } from '@ng-bootstrap/ng-bootstrap';
import { PipeSearchPipe } from './pipe/pipe-search.pipe';
import { LoginModalComponent } from './loginModal/login-modal/login-modal.component';
import { PipeSearchProductoPipe } from './pipe/pipe-search-producto.pipe';



@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
    InicioRoutingModule,
    
     FormsModule,
     NgbModalModule
  ],
  declarations: [InicioComponent, PipeSearchPipe, LoginModalComponent, PipeSearchProductoPipe]
})
export class InicioModule { }

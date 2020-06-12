import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import {FormsModule}from '@angular/forms';
import { InicioComponent } from './inicio.component';
import { NgbDropdownModule, NgbTabsetModule, NgbDatepickerModule, NgbModalModule  } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
      InicioRoutingModule,
     FormsModule,
     NgbModalModule
  ],
  declarations: [InicioComponent]
})
export class InicioModule { }

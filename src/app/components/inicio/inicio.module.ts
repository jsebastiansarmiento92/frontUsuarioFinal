import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import {FormsModule}from '@angular/forms';
import { InicioComponent } from './inicio.component';


@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
      InicioRoutingModule,
     FormsModule
  ],
  declarations: [InicioComponent]
})
export class InicioModule { }

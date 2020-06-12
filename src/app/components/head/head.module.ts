import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadRoutingModule } from './head-routing.module';
import { FormsModule } from '@angular/forms';
import { HeadComponent } from './head.component';

@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
     // HeadRoutingModule,
     FormsModule
  ],
  declarations: []
})
export class HeadModule { }

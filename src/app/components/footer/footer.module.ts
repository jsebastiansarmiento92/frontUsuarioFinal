import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterRoutingModule } from './footer-routing.module';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
      FooterRoutingModule,
     FormsModule
  ],
  declarations: [FooterComponent]
})
export class FooterModule { }

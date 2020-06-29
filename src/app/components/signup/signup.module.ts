import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';


@NgModule({
  imports: [
      CommonModule,
     // TranslateModule,
      SignupRoutingModule,
      FormsModule
  ],
  declarations: [SignupComponent]
})

export class SignupModule { }

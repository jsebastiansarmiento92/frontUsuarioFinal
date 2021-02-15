import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  imports: [
      CommonModule,
     // TranslateModule,
      SignupRoutingModule,
      FormsModule,
      NgbModalModule, 
      RecaptchaModule
  ],
  declarations: [SignupComponent]
})

export class SignupModule { }

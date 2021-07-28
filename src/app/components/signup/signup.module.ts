import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  imports: [
      CommonModule,
      SignupRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModalModule, 
      RecaptchaModule,
      NgxCaptchaModule
  ],
  declarations: [SignupComponent]
})

export class SignupModule { }

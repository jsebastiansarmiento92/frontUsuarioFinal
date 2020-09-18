import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { FooterRoutingModule } from '../footer/footer-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { PipeSafePipe } from './pipe-safe.pipe';

@NgModule({
  imports: [
      CommonModule,
     // TranslateModule,
      LoginRoutingModule,
      FooterRoutingModule,
      FormsModule
  ],
  declarations: [LoginComponent,FooterComponent, PipeSafePipe]
})
export class LoginModule { }

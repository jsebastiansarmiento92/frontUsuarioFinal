import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipe/search.pipe';





@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
      LandingRoutingModule,
      FormsModule
  ],
  declarations: [LandingComponent, SearchPipe]
})
export class LandingModule { }

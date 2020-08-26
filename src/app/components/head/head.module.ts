import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadRoutingModule } from './head-routing.module';

import { HeadComponent } from './head.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
      // HeadRoutingModule,
      NgbModalModule,
      
  ],
  declarations: []
})
export class HeadModule { }

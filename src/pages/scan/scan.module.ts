import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { ScanPage } from './scan';

@NgModule({
  declarations: [
    ScanPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    ScanPage
  ]
})
export class ScanPageModule { }

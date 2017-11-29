import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { ListPage } from './list';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    ListPage
  ]
})
export class ListPageModule { }
